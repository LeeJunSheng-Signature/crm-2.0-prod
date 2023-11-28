"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotationDetailController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let QuotationDetailController = class QuotationDetailController {
    constructor(quotationDetailsRepository) {
        this.quotationDetailsRepository = quotationDetailsRepository;
    }
    async create(quotationDetails) {
        return this.quotationDetailsRepository.create(quotationDetails);
    }
    async count(where) {
        return this.quotationDetailsRepository.count(where);
    }
    async find(filter) {
        return this.quotationDetailsRepository.find(filter);
    }
    async updateAll(quotationDetails, where) {
        return this.quotationDetailsRepository.updateAll(quotationDetails, where);
    }
    async findById(id, filter) {
        return this.quotationDetailsRepository.findById(id, filter);
    }
    async updateById(id, quotationDetails) {
        await this.quotationDetailsRepository.updateById(id, quotationDetails);
    }
    async replaceById(id, quotationDetails) {
        await this.quotationDetailsRepository.replaceById(id, quotationDetails);
    }
    async deleteById(id) {
        await this.quotationDetailsRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/quotation-details', {
        responses: {
            '200': {
                description: 'QuotationDetails model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.QuotationDetails) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.QuotationDetails, {
                    title: 'NewQuotationDetails',
                    exclude: ['uuid'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], QuotationDetailController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/quotation-details/count', {
        responses: {
            '200': {
                description: 'QuotationDetails model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.QuotationDetails)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], QuotationDetailController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/quotation-details', {
        responses: {
            '200': {
                description: 'Array of QuotationDetails model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.QuotationDetails, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.QuotationDetails)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], QuotationDetailController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/quotation-details', {
        responses: {
            '200': {
                description: 'QuotationDetails PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.QuotationDetails, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.QuotationDetails)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.QuotationDetails, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], QuotationDetailController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/quotation-details/{id}', {
        responses: {
            '200': {
                description: 'QuotationDetails model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.QuotationDetails, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.QuotationDetails, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], QuotationDetailController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/quotation-details/{id}', {
        responses: {
            '204': {
                description: 'QuotationDetails PATCH success',
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
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.QuotationDetails]),
    tslib_1.__metadata("design:returntype", Promise)
], QuotationDetailController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/quotation-details/{id}', {
        responses: {
            '204': {
                description: 'QuotationDetails PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.QuotationDetails]),
    tslib_1.__metadata("design:returntype", Promise)
], QuotationDetailController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/quotation-details/{id}', {
        responses: {
            '204': {
                description: 'QuotationDetails DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], QuotationDetailController.prototype, "deleteById", null);
QuotationDetailController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.QuotationDetailsRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.QuotationDetailsRepository])
], QuotationDetailController);
exports.QuotationDetailController = QuotationDetailController;
//# sourceMappingURL=quotation-detail.controller.js.map