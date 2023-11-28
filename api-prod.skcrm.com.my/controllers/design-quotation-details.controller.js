"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignQuotationDetailsController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let DesignQuotationDetailsController = class DesignQuotationDetailsController {
    constructor(designRepository) {
        this.designRepository = designRepository;
    }
    async find(id, filter) {
        return this.designRepository.quotationDetails(id).find(filter);
    }
    async create(id, quotationDetails) {
        return this.designRepository.quotationDetails(id).create(quotationDetails);
    }
    async patch(id, quotationDetails, where) {
        return this.designRepository.quotationDetails(id).patch(quotationDetails, where);
    }
    async delete(id, where) {
        return this.designRepository.quotationDetails(id).delete(where);
    }
};
tslib_1.__decorate([
    rest_1.get('/designs/{id}/quotation-details', {
        responses: {
            '200': {
                description: 'Array of Design has many QuotationDetails',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.QuotationDetails) },
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
], DesignQuotationDetailsController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.post('/designs/{id}/quotation-details', {
        responses: {
            '200': {
                description: 'Design model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.QuotationDetails) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.QuotationDetails, {
                    title: 'NewQuotationDetailsInDesign',
                    exclude: ['uuid'],
                    optional: ['designId']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignQuotationDetailsController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.patch('/designs/{id}/quotation-details', {
        responses: {
            '200': {
                description: 'Design.QuotationDetails PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.QuotationDetails, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.QuotationDetails))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignQuotationDetailsController.prototype, "patch", null);
tslib_1.__decorate([
    rest_1.del('/designs/{id}/quotation-details', {
        responses: {
            '200': {
                description: 'Design.QuotationDetails DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.QuotationDetails))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignQuotationDetailsController.prototype, "delete", null);
DesignQuotationDetailsController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.DesignRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.DesignRepository])
], DesignQuotationDetailsController);
exports.DesignQuotationDetailsController = DesignQuotationDetailsController;
//# sourceMappingURL=design-quotation-details.controller.js.map