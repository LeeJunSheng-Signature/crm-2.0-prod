"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseServiceOrderItem = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const _1 = require(".");
let BaseServiceOrderItem = class BaseServiceOrderItem extends _1.BaseEntity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], BaseServiceOrderItem.prototype, "quantity", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        default: '',
    }),
    tslib_1.__metadata("design:type", String)
], BaseServiceOrderItem.prototype, "rootCause", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        default: '',
    }),
    tslib_1.__metadata("design:type", String)
], BaseServiceOrderItem.prototype, "reason", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        default: '',
    }),
    tslib_1.__metadata("design:type", String)
], BaseServiceOrderItem.prototype, "subReason", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        default: '',
    }),
    tslib_1.__metadata("design:type", String)
], BaseServiceOrderItem.prototype, "party", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        default: '',
    }),
    tslib_1.__metadata("design:type", String)
], BaseServiceOrderItem.prototype, "remarks", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        default: '',
    }),
    tslib_1.__metadata("design:type", String)
], BaseServiceOrderItem.prototype, "remarksFactory", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], BaseServiceOrderItem.prototype, "serviceReportId", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        required: true,
        default: 0,
    }),
    tslib_1.__metadata("design:type", Number)
], BaseServiceOrderItem.prototype, "unitPrice", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        default: 0,
    }),
    tslib_1.__metadata("design:type", Number)
], BaseServiceOrderItem.prototype, "amount", void 0);
BaseServiceOrderItem = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], BaseServiceOrderItem);
exports.BaseServiceOrderItem = BaseServiceOrderItem;
//# sourceMappingURL=base-service-order-item.model.js.map