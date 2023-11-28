"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceOrderItemCustom = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const _1 = require(".");
let ServiceOrderItemCustom = class ServiceOrderItemCustom extends _1.BaseServiceOrderItem {
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
], ServiceOrderItemCustom.prototype, "uuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ServiceOrderItemCustom.prototype, "item", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        default: '',
    }),
    tslib_1.__metadata("design:type", String)
], ServiceOrderItemCustom.prototype, "material", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        default: '',
    }),
    tslib_1.__metadata("design:type", String)
], ServiceOrderItemCustom.prototype, "colour", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        default: '',
    }),
    tslib_1.__metadata("design:type", String)
], ServiceOrderItemCustom.prototype, "profile", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        default: '',
    }),
    tslib_1.__metadata("design:type", String)
], ServiceOrderItemCustom.prototype, "width", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        default: '',
    }),
    tslib_1.__metadata("design:type", String)
], ServiceOrderItemCustom.prototype, "height", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        default: '',
    }),
    tslib_1.__metadata("design:type", String)
], ServiceOrderItemCustom.prototype, "depth", void 0);
ServiceOrderItemCustom = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], ServiceOrderItemCustom);
exports.ServiceOrderItemCustom = ServiceOrderItemCustom;
//# sourceMappingURL=service-order-item-custom.model.js.map