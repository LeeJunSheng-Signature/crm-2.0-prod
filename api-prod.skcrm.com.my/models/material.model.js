"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Material = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Material = class Material extends repository_1.Entity {
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
], Material.prototype, "uuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Material.prototype, "color_code", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Material.prototype, "brand", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        default: 'N',
    }),
    tslib_1.__metadata("design:type", String)
], Material.prototype, "showInCrm", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Material.prototype, "profile", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
    }),
    tslib_1.__metadata("design:type", Number)
], Material.prototype, "price", void 0);
Material = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Material);
exports.Material = Material;
//# sourceMappingURL=material.model.js.map