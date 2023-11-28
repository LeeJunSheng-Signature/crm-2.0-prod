"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Erparid = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Erparid = class Erparid extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Erparid.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Erparid.prototype, "crmarid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Erparid.prototype, "erparid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'date',
        default: () => new Date(),
    }),
    tslib_1.__metadata("design:type", Date)
], Erparid.prototype, "createdAt", void 0);
Erparid = tslib_1.__decorate([
    repository_1.model({ settings: { strict: true } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Erparid);
exports.Erparid = Erparid;
//# sourceMappingURL=erparid.model.js.map