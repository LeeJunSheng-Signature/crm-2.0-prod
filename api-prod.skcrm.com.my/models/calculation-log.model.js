"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculationLog = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const _1 = require(".");
let CalculationLog = class CalculationLog extends _1.BaseEntity {
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
], CalculationLog.prototype, "uuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], CalculationLog.prototype, "drawingNumber", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], CalculationLog.prototype, "kujialeSequenceId", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], CalculationLog.prototype, "itemId", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], CalculationLog.prototype, "parentItemId", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], CalculationLog.prototype, "name", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], CalculationLog.prototype, "brandGoodName", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], CalculationLog.prototype, "brandGoodCode", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], CalculationLog.prototype, "material", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], CalculationLog.prototype, "colour", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], CalculationLog.prototype, "profile", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], CalculationLog.prototype, "width", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], CalculationLog.prototype, "height", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], CalculationLog.prototype, "depth", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
    }),
    tslib_1.__metadata("design:type", Number)
], CalculationLog.prototype, "totalItemProcessCost", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
    }),
    tslib_1.__metadata("design:type", Number)
], CalculationLog.prototype, "ccost", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
    }),
    tslib_1.__metadata("design:type", Number)
], CalculationLog.prototype, "stdCost", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
    }),
    tslib_1.__metadata("design:type", Number)
], CalculationLog.prototype, "markupRate", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
    }),
    tslib_1.__metadata("design:type", Number)
], CalculationLog.prototype, "nonStdRate", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
    }),
    tslib_1.__metadata("design:type", Number)
], CalculationLog.prototype, "totalCost", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
    }),
    tslib_1.__metadata("design:type", Number)
], CalculationLog.prototype, "rrp", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
    }),
    tslib_1.__metadata("design:type", Number)
], CalculationLog.prototype, "quantity", void 0);
CalculationLog = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], CalculationLog);
exports.CalculationLog = CalculationLog;
//# sourceMappingURL=calculation-log.model.js.map