"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandGoods = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const design_model_1 = require("./design.model");
let BrandGoods = class BrandGoods extends repository_1.Entity {
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
], BrandGoods.prototype, "uuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], BrandGoods.prototype, "obsBrandGoodId", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], BrandGoods.prototype, "brandGoodName", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], BrandGoods.prototype, "brandName", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], BrandGoods.prototype, "obsAccountId", void 0);
tslib_1.__decorate([
    repository_1.belongsTo(() => design_model_1.Design),
    tslib_1.__metadata("design:type", String)
], BrandGoods.prototype, "designId", void 0);
BrandGoods = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], BrandGoods);
exports.BrandGoods = BrandGoods;
//# sourceMappingURL=brand-goods.model.js.map