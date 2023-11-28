"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadDesignController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const design_state_enum_1 = require("../types/design-state.enum");
let LeadDesignController = class LeadDesignController {
    constructor(leadRepository, designRepository, branchRepository, designOtherItemRepository, getCurrentUser) {
        this.leadRepository = leadRepository;
        this.designRepository = designRepository;
        this.branchRepository = branchRepository;
        this.designOtherItemRepository = designOtherItemRepository;
        this.getCurrentUser = getCurrentUser;
    }
    async find(id, filter) {
        return this.leadRepository.designs(id).find(filter);
    }
    async create(id, design) {
        return this.leadRepository.designs(id).create(design);
    }
    async setLeadDesignsStateToSummaryQuotation(leadId, designIds) {
        const leadSummaryQuotations = await this.leadRepository.designs(leadId).find({ where: { state: design_state_enum_1.DesignState.SummaryQuotation } });
        const { branch: userBranchId } = await this.getCurrentUser();
        const quotationNumber = leadSummaryQuotations.length ?
            leadSummaryQuotations[0].quotationNumber :
            await this.generateSummaryQuotationNumberForBranch(userBranchId);
        await this.leadRepository.designs(leadId).delete({ state: design_state_enum_1.DesignState.SummaryQuotation });
        for (const designId of designIds) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const filter = { include: [{ relation: 'designOtherItems' }] };
            const { createdAt, updatedAt, deletedAt, designOtherItems, ...detailedToSummaryQuotation } = await this.designRepository.findById(designId, filter);
            if (!detailedToSummaryQuotation)
                throw new rest_1.HttpErrors[404](`Detailed Quotation with Uuid ${designId} not found.`);
            delete detailedToSummaryQuotation.uuid;
            // LeadId is already cloned, no need to define Lead -> Design relation here.
            const createdSummaryQuotation = await this.designRepository.create({
                ...detailedToSummaryQuotation,
                quotationNumber,
                state: design_state_enum_1.DesignState.SummaryQuotation,
            });
            // Clone QuotationDetail and TradingItem(through DesignAdditionalItem) from DetailedQuotation to new SummaryQuotation.
            const quotationDetails = await this.designRepository.quotationDetails(designId).find();
            for (const quotationDetail of quotationDetails) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { uuid, designId: _, ...item } = quotationDetail;
                await this.designRepository.quotationDetails(createdSummaryQuotation.uuid).create(item);
            }
            const designAdditionalItems = await this.designRepository.designAdditionalItems(designId).find();
            for (const designAdditionalItem of designAdditionalItems) {
                const { discount, quantity, tradingItemId, } = designAdditionalItem;
                await this.designRepository.designAdditionalItems(createdSummaryQuotation.uuid).create({
                    discount,
                    quantity,
                    tradingItemId,
                });
            }
            const designAdditionalLooseItems = await this.designRepository.designAdditionalLooseItems(designId).find();
            for (const designAdditionalLooseItem of designAdditionalLooseItems) {
                const { discount, quantity, looseItemId, } = designAdditionalLooseItem;
                await this.designRepository.designAdditionalLooseItems(createdSummaryQuotation.uuid).create({
                    discount,
                    quantity,
                    looseItemId,
                });
            }
            // Create Design Other Items for designs in Summary Quotation status
            const otherItems = await this.designRepository.designOtherItems(designId).find();
            for (const otherItem of otherItems) {
                const { quantity, UOM, name, description, unitPrice, discount, discountedPrice } = otherItem;
                await this.designRepository.designOtherItems(createdSummaryQuotation.uuid).create({
                    quantity,
                    UOM,
                    name,
                    description,
                    unitPrice,
                    discount,
                    discountedPrice
                });
            }
        }
        return this.designRepository.find({
            where: {
                leadId,
                state: design_state_enum_1.DesignState.SummaryQuotation,
            },
            include: [
                { relation: 'tradingItems' }, { relation: 'looseItems' }, { relation: 'quotationDetails' }, { relation: 'designOtherItems' }
            ]
        });
    }
    async patch(id, design, where) {
        return this.leadRepository.designs(id).patch(design, where);
    }
    async delete(id, where) {
        return this.leadRepository.designs(id).delete(where);
    }
    async generateSummaryQuotationNumberForBranch(userBranchId) {
        var _a;
        const currentYear = (new Date()).getFullYear();
        const summaryQuotationsCreatedInCurrentYear = await this.designRepository.find({
            where: {
                createdAt: {
                    between: [new Date(`${currentYear}-01-01 00:00:00`), new Date(`${currentYear + 1}-01-01 00:00:00`)]
                },
                state: design_state_enum_1.DesignState.SummaryQuotation,
            },
            order: ['createdAt DESC'],
        });
        const [lastCreatedSummaryQuotationForUserBranch] = summaryQuotationsCreatedInCurrentYear.filter(async (quotation) => {
            const { branchId } = await this.leadRepository.findById(quotation.leadId);
            return branchId === userBranchId;
        });
        const prevQuotationNumber = (_a = lastCreatedSummaryQuotationForUserBranch === null || lastCreatedSummaryQuotationForUserBranch === void 0 ? void 0 : lastCreatedSummaryQuotationForUserBranch.quotationNumber) !== null && _a !== void 0 ? _a : null;
        const prevRunningNumber = prevQuotationNumber ?
            parseInt(prevQuotationNumber.substr(prevQuotationNumber.length - 4))
            : 0;
        const { code: branchCode } = await this.branchRepository.findById(userBranchId);
        const currentRunningNumber = (prevRunningNumber + 1).toString().padStart(5, '0'); //29-11-2022
        const quotationNumber = `Q${currentYear}${branchCode}${currentRunningNumber}`;
        return quotationNumber;
    }
};
tslib_1.__decorate([
    rest_1.get('/leads/{id}/designs', {
        responses: {
            '200': {
                description: 'Array of Lead has many Design',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.Design) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('filter')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadDesignController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.post('/leads/{id}/designs', {
        responses: {
            '200': {
                description: 'Lead model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Design) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Design, {
                    title: 'NewDesignInLead',
                    exclude: ['uuid'],
                    optional: ['leadId']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadDesignController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.post('leads/{leadId}/designs/toSummaryQuotation', {
        responses: {
            '200': {
                description: 'All Lead Summary Quotation.',
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    tslib_1.__param(0, rest_1.param.path.string('leadId')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadDesignController.prototype, "setLeadDesignsStateToSummaryQuotation", null);
tslib_1.__decorate([
    rest_1.patch('/leads/{id}/designs', {
        responses: {
            '200': {
                description: 'Lead.Design PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Design, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Design))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadDesignController.prototype, "patch", null);
tslib_1.__decorate([
    rest_1.del('/leads/{id}/designs', {
        responses: {
            '200': {
                description: 'Lead.Design DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Design))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadDesignController.prototype, "delete", null);
LeadDesignController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.LeadRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.DesignRepository)),
    tslib_1.__param(2, repository_1.repository(repositories_1.BranchRepository)),
    tslib_1.__param(3, repository_1.repository(repositories_1.DesignOtherItemRepository)),
    tslib_1.__param(4, core_1.inject.getter(authentication_1.AuthenticationBindings.CURRENT_USER)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.LeadRepository,
        repositories_1.DesignRepository,
        repositories_1.BranchRepository,
        repositories_1.DesignOtherItemRepository, Function])
], LeadDesignController);
exports.LeadDesignController = LeadDesignController;
//# sourceMappingURL=lead-design.controller.js.map