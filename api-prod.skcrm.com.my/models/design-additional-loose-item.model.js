"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignAdditionalLooseItem = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const design_model_1 = require("./design.model");
const loose_item_model_1 = require("./loose-item.model");
let DesignAdditionalLooseItem = class DesignAdditionalLooseItem extends repository_1.Entity {
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
], DesignAdditionalLooseItem.prototype, "uuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        required: true,
        default: 1.0
    }),
    tslib_1.__metadata("design:type", Number)
], DesignAdditionalLooseItem.prototype, "quantity", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        required: true,
        default: 0,
    }),
    tslib_1.__metadata("design:type", Number)
], DesignAdditionalLooseItem.prototype, "discount", void 0);
tslib_1.__decorate([
    repository_1.belongsTo(() => design_model_1.Design, { name: 'design' }),
    tslib_1.__metadata("design:type", String)
], DesignAdditionalLooseItem.prototype, "designId", void 0);
tslib_1.__decorate([
    repository_1.belongsTo(() => loose_item_model_1.LooseItem, { name: 'looseItem' }),
    tslib_1.__metadata("design:type", String)
], DesignAdditionalLooseItem.prototype, "looseItemId", void 0);
DesignAdditionalLooseItem = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], DesignAdditionalLooseItem);
exports.DesignAdditionalLooseItem = DesignAdditionalLooseItem;
//# sourceMappingURL=design-additional-loose-item.model.js.map