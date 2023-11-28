"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceReportItemController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ServiceReportItemController = class ServiceReportItemController {
    constructor(serviceReportItemRepository) {
        this.serviceReportItemRepository = serviceReportItemRepository;
    }
    async create(serviceReportItem) {
        return this.serviceReportItemRepository.create(serviceReportItem);
    }
    async count(where) {
        return this.serviceReportItemRepository.count(where);
    }
    async find(filter) {
        return this.serviceReportItemRepository.find(filter);
    }
    async updateAll(serviceReportItem, where) {
        return this.serviceReportItemRepository.updateAll(serviceReportItem, where);
    }
    async findById(id, filter) {
        return this.serviceReportItemRepository.findById(id, filter);
    }
    async updateById(id, serviceReportItem) {
        await this.serviceReportItemRepository.updateById(id, serviceReportItem);
    }
    async replaceById(id, serviceReportItem) {
        await this.serviceReportItemRepository.replaceById(id, serviceReportItem);
    }
    async deleteById(id) {
        await this.serviceReportItemRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/service-report-items', {
        responses: {
            '200': {
                description: 'ServiceReportItem model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.ServiceReportItem) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.ServiceReportItem, {
                    title: 'NewServiceReportItem',
                    exclude: ['uuid'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceReportItemController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/service-report-items/count', {
        responses: {
            '200': {
                description: 'ServiceReportItem model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.ServiceReportItem)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceReportItemController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/service-report-items', {
        responses: {
            '200': {
                description: 'Array of ServiceReportItem model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.ServiceReportItem, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.ServiceReportItem)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceReportItemController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/service-report-items', {
        responses: {
            '200': {
                description: 'ServiceReportItem PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.ServiceReportItem, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.ServiceReportItem)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.ServiceReportItem, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceReportItemController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/service-report-items/{id}', {
        responses: {
            '200': {
                description: 'ServiceReportItem model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.ServiceReportItem, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.ServiceReportItem, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceReportItemController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/service-report-items/{id}', {
        responses: {
            '204': {
                description: 'ServiceReportItem PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.ServiceReportItem, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.ServiceReportItem]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceReportItemController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/service-report-items/{id}', {
        responses: {
            '204': {
                description: 'ServiceReportItem PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.ServiceReportItem]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceReportItemController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/service-report-items/{id}', {
        responses: {
            '204': {
                description: 'ServiceReportItem DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceReportItemController.prototype, "deleteById", null);
ServiceReportItemController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.ServiceReportItemRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ServiceReportItemRepository])
], ServiceReportItemController);
exports.ServiceReportItemController = ServiceReportItemController;
//# sourceMappingURL=service-report-item.controller.js.map