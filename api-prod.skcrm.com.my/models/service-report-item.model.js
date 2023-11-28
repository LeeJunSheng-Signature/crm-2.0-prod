"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceReportItem = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const _1 = require(".");
let ServiceReportItem = class ServiceReportItem extends _1.BaseEntity {
    constructor(data) {
        super(data);
    }
    isCategory(category) {
        return category === this.category;
    }
    isSubcategory(subcategory) {
        return subcategory === this.subcategory;
    }
    isCategoryIn(categories) {
        return categories.includes(this.category);
    }
    isSubcategoryIn(subcategories) {
        return subcategories.includes(this.subcategory);
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
], ServiceReportItem.prototype, "uuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ServiceReportItem.prototype, "category", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ServiceReportItem.prototype, "subcategory", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ServiceReportItem.prototype, "name", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ServiceReportItem.prototype, "itemcode", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], ServiceReportItem.prototype, "brand", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], ServiceReportItem.prototype, "material", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], ServiceReportItem.prototype, "colour", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], ServiceReportItem.prototype, "profile", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ServiceReportItem.prototype, "uom", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], ServiceReportItem.prototype, "stdcost", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], ServiceReportItem.prototype, "markuprate", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], ServiceReportItem.prototype, "dealerprice", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        default: 'Active'
    }),
    tslib_1.__metadata("design:type", String)
], ServiceReportItem.prototype, "active", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'boolean',
        required: true,
    }),
    tslib_1.__metadata("design:type", Boolean)
], ServiceReportItem.prototype, "oversea", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        default: 0,
    }),
    tslib_1.__metadata("design:type", Number)
], ServiceReportItem.prototype, "overseaDealerPrice", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        default: 0,
    }),
    tslib_1.__metadata("design:type", Number)
], ServiceReportItem.prototype, "SMPrice", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], ServiceReportItem.prototype, "serviceOrderItemId", void 0);
ServiceReportItem = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], ServiceReportItem);
exports.ServiceReportItem = ServiceReportItem;
//# sourceMappingURL=service-report-item.model.js.map