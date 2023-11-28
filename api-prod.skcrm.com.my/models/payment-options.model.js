"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentOptions = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const _1 = require(".");
let PaymentOptions = class PaymentOptions extends _1.BaseEntity {
    // @property({
    //   type: 'string',
    // })
    // paymentOptionsId?: string;
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
], PaymentOptions.prototype, "uuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], PaymentOptions.prototype, "paymentDescription", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], PaymentOptions.prototype, "paymentType", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], PaymentOptions.prototype, "paymentActive", void 0);
PaymentOptions = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], PaymentOptions);
exports.PaymentOptions = PaymentOptions;
//# sourceMappingURL=payment-options.model.js.map