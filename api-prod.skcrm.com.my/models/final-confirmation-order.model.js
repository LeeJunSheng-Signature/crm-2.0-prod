"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinalConfirmationOrder = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const order_state_enum_1 = require("../types/order-state.enum");
const base_entity_model_1 = require("./base-entity.model");
const design_model_1 = require("./design.model");
const lead_model_1 = require("./lead.model");
const payment_attachment_model_1 = require("./payment-attachment.model");
let FinalConfirmationOrder = class FinalConfirmationOrder extends base_entity_model_1.BaseEntity {
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
], FinalConfirmationOrder.prototype, "uuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        generated: true,
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], FinalConfirmationOrder.prototype, "jobId", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], FinalConfirmationOrder.prototype, "quotationNumber", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], FinalConfirmationOrder.prototype, "state", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], FinalConfirmationOrder.prototype, "status", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], FinalConfirmationOrder.prototype, "remarks", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], FinalConfirmationOrder.prototype, "cancelRemark", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], FinalConfirmationOrder.prototype, "cancelReason", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        default: 0,
        jsonSchema: { nullable: false },
    }),
    tslib_1.__metadata("design:type", Number)
], FinalConfirmationOrder.prototype, "paidAmount", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        default: 0,
        jsonSchema: { nullable: false },
    }),
    tslib_1.__metadata("design:type", Number)
], FinalConfirmationOrder.prototype, "paidAmountDeposit", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
    }),
    tslib_1.__metadata("design:type", Number)
], FinalConfirmationOrder.prototype, "propertySize", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], FinalConfirmationOrder.prototype, "deliveryAddress", void 0);
tslib_1.__decorate([
    repository_1.property({ type: 'boolean', required: false, default: false }),
    tslib_1.__metadata("design:type", Boolean)
], FinalConfirmationOrder.prototype, "ocErpProcessedNew", void 0);
tslib_1.__decorate([
    repository_1.property({ type: 'boolean', required: false, default: false }),
    tslib_1.__metadata("design:type", Boolean)
], FinalConfirmationOrder.prototype, "ocErpPulledDeposit", void 0);
tslib_1.__decorate([
    repository_1.property({ type: 'boolean', required: false, default: false }),
    tslib_1.__metadata("design:type", Boolean)
], FinalConfirmationOrder.prototype, "ocErpProcessedDeposit", void 0);
tslib_1.__decorate([
    repository_1.property({ type: 'boolean', required: false, default: false }),
    tslib_1.__metadata("design:type", Boolean)
], FinalConfirmationOrder.prototype, "fcoErpProcessedProduction", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => design_model_1.Design, { keyTo: 'finalConfirmationOrderId' }),
    tslib_1.__metadata("design:type", Array)
], FinalConfirmationOrder.prototype, "designs", void 0);
tslib_1.__decorate([
    repository_1.belongsTo(() => lead_model_1.Lead, { name: 'lead' }),
    tslib_1.__metadata("design:type", String)
], FinalConfirmationOrder.prototype, "leadId", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => payment_attachment_model_1.PaymentAttachment, { keyTo: 'finalConfirmationOrderId' }),
    tslib_1.__metadata("design:type", Array)
], FinalConfirmationOrder.prototype, "paymentAttachments", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        default: 0,
        jsonSchema: { nullable: false },
    }),
    tslib_1.__metadata("design:type", Number)
], FinalConfirmationOrder.prototype, "totalApprovedAmount", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], FinalConfirmationOrder.prototype, "statusPaymentSlip", void 0);
FinalConfirmationOrder = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], FinalConfirmationOrder);
exports.FinalConfirmationOrder = FinalConfirmationOrder;
//# sourceMappingURL=final-confirmation-order.model.js.map