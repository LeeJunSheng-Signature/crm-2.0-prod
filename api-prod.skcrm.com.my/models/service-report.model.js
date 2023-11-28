"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceReport = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const _1 = require(".");
const lead_model_1 = require("./lead.model");
const payment_attachment_model_1 = require("./payment-attachment.model");
const service_report_state_enum_1 = require("../types/service-report-state.enum");
const service_report_types_enum_1 = require("../types/service-report-types.enum");
const user_model_1 = require("./user.model");
const service_order_item_custom_model_1 = require("./service-order-item-custom.model");
const service_order_item_model_1 = require("./service-order-item.model");
let ServiceReport = class ServiceReport extends _1.BaseEntity {
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
], ServiceReport.prototype, "uuid", void 0);
tslib_1.__decorate([
    repository_1.property({ type: 'string', required: true, }),
    tslib_1.__metadata("design:type", String)
], ServiceReport.prototype, "LogNumber", void 0);
tslib_1.__decorate([
    repository_1.property({ type: 'string', required: true, }),
    tslib_1.__metadata("design:type", String)
], ServiceReport.prototype, "type", void 0);
tslib_1.__decorate([
    repository_1.property({ type: 'string', required: true, }),
    tslib_1.__metadata("design:type", String)
], ServiceReport.prototype, "state", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'array',
        itemType: 'string',
        required: false,
        default: [],
        description: `
      To be inserted when detailer picks the role
      they want to send the report to.

      e.g. if pick Purchaser & Logistic
        stateSequence = ['Purchaser', 'Logistic']
        Purchaser ->(purchaser click complete) Logistic ->(logistic click complete) Closed

      e.g. if pick Purchaser only
        stateSequence = ['Purchaser']
        Purchaser -> Closed

      e.g. if pick all:
        stateSequence = ['Purchaser', 'Factory', 'Logistic']
        Purchaser -> Factory -> Logistic -> Closed
    `
    }),
    tslib_1.__metadata("design:type", Array)
], ServiceReport.prototype, "stateSequence", void 0);
tslib_1.__decorate([
    repository_1.property({ type: 'string', required: true, }),
    tslib_1.__metadata("design:type", String)
], ServiceReport.prototype, "installer", void 0);
tslib_1.__decorate([
    repository_1.property({ type: 'date', required: true, }),
    tslib_1.__metadata("design:type", Date)
], ServiceReport.prototype, "installedDate", void 0);
tslib_1.__decorate([
    repository_1.property({ type: 'string', required: true, }),
    tslib_1.__metadata("design:type", String)
], ServiceReport.prototype, "jobNumber", void 0);
tslib_1.__decorate([
    repository_1.property({ type: 'string', required: false }),
    tslib_1.__metadata("design:type", String)
], ServiceReport.prototype, "maintenanceReportJobNumber", void 0);
tslib_1.__decorate([
    repository_1.property({ type: 'string', required: false, default: '', }),
    tslib_1.__metadata("design:type", String)
], ServiceReport.prototype, "remarks", void 0);
tslib_1.__decorate([
    repository_1.property({ type: 'string', required: false, default: '', }),
    tslib_1.__metadata("design:type", String)
], ServiceReport.prototype, "remarksSalesConsultant", void 0);
tslib_1.__decorate([
    repository_1.property({ type: 'string', required: false, default: '', }),
    tslib_1.__metadata("design:type", String)
], ServiceReport.prototype, "remarksDetailer", void 0);
tslib_1.__decorate([
    repository_1.property({ type: 'number', required: false, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], ServiceReport.prototype, "count", void 0);
tslib_1.__decorate([
    repository_1.property({ type: 'date', }),
    tslib_1.__metadata("design:type", Date)
], ServiceReport.prototype, "processedAt", void 0);
tslib_1.__decorate([
    repository_1.property({ type: 'date', }),
    tslib_1.__metadata("design:type", Date)
], ServiceReport.prototype, "submittedAt", void 0);
tslib_1.__decorate([
    repository_1.property({ type: 'object', required: false, default: null }),
    tslib_1.__metadata("design:type", Object)
], ServiceReport.prototype, "leadManualInput", void 0);
tslib_1.__decorate([
    repository_1.belongsTo(() => lead_model_1.Lead, { name: 'lead' }),
    tslib_1.__metadata("design:type", String)
], ServiceReport.prototype, "leadId", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => payment_attachment_model_1.PaymentAttachment),
    tslib_1.__metadata("design:type", Array)
], ServiceReport.prototype, "attachments", void 0);
tslib_1.__decorate([
    repository_1.belongsTo(() => user_model_1.User, { name: 'submitter' }),
    tslib_1.__metadata("design:type", String)
], ServiceReport.prototype, "userId", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => service_order_item_model_1.ServiceOrderItem),
    tslib_1.__metadata("design:type", Array)
], ServiceReport.prototype, "items", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => service_order_item_custom_model_1.ServiceOrderItemCustom),
    tslib_1.__metadata("design:type", Array)
], ServiceReport.prototype, "customItems", void 0);
ServiceReport = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], ServiceReport);
exports.ServiceReport = ServiceReport;
//# sourceMappingURL=service-report.model.js.map