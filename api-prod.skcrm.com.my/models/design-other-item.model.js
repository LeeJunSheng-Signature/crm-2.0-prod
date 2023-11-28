"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignOtherItem = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const _1 = require(".");
const design_model_1 = require("./design.model");
let DesignOtherItem = class DesignOtherItem extends _1.BaseEntity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        id: true,
        // generated: true,
        useDefaultIdType: false,
        defaultFn: 'uuidv4',
    }),
    tslib_1.__metadata("design:type", String)
], DesignOtherItem.prototype, "uuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        dataType: 'FLOAT',
        default: 1.0,
    }),
    tslib_1.__metadata("design:type", Number)
], DesignOtherItem.prototype, "quantity", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], DesignOtherItem.prototype, "UOM", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], DesignOtherItem.prototype, "name", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], DesignOtherItem.prototype, "description", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        dataType: 'FLOAT',
        precision: 16,
        scale: 2,
        default: 0.0,
    }),
    tslib_1.__metadata("design:type", Number)
], DesignOtherItem.prototype, "unitPrice", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        dataType: 'FLOAT',
        default: 0.0,
    }),
    tslib_1.__metadata("design:type", Number)
], DesignOtherItem.prototype, "discount", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        dataType: 'FLOAT',
        precision: 16,
        scale: 2,
        default: 0.0,
    }),
    tslib_1.__metadata("design:type", Number)
], DesignOtherItem.prototype, "discountedPrice", void 0);
tslib_1.__decorate([
    repository_1.belongsTo(() => design_model_1.Design, { name: 'design' }),
    tslib_1.__metadata("design:type", String)
], DesignOtherItem.prototype, "designId", void 0);
DesignOtherItem = tslib_1.__decorate([
    repository_1.model({ settings: { strict: true } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], DesignOtherItem);
exports.DesignOtherItem = DesignOtherItem;
//# sourceMappingURL=design-other-item.model.js.map