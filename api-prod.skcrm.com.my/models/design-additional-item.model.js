"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignAdditionalItem = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const design_model_1 = require("./design.model");
const trading_item_model_1 = require("./trading-item.model");
let DesignAdditionalItem = class DesignAdditionalItem extends repository_1.Entity {
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
], DesignAdditionalItem.prototype, "uuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        required: true,
        default: 1.0
    }),
    tslib_1.__metadata("design:type", Number)
], DesignAdditionalItem.prototype, "quantity", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        required: true,
        default: 0,
    }),
    tslib_1.__metadata("design:type", Number)
], DesignAdditionalItem.prototype, "discount", void 0);
tslib_1.__decorate([
    repository_1.belongsTo(() => design_model_1.Design, { name: 'design' }),
    tslib_1.__metadata("design:type", String)
], DesignAdditionalItem.prototype, "designId", void 0);
tslib_1.__decorate([
    repository_1.belongsTo(() => trading_item_model_1.TradingItem, { name: 'tradingItem' }),
    tslib_1.__metadata("design:type", String)
], DesignAdditionalItem.prototype, "tradingItemId", void 0);
DesignAdditionalItem = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], DesignAdditionalItem);
exports.DesignAdditionalItem = DesignAdditionalItem;
//# sourceMappingURL=design-additional-item.model.js.map