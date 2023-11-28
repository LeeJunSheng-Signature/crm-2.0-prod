"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradingItem = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const design_additional_item_model_1 = require("./design-additional-item.model");
const design_model_1 = require("./design.model");
let TradingItem = class TradingItem extends repository_1.Entity {
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
], TradingItem.prototype, "uuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], TradingItem.prototype, "category", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], TradingItem.prototype, "subcategory", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], TradingItem.prototype, "name", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], TradingItem.prototype, "itemcode", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], TradingItem.prototype, "virture", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], TradingItem.prototype, "brand", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], TradingItem.prototype, "material", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], TradingItem.prototype, "colour", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], TradingItem.prototype, "profile", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], TradingItem.prototype, "uom", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], TradingItem.prototype, "fraction", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        required: false,
    }),
    tslib_1.__metadata("design:type", Number)
], TradingItem.prototype, "stdcost", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        required: false,
    }),
    tslib_1.__metadata("design:type", Number)
], TradingItem.prototype, "markuprate", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], TradingItem.prototype, "part", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        required: false,
        default: 1.0,
    }),
    tslib_1.__metadata("design:type", Number)
], TradingItem.prototype, "nonstdrate", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        required: false,
    }),
    tslib_1.__metadata("design:type", Number)
], TradingItem.prototype, "installationCharges", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        required: false,
        default: 1
    }),
    tslib_1.__metadata("design:type", Number)
], TradingItem.prototype, "dealerprice", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        default: 'Active'
    }),
    tslib_1.__metadata("design:type", String)
], TradingItem.prototype, "active", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], TradingItem.prototype, "oversea", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        required: false,
    }),
    tslib_1.__metadata("design:type", Number)
], TradingItem.prototype, "overseaDealerPrice", void 0);
tslib_1.__decorate([
    repository_1.belongsTo(() => design_model_1.Design, { name: "design" }),
    tslib_1.__metadata("design:type", String)
], TradingItem.prototype, "designId", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => design_additional_item_model_1.DesignAdditionalItem, { keyTo: 'tradingItemId' }),
    tslib_1.__metadata("design:type", Array)
], TradingItem.prototype, "designAdditionalItems", void 0);
TradingItem = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], TradingItem);
exports.TradingItem = TradingItem;
//# sourceMappingURL=trading-item.model.js.map