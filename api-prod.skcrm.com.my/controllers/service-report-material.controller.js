"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceReportMaterialController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ServiceReportMaterialController = class ServiceReportMaterialController {
    constructor(serviceReportMaterialRepository) {
        this.serviceReportMaterialRepository = serviceReportMaterialRepository;
    }
    async create(serviceReportMaterial) {
        return this.serviceReportMaterialRepository.create(serviceReportMaterial);
    }
    async count(where) {
        return this.serviceReportMaterialRepository.count(where);
    }
    async find(filter) {
        return this.serviceReportMaterialRepository.find(filter);
    }
    async updateAll(serviceReportMaterial, where) {
        return this.serviceReportMaterialRepository.updateAll(serviceReportMaterial, where);
    }
    async findById(id, filter) {
        return this.serviceReportMaterialRepository.findById(id, filter);
    }
    async updateById(id, serviceReportMaterial) {
        await this.serviceReportMaterialRepository.updateById(id, serviceReportMaterial);
    }
    async replaceById(id, serviceReportMaterial) {
        await this.serviceReportMaterialRepository.replaceById(id, serviceReportMaterial);
    }
    async deleteById(id) {
        await this.serviceReportMaterialRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/service-report-materials', {
        responses: {
            '200': {
                description: 'ServiceReportMaterial model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.ServiceReportMaterial) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.ServiceReportMaterial, {
                    title: 'NewServiceReportMaterial',
                    exclude: ['uuid'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceReportMaterialController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/service-report-materials/count', {
        responses: {
            '200': {
                description: 'ServiceReportMaterial model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.ServiceReportMaterial)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceReportMaterialController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/service-report-materials', {
        responses: {
            '200': {
                description: 'Array of ServiceReportMaterial model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.ServiceReportMaterial, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.ServiceReportMaterial)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceReportMaterialController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/service-report-materials', {
        responses: {
            '200': {
                description: 'ServiceReportMaterial PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.ServiceReportMaterial, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.ServiceReportMaterial)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.ServiceReportMaterial, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceReportMaterialController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/service-report-materials/{id}', {
        responses: {
            '200': {
                description: 'ServiceReportMaterial model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.ServiceReportMaterial, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.ServiceReportMaterial, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceReportMaterialController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/service-report-materials/{id}', {
        responses: {
            '204': {
                description: 'ServiceReportMaterial PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.ServiceReportMaterial, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.ServiceReportMaterial]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceReportMaterialController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/service-report-materials/{id}', {
        responses: {
            '204': {
                description: 'ServiceReportMaterial PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.ServiceReportMaterial]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceReportMaterialController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/service-report-materials/{id}', {
        responses: {
            '204': {
                description: 'ServiceReportMaterial DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceReportMaterialController.prototype, "deleteById", null);
ServiceReportMaterialController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.ServiceReportMaterialRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ServiceReportMaterialRepository])
], ServiceReportMaterialController);
exports.ServiceReportMaterialController = ServiceReportMaterialController;
//# sourceMappingURL=service-report-material.controller.js.map