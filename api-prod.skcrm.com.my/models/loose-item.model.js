"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LooseItem = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const design_additional_loose_item_model_1 = require("./design-additional-loose-item.model");
const design_model_1 = require("./design.model");
let LooseItem = class LooseItem extends repository_1.Entity {
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
], LooseItem.prototype, "uuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], LooseItem.prototype, "category", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], LooseItem.prototype, "subcategory", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], LooseItem.prototype, "name", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], LooseItem.prototype, "itemcode", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], LooseItem.prototype, "processcode", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], LooseItem.prototype, "virture", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], LooseItem.prototype, "brand", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], LooseItem.prototype, "material", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], LooseItem.prototype, "colour", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], LooseItem.prototype, "profile", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], LooseItem.prototype, "puom", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], LooseItem.prototype, "suom", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], LooseItem.prototype, "fraction", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
    }),
    tslib_1.__metadata("design:type", Number)
], LooseItem.prototype, "stdcost", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
    }),
    tslib_1.__metadata("design:type", Number)
], LooseItem.prototype, "markuprate", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], LooseItem.prototype, "part", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        required: false,
        default: 1
    }),
    tslib_1.__metadata("design:type", Number)
], LooseItem.prototype, "nonstdrate", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT'
    }),
    tslib_1.__metadata("design:type", Number)
], LooseItem.prototype, "installationcharges", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        required: false,
        default: 1
    }),
    tslib_1.__metadata("design:type", Number)
], LooseItem.prototype, "dealerprice", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        default: 'Active'
    }),
    tslib_1.__metadata("design:type", String)
], LooseItem.prototype, "active", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], LooseItem.prototype, "oversea", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
    }),
    tslib_1.__metadata("design:type", Number)
], LooseItem.prototype, "overseadealerprice", void 0);
tslib_1.__decorate([
    repository_1.belongsTo(() => design_model_1.Design, { name: "design" }),
    tslib_1.__metadata("design:type", String)
], LooseItem.prototype, "designId", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => design_additional_loose_item_model_1.DesignAdditionalLooseItem, { keyTo: 'looseItemId' }) // , {keyFrom: 'looseItemId', name: 'designAdditionalLooseItems'} )  // TODO: remove this code comment as it was used during testing
    ,
    tslib_1.__metadata("design:type", Array)
], LooseItem.prototype, "designAdditionalLooseItems", void 0);
LooseItem = tslib_1.__decorate([
    repository_1.model({ settings: { strict: true } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], LooseItem);
exports.LooseItem = LooseItem;
//# sourceMappingURL=loose-item.model.js.map