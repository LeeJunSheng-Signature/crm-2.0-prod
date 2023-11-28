"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exhibition = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const models_1 = require("../models");
let Exhibition = class Exhibition extends repository_1.Entity {
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
], Exhibition.prototype, "uuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Exhibition.prototype, "name", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Exhibition.prototype, "status", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Exhibition.prototype, "warranty", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Exhibition.prototype, "startDate", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Exhibition.prototype, "endDate", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Exhibition.prototype, "hideDate", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => models_1.Lead, { keyTo: 'exhibition' }),
    tslib_1.__metadata("design:type", Array)
], Exhibition.prototype, "leads", void 0);
Exhibition = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Exhibition);
exports.Exhibition = Exhibition;
//# sourceMappingURL=exhibition.model.js.map