"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadFinalConfirmationOrderController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const jwt_authentication_1 = require("../components/jwt-authentication");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const schema_1 = require("../schema");
const services_1 = require("../services");
const design_state_enum_1 = require("../types/design-state.enum");
const order_state_enum_1 = require("../types/order-state.enum");
let LeadFinalConfirmationOrderController = class LeadFinalConfirmationOrderController {
    constructor(leadRepository, branchRepository, roleRepository, userRepository, designRepository, finalConfirmationOrderRepository, getCurrentUser, emailService) {
        this.leadRepository = leadRepository;
        this.branchRepository = branchRepository;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.designRepository = designRepository;
        this.finalConfirmationOrderRepository = finalConfirmationOrderRepository;
        this.getCurrentUser = getCurrentUser;
        this.emailService = emailService;
    }
    async deleteOldJobId() {
        return this.finalConfirmationOrderRepository.deleteAll();
    }
    async createFromSummaryQuotations(designIds, leadId) {
        // If there is one OrderConfirmation for the lead, keep updating that one.
        let CO = await this.finalConfirmationOrderRepository.findOne({
            where: {
                leadId,
                state: order_state_enum_1.OrderState.OrderConfirmation,
            }
        });
        const { count } = await this.finalConfirmationOrderRepository.count();
        if (!CO) {
            const { branch: userBranchId } = await this.getCurrentUser();
            const quotationNumber = await this.generateOrderQuotationNumberForBranch(userBranchId);
            CO = await this.leadRepository.finalConfirmationOrders(leadId).create({
                state: order_state_enum_1.OrderState.OrderConfirmation,
                status: order_state_enum_1.OCStatus.New,
                jobId: 60000 + count,
                quotationNumber,
            });
        }
        await this
            .finalConfirmationOrderRepository
            .designs(CO.uuid)
            .delete({ state: design_state_enum_1.DesignState.Confirmed });
        const totalPart = String.fromCharCode(designIds.length + 64);
        for (const [i, designId] of designIds.entries()) {
            const part = String.fromCharCode(i + 1 + 64);
            const design = await this.designRepository.findById(designId);
            if (design.state !== design_state_enum_1.DesignState.SummaryQuotation) {
                throw new rest_1.HttpErrors[400]('All quotations must be in Summary Quotation state before combining into Order Confirmation.');
            }
            await this.designRepository.updateById(design.uuid, {
                finalConfirmationOrderId: CO.uuid,
                state: design_state_enum_1.DesignState.Confirmed,
                jobPart: `${part}/${totalPart}`,
            });
        }
        await this.notifyNewOrderConfirmation(leadId);
        return this.finalConfirmationOrderRepository.findById(CO.uuid, {
            include: [
                {
                    relation: 'designs',
                    scope: {
                        include: [
                            { relation: 'tradingItems' },
                            { relation: 'looseItems' },
                            { relation: 'quotationDetails' },
                            { relation: 'designOtherItems' },
                        ]
                    }
                }
            ]
        });
    }
    async changeStateToFCO(orderId) {
        await this.finalConfirmationOrderRepository.updateById(orderId, {
            state: order_state_enum_1.OrderState.FinalConfirmationOrder,
            status: order_state_enum_1.FCOStatus.FollowUp,
        });
        await this.notifyNewFinalConfirmationOrder(orderId);
    }
    async produceFCO(leadId, orderId, leadFCOAttributes) {
        const { propertySize, deliveryAddress, ...leadAdditionalAttributes } = leadFCOAttributes;
        await this.leadRepository.updateById(leadId, leadAdditionalAttributes);
        await this.finalConfirmationOrderRepository.updateById(orderId, {
            status: order_state_enum_1.FCOStatus.Pending,
            propertySize,
            deliveryAddress,
        });
    }
    async find(id, filter) {
        return this.leadRepository.finalConfirmationOrders(id).find(filter);
    }
    async create(id, finalConfirmationOrder) {
        return this.leadRepository.finalConfirmationOrders(id).create(finalConfirmationOrder);
    }
    async rawToSubmitted(data, leadId, orderId) {
        await this.finalConfirmationOrderRepository.updateById(orderId, {
            ...data,
            status: order_state_enum_1.OCStatus.PendingApproval,
        });
        const { user: currentUserId } = await this.getCurrentUser();
        await this.notifyPendingAcknowledgementOrderConfirmation(leadId, currentUserId, data.paidAmountDeposit);
    }
    async patch(id, finalConfirmationOrder, where) {
        return this.leadRepository.finalConfirmationOrders(id).patch(finalConfirmationOrder, where);
    }
    async delete(id, where) {
        return this.leadRepository.finalConfirmationOrders(id).delete(where);
    }
    async generateOrderQuotationNumberForBranch(userBranchId) {
        var _a;
        const currentYear = (new Date()).getFullYear();
        const ordersCreatedInCurrentYear = await this.finalConfirmationOrderRepository.find({
            where: {
                createdAt: {
                    between: [
                        new Date(`${currentYear}-01-01 00:00:00`),
                        new Date(`${currentYear + 1}-01-01 00:00:00`)
                    ]
                },
            },
            order: ['createdAt DESC'],
        });
        const [lastCreatedOrderForUserBranch] = ordersCreatedInCurrentYear.filter(async (order) => {
            const { branchId } = await this.leadRepository.findById(order.leadId);
            return branchId === userBranchId;
        });
        const prevQuotationNumber = (_a = lastCreatedOrderForUserBranch === null || lastCreatedOrderForUserBranch === void 0 ? void 0 : lastCreatedOrderForUserBranch.quotationNumber) !== null && _a !== void 0 ? _a : null;
        const prevRunningNumber = prevQuotationNumber ?
            parseInt(prevQuotationNumber.substr(prevQuotationNumber.length - 4))
            : 0;
        const { code: branchCode } = await this.branchRepository.findById(userBranchId);
        const currentRunningNumber = (prevRunningNumber + 1).toString().padStart(5, '0'); //29-11-2022
        const quotationNumber = `OD${currentYear}${branchCode}${currentRunningNumber}`;
        return quotationNumber;
    }
    async notifyNewOrderConfirmation(leadId) {
        const lead = await this.leadRepository.findById(leadId);
        const salesConsultant = await this.userRepository.findById(lead.userId);
        const email = new models_1.Email({
            to: salesConsultant.email,
            subject: 'New Order Confirmation waiting for deposit information',
            content: `
          Customer Name: ${lead.name} <br>
          Customer Contact: ${lead.phone} <br>
          Customer Email: ${lead.email} <br>
          Date assigned: ${(new Date()).toDateString()} <br>
          `
        });
        await this.emailService.sendMail(email);
    }
    async notifyPendingAcknowledgementOrderConfirmation(leadId, currentUserId, paidAmountDeposit) {
        const lead = await this.leadRepository.findById(leadId);
        const roleHQAccountant = await this.roleRepository.findOne({ where: { name: 'hQAccountant' } });
        const hQAccountants = await this
            .roleRepository
            .users(roleHQAccountant.uuid)
            .find({ where: { branchId: lead.branchId } });
        const user = await this.userRepository.findById(currentUserId);
        const userBranch = await this.branchRepository.findById(user.branchId);
        for (const accountant of hQAccountants) {
            const email = new models_1.Email({
                to: accountant.email,
                subject: 'An order confirmation is pending for approval',
                content: `
            From: ${user.name} from ${userBranch.name}
            Customer Name: ${lead.name} <br>
            Customer Email: ${lead.email} <br>
            Paid Deposit Amount: RM ${paidAmountDeposit} <br>
            `
            });
            await this.emailService.sendMail(email);
        }
    }
    async notifyNewFinalConfirmationOrder(orderId) {
        const roleBranchManager = await this
            .roleRepository
            .findOne({ where: { name: 'branchManager' } });
        const fcoLead = await this.finalConfirmationOrderRepository.lead(orderId);
        const branchManagers = await this
            .roleRepository
            .users(roleBranchManager.uuid)
            .find({ where: { branchId: fcoLead.branchId } });
        const fcoDesigns = await this
            .finalConfirmationOrderRepository
            .designs(orderId)
            .find();
        const totalAmount = parseFloat(fcoDesigns.reduce((acc, design) => acc + design.totalPrice, 0).toFixed(2));
        for (const branchmanager of branchManagers) {
            const email = new models_1.Email({
                to: branchmanager.email,
                subject: 'A new Final Confirmation Order has been produced',
                content: `
            Customer Name: ${fcoLead.name} <br>
            Order Amount: RM ${totalAmount} <br>
            <br>
            Date produced: ${(new Date()).toDateString()}
            `
            });
            await this.emailService.sendMail(email);
        }
    }
};
tslib_1.__decorate([
    rest_1.del('/fco/notNew'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], LeadFinalConfirmationOrderController.prototype, "deleteOldJobId", null);
tslib_1.__decorate([
    rest_1.post('leads/{leadId}/final-confirmation-orders/from-summary-quotations', {
        responses: {
            '200': {
                description: 'FinalConfirmationOrder model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.FinalConfirmationOrder) } },
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: {
                        type: 'string'
                    },
                },
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.path.string('leadId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array, String]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadFinalConfirmationOrderController.prototype, "createFromSummaryQuotations", null);
tslib_1.__decorate([
    rest_1.post('leads/{leadId}/final-confirmation-orders/{orderId}/to-fco', {
        responses: {
            '204': {
                description: 'Successfully updated state to FinalConfirmationOrder',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('orderId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadFinalConfirmationOrderController.prototype, "changeStateToFCO", null);
tslib_1.__decorate([
    rest_1.post('leads/{leadId}/final-confirmation-orders/{orderId}/produce-fco', {
        responses: {
            '204': {
                description: 'Successfully updated state to FinalConfirmationOrder',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('leadId')),
    tslib_1.__param(1, rest_1.param.path.string('orderId')),
    tslib_1.__param(2, rest_1.requestBody({
        content: {
            'application/json': {
                schema: schema_1.AdditionalLeadAttributeFCOSchema,
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadFinalConfirmationOrderController.prototype, "produceFCO", null);
tslib_1.__decorate([
    rest_1.get('/leads/{id}/final-confirmation-orders', {
        responses: {
            '200': {
                description: 'Array of Lead has many FinalConfirmationOrder',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.FinalConfirmationOrder) },
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
], LeadFinalConfirmationOrderController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.post('/leads/{id}/final-confirmation-orders', {
        responses: {
            '200': {
                description: 'Lead model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.FinalConfirmationOrder) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.FinalConfirmationOrder, {
                    title: 'NewFinalConfirmationOrderInLead',
                    exclude: ['uuid'],
                    optional: ['leadId']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadFinalConfirmationOrderController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.post('leads/{leadId}/final-confirmation-orders/{orderId}/add-deposit', {
        security: jwt_authentication_1.OPERATION_SECURITY_SPEC,
        responses: {
            '204': {
                description: 'Succesfully update FinalConfirmationOrder state.',
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    required: ['paidAmountDeposit'],
                    properties: {
                        paidAmountDeposit: { type: 'number' },
                    },
                },
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.path.string('leadId')),
    tslib_1.__param(2, rest_1.param.path.string('orderId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadFinalConfirmationOrderController.prototype, "rawToSubmitted", null);
tslib_1.__decorate([
    rest_1.patch('/leads/{id}/final-confirmation-orders', {
        responses: {
            '200': {
                description: 'Lead.FinalConfirmationOrder PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.FinalConfirmationOrder, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.FinalConfirmationOrder))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadFinalConfirmationOrderController.prototype, "patch", null);
tslib_1.__decorate([
    rest_1.del('/leads/{id}/final-confirmation-orders', {
        responses: {
            '200': {
                description: 'Lead.FinalConfirmationOrder DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.FinalConfirmationOrder))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadFinalConfirmationOrderController.prototype, "delete", null);
LeadFinalConfirmationOrderController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.LeadRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.BranchRepository)),
    tslib_1.__param(2, repository_1.repository(repositories_1.RoleRepository)),
    tslib_1.__param(3, repository_1.repository(repositories_1.UserRepository)),
    tslib_1.__param(4, repository_1.repository(repositories_1.DesignRepository)),
    tslib_1.__param(5, repository_1.repository(repositories_1.FinalConfirmationOrderRepository)),
    tslib_1.__param(6, core_1.inject.getter(authentication_1.AuthenticationBindings.CURRENT_USER)),
    tslib_1.__param(7, core_1.inject('services.EmailService')),
    tslib_1.__metadata("design:paramtypes", [repositories_1.LeadRepository,
        repositories_1.BranchRepository,
        repositories_1.RoleRepository,
        repositories_1.UserRepository,
        repositories_1.DesignRepository,
        repositories_1.FinalConfirmationOrderRepository, Function, services_1.EmailService])
], LeadFinalConfirmationOrderController);
exports.LeadFinalConfirmationOrderController = LeadFinalConfirmationOrderController;
//# sourceMappingURL=lead-final-confirmation-order.controller.js.map