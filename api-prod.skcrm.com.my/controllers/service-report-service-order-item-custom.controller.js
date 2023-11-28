"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceReportServiceOrderItemCustomController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ServiceReportServiceOrderItemCustomController = class ServiceReportServiceOrderItemCustomController {
    constructor(serviceReportRepository) {
        this.serviceReportRepository = serviceReportRepository;
    }
    async find(id, filter) {
        return this.serviceReportRepository.customItems(id).find(filter);
    }
    async create(id, serviceOrderItemCustom) {
        return this.serviceReportRepository.customItems(id).create(serviceOrderItemCustom);
    }
    async patch(id, serviceOrderItemCustom, where) {
        return this.serviceReportRepository.customItems(id).patch(serviceOrderItemCustom, where);
    }
    async delete(id, where) {
        return this.serviceReportRepository.customItems(id).delete(where);
    }
};
tslib_1.__decorate([
    rest_1.get('/service-reports/{id}/service-order-item-customs', {
        responses: {
            '200': {
                description: 'Array of ServiceReport has many ServiceOrderItemCustom',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.ServiceOrderItemCustom) },
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
], ServiceReportServiceOrderItemCustomController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.post('/service-reports/{id}/service-order-item-customs', {
        responses: {
            '200': {
                description: 'ServiceReport model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.ServiceOrderItemCustom) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.ServiceOrderItemCustom, {
                    title: 'NewServiceOrderItemCustomInServiceReport',
                    exclude: ['uuid'],
                    optional: ['serviceReportId']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceReportServiceOrderItemCustomController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.patch('/service-reports/{id}/service-order-item-customs', {
        responses: {
            '200': {
                description: 'ServiceReport.ServiceOrderItemCustom PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.ServiceOrderItemCustom, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.ServiceOrderItemCustom))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceReportServiceOrderItemCustomController.prototype, "patch", null);
tslib_1.__decorate([
    rest_1.del('/service-reports/{id}/service-order-item-customs', {
        responses: {
            '200': {
                description: 'ServiceReport.ServiceOrderItemCustom DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.ServiceOrderItemCustom))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceReportServiceOrderItemCustomController.prototype, "delete", null);
ServiceReportServiceOrderItemCustomController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.ServiceReportRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ServiceReportRepository])
], ServiceReportServiceOrderItemCustomController);
exports.ServiceReportServiceOrderItemCustomController = ServiceReportServiceOrderItemCustomController;
//# sourceMappingURL=service-report-service-order-item-custom.controller.js.map