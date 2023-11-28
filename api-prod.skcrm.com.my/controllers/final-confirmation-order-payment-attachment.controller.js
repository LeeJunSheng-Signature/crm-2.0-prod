"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinalConfirmationOrderPaymentAttachmentController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const util_1 = require("util");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let FinalConfirmationOrderPaymentAttachmentController = class FinalConfirmationOrderPaymentAttachmentController {
    constructor(finalConfirmationOrderRepository, fileService) {
        this.finalConfirmationOrderRepository = finalConfirmationOrderRepository;
        this.fileService = fileService;
    }
    async find(id, filter) {
        return this.finalConfirmationOrderRepository.paymentAttachments(id).find(filter);
    }
    async create(id, paymentAttachment) {
        return this.finalConfirmationOrderRepository.paymentAttachments(id).create(paymentAttachment);
    }
    async patch(id, auuid, paymentAttachment, where) {
        return this.finalConfirmationOrderRepository.paymentAttachments(id).patch(paymentAttachment, { uuid: auuid });
    }
    async delete(id, paymentAttachment) {
        // console.log(JSON.stringify(paymentAttachment));
        var _a;
        // File delete criteria - upon deleting payment attachment files, the file to delete is identified by its original filename, and the regenerated name in system (UUID)
        const result = await this.finalConfirmationOrderRepository.paymentAttachments(id).delete({ fileName: paymentAttachment.fileName, name: paymentAttachment.name });
        const removeFile = util_1.promisify(this.fileService.removeFile); // Delete file from container
        await removeFile(`${process.env.STORAGE_CONTAINER}`, (_a = paymentAttachment.name) !== null && _a !== void 0 ? _a : "");
        return result;
    }
};
tslib_1.__decorate([
    rest_1.get('/final-confirmation-orders/{id}/payment-attachments', {
        responses: {
            '200': {
                description: 'Array of FinalConfirmationOrder has many PaymentAttachment',
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
], FinalConfirmationOrderPaymentAttachmentController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.post('/final-confirmation-orders/{id}/payment-attachments', {
        responses: {
            '200': {
                description: 'FinalConfirmationOrder model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.PaymentAttachment) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.PaymentAttachment, {
                    title: 'NewPaymentAttachmentInFinalConfirmationOrder',
                    exclude: ['uuid'],
                    optional: ['finalConfirmationOrderId']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FinalConfirmationOrderPaymentAttachmentController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.patch('/final-confirmation-orders/{id}/payment-attachments/{auuid}', {
        responses: {
            '200': {
                description: 'FinalConfirmationOrder.PaymentAttachment PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.path.string('auuid')),
    tslib_1.__param(2, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.PaymentAttachment, { partial: true }),
            },
        },
    })),
    tslib_1.__param(3, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.PaymentAttachment))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FinalConfirmationOrderPaymentAttachmentController.prototype, "patch", null);
tslib_1.__decorate([
    rest_1.del('/final-confirmation-orders/{id}/payment-attachments', {
        responses: {
            '200': {
                description: 'FinalConfirmationOrder.PaymentAttachment DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.PaymentAttachment, {
                    title: 'NewPaymentAttachmentInFinalConfirmationOrder',
                    exclude: ['uuid'],
                    optional: ['finalConfirmationOrderId']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FinalConfirmationOrderPaymentAttachmentController.prototype, "delete", null);
FinalConfirmationOrderPaymentAttachmentController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.FinalConfirmationOrderRepository)),
    tslib_1.__param(1, core_1.inject('services.FileService')),
    tslib_1.__metadata("design:paramtypes", [repositories_1.FinalConfirmationOrderRepository, Object])
], FinalConfirmationOrderPaymentAttachmentController);
exports.FinalConfirmationOrderPaymentAttachmentController = FinalConfirmationOrderPaymentAttachmentController;
//# sourceMappingURL=final-confirmation-order-payment-attachment.controller.js.map