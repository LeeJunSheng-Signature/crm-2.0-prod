"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEntity = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let BaseEntity = class BaseEntity extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'date',
        default: () => new Date(),
    }),
    tslib_1.__metadata("design:type", Date)
], BaseEntity.prototype, "createdAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'date',
        default: () => new Date(),
    }),
    tslib_1.__metadata("design:type", Date)
], BaseEntity.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'date',
    }),
    tslib_1.__metadata("design:type", Date)
], BaseEntity.prototype, "deletedAt", void 0);
BaseEntity = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], BaseEntity);
exports.BaseEntity = BaseEntity;
//# sourceMappingURL=base-entity.model.js.map