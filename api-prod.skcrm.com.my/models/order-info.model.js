"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderInfo = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const design_model_1 = require("./design.model");
let OrderInfo = class OrderInfo extends repository_1.Entity {
    // @belongsTo(() => QuotationDetails)
    // quotationDetailsId: string;
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
], OrderInfo.prototype, "uuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], OrderInfo.prototype, "customerName", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], OrderInfo.prototype, "customerTelephone", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], OrderInfo.prototype, "orderCode", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], OrderInfo.prototype, "currentNodeKey", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], OrderInfo.prototype, "createTime", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], OrderInfo.prototype, "obsDesignerUserId", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], OrderInfo.prototype, "designerName", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], OrderInfo.prototype, "storeName", void 0);
tslib_1.__decorate([
    repository_1.belongsTo(() => design_model_1.Design),
    tslib_1.__metadata("design:type", String)
], OrderInfo.prototype, "designId", void 0);
OrderInfo = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], OrderInfo);
exports.OrderInfo = OrderInfo;
//# sourceMappingURL=order-info.model.js.map