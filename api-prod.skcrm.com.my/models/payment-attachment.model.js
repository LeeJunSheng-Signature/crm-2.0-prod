"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentAttachment = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const _1 = require(".");
const final_confirmation_order_model_1 = require("./final-confirmation-order.model");
const payment_options_model_1 = require("./payment-options.model");
let PaymentAttachment = class PaymentAttachment extends _1.BaseEntity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        id: true,
        useDefaultIdType: false,
        defaultFn: 'uuidv4',
    }),
    tslib_1.__metadata("design:type", String)
], PaymentAttachment.prototype, "uuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], PaymentAttachment.prototype, "fileName", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], PaymentAttachment.prototype, "name", void 0);
tslib_1.__decorate([
    repository_1.belongsTo(() => final_confirmation_order_model_1.FinalConfirmationOrder, { name: 'finalConfirmationOrder' }),
    tslib_1.__metadata("design:type", String)
], PaymentAttachment.prototype, "finalConfirmationOrderId", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], PaymentAttachment.prototype, "serviceReportId", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], PaymentAttachment.prototype, "type", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], PaymentAttachment.prototype, "status", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        default: 0,
        jsonSchema: { nullable: false },
    }),
    tslib_1.__metadata("design:type", Number)
], PaymentAttachment.prototype, "approvedAmount", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], PaymentAttachment.prototype, "chequeNo", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], PaymentAttachment.prototype, "paymentOptionsId", void 0);
tslib_1.__decorate([
    repository_1.hasOne(() => payment_options_model_1.PaymentOptions, { keyTo: 'uuid' }),
    tslib_1.__metadata("design:type", payment_options_model_1.PaymentOptions)
], PaymentAttachment.prototype, "paymentOptions", void 0);
PaymentAttachment = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], PaymentAttachment);
exports.PaymentAttachment = PaymentAttachment;
//# sourceMappingURL=payment-attachment.model.js.map