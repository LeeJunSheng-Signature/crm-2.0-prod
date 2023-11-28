"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceReportMaterial = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const _1 = require(".");
let ServiceReportMaterial = class ServiceReportMaterial extends _1.BaseEntity {
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
], ServiceReportMaterial.prototype, "uuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ServiceReportMaterial.prototype, "material", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], ServiceReportMaterial.prototype, "colour", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], ServiceReportMaterial.prototype, "profile", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], ServiceReportMaterial.prototype, "price", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], ServiceReportMaterial.prototype, "serviceOrderItemId", void 0);
ServiceReportMaterial = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], ServiceReportMaterial);
exports.ServiceReportMaterial = ServiceReportMaterial;
//# sourceMappingURL=service-report-material.model.js.map