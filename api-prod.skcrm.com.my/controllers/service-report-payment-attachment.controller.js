"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceReportPaymentAttachmentController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ServiceReportPaymentAttachmentController = class ServiceReportPaymentAttachmentController {
    constructor(serviceReportRepository) {
        this.serviceReportRepository = serviceReportRepository;
    }
    async find(id, filter) {
        return this.serviceReportRepository.attachments(id).find(filter);
    }
    async create(id, paymentAttachment) {
        return this.serviceReportRepository.attachments(id).create(paymentAttachment);
    }
    async patch(id, paymentAttachment, where) {
        return this.serviceReportRepository.attachments(id).patch(paymentAttachment, where);
    }
    async delete(id, where) {
        return this.serviceReportRepository.attachments(id).delete(where);
    }
};
tslib_1.__decorate([
    rest_1.get('/service-reports/{id}/payment-attachments', {
        responses: {
            '200': {
                description: 'Array of ServiceReport has many PaymentAttachment',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.PaymentAttachment) },
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
], ServiceReportPaymentAttachmentController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.post('/service-reports/{id}/payment-attachments', {
        responses: {
            '200': {
                description: 'ServiceReport model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.PaymentAttachment) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.PaymentAttachment, {
                    title: 'NewPaymentAttachmentInServiceReport',
                    exclude: ['uuid'],
                    optional: ['serviceReportId']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceReportPaymentAttachmentController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.patch('/service-reports/{id}/payment-attachments', {
        responses: {
            '200': {
                description: 'ServiceReport.PaymentAttachment PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.PaymentAttachment, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.PaymentAttachment))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceReportPaymentAttachmentController.prototype, "patch", null);
tslib_1.__decorate([
    rest_1.del('/service-reports/{id}/payment-attachments', {
        responses: {
            '200': {
                description: 'ServiceReport.PaymentAttachment DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.PaymentAttachment))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceReportPaymentAttachmentController.prototype, "delete", null);
ServiceReportPaymentAttachmentController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.ServiceReportRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ServiceReportRepository])
], ServiceReportPaymentAttachmentController);
exports.ServiceReportPaymentAttachmentController = ServiceReportPaymentAttachmentController;
//# sourceMappingURL=service-report-payment-attachment.controller.js.map