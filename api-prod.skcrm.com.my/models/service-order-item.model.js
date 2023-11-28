"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceOrderItem = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const _1 = require(".");
const service_report_item_model_1 = require("./service-report-item.model");
const service_report_material_model_1 = require("./service-report-material.model");
let ServiceOrderItem = class ServiceOrderItem extends _1.BaseServiceOrderItem {
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
], ServiceOrderItem.prototype, "uuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        default: 0,
    }),
    tslib_1.__metadata("design:type", Number)
], ServiceOrderItem.prototype, "SMPrice", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ServiceOrderItem.prototype, "width", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ServiceOrderItem.prototype, "height", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ServiceOrderItem.prototype, "depth", void 0);
tslib_1.__decorate([
    repository_1.belongsTo(() => service_report_item_model_1.ServiceReportItem, { name: 'item' }),
    tslib_1.__metadata("design:type", String)
], ServiceOrderItem.prototype, "serviceReportItemId", void 0);
tslib_1.__decorate([
    repository_1.belongsTo(() => service_report_material_model_1.ServiceReportMaterial, { name: 'material' }),
    tslib_1.__metadata("design:type", String)
], ServiceOrderItem.prototype, "serviceReportMaterialId", void 0);
ServiceOrderItem = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], ServiceOrderItem);
exports.ServiceOrderItem = ServiceOrderItem;
//# sourceMappingURL=service-order-item.model.js.map