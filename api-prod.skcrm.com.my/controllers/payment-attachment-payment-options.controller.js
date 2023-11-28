"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentAttachmentPaymentOptionsController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let PaymentAttachmentPaymentOptionsController = class PaymentAttachmentPaymentOptionsController {
    constructor(paymentAttachmentRepository) {
        this.paymentAttachmentRepository = paymentAttachmentRepository;
    }
    async get(id, filter) {
        return this.paymentAttachmentRepository.paymentOptions(id).get(filter);
    }
    async create(id, paymentOptions) {
        return this.paymentAttachmentRepository.paymentOptions(id).create(paymentOptions);
    }
    async patch(id, paymentOptions, where) {
        return this.paymentAttachmentRepository.paymentOptions(id).patch(paymentOptions, where);
    }
    async delete(id, where) {
        return this.paymentAttachmentRepository.paymentOptions(id).delete(where);
    }
};
tslib_1.__decorate([
    rest_1.get('/payment-attachments/{id}/payment-options', {
        responses: {
            '200': {
                description: 'PaymentAttachment has one PaymentOptions',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.PaymentOptions),
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
], PaymentAttachmentPaymentOptionsController.prototype, "get", null);
tslib_1.__decorate([
    rest_1.post('/payment-attachments/{id}/payment-options', {
        responses: {
            '200': {
                description: 'PaymentAttachment model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.PaymentOptions) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.PaymentOptions, {
                    title: 'NewPaymentOptionsInPaymentAttachment',
                    exclude: ['uuid'],
                    optional: ['uuid']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentAttachmentPaymentOptionsController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.patch('/payment-attachments/{id}/payment-options', {
        responses: {
            '200': {
                description: 'PaymentAttachment.PaymentOptions PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.PaymentOptions, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.PaymentOptions))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentAttachmentPaymentOptionsController.prototype, "patch", null);
tslib_1.__decorate([
    rest_1.del('/payment-attachments/{id}/payment-options', {
        responses: {
            '200': {
                description: 'PaymentAttachment.PaymentOptions DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.PaymentOptions))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentAttachmentPaymentOptionsController.prototype, "delete", null);
PaymentAttachmentPaymentOptionsController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.PaymentAttachmentRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.PaymentAttachmentRepository])
], PaymentAttachmentPaymentOptionsController);
exports.PaymentAttachmentPaymentOptionsController = PaymentAttachmentPaymentOptionsController;
//# sourceMappingURL=payment-attachment-payment-options.controller.js.map