"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceReportServiceOrderItemController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ServiceReportServiceOrderItemController = class ServiceReportServiceOrderItemController {
    constructor(serviceReportRepository) {
        this.serviceReportRepository = serviceReportRepository;
    }
    async find(id, filter) {
        return this.serviceReportRepository.items(id).find(filter);
    }
    async create(id, serviceOrderItem) {
        return this.serviceReportRepository.items(id).create(serviceOrderItem);
    }
    async patch(id, serviceOrderItem, where) {
        return this.serviceReportRepository.items(id).patch(serviceOrderItem, where);
    }
    async delete(id, where) {
        return this.serviceReportRepository.items(id).delete(where);
    }
};
tslib_1.__decorate([
    rest_1.get('/service-reports/{id}/service-order-items', {
        responses: {
            '200': {
                description: 'Array of ServiceReport has many ServiceOrderItem',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.ServiceOrderItem) },
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
], ServiceReportServiceOrderItemController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.post('/service-reports/{id}/service-order-items', {
        responses: {
            '200': {
                description: 'ServiceReport model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.ServiceOrderItem) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.ServiceOrderItem, {
                    title: 'NewServiceOrderItemInServiceReport',
                    exclude: ['uuid'],
                    optional: ['serviceReportId']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceReportServiceOrderItemController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.patch('/service-reports/{id}/service-order-items', {
        responses: {
            '200': {
                description: 'ServiceReport.ServiceOrderItem PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.ServiceOrderItem, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.ServiceOrderItem))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceReportServiceOrderItemController.prototype, "patch", null);
tslib_1.__decorate([
    rest_1.del('/service-reports/{id}/service-order-items', {
        responses: {
            '200': {
                description: 'ServiceReport.ServiceOrderItem DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.ServiceOrderItem))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceReportServiceOrderItemController.prototype, "delete", null);
ServiceReportServiceOrderItemController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.ServiceReportRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ServiceReportRepository])
], ServiceReportServiceOrderItemController);
exports.ServiceReportServiceOrderItemController = ServiceReportServiceOrderItemController;
//# sourceMappingURL=service-report-service-order-item.controller.js.map