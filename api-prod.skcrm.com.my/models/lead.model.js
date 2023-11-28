"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lead = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const base_entity_model_1 = require("./base-entity.model");
const branch_model_1 = require("./branch.model");
const design_model_1 = require("./design.model");
const exhibition_model_1 = require("./exhibition.model");
const final_confirmation_order_model_1 = require("./final-confirmation-order.model");
const user_model_1 = require("./user.model");
let Lead = class Lead extends base_entity_model_1.BaseEntity {
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
], Lead.prototype, "uuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "name", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "email", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "phone", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "type", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "siteAddress", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "location", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "property_type", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        length: 20
    }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "age", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        length: 50
    }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "propertyStatus", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        length: 30
    }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "property_value", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        length: 100
    }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "renovationStatus", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        length: 40
    }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "propertyUsageStatus", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        length: 25
    }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "buildUpSizeSquareFeet", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "time_contact", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "source_lead", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "channel_contact", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "campaign", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "state", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "status", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "rejectReason", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "requalifyReason", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "noteToBranch", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataLength: 6,
    }),
    tslib_1.__metadata("design:type", Number)
], Lead.prototype, "birthday", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "race", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string'
    }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "lostReason", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string'
    }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "lostRemark", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "address1", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "address2", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "postcode", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "city", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "country", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "locationState", void 0);
tslib_1.__decorate([
    repository_1.belongsTo(() => branch_model_1.Branch, { name: 'branch' }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "branchId", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: false,
        default: ''
    }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "createdByUserUuid", void 0);
tslib_1.__decorate([
    repository_1.belongsTo(() => user_model_1.User, { name: 'user' }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "userId", void 0);
tslib_1.__decorate([
    repository_1.belongsTo(() => exhibition_model_1.Exhibition, { name: 'exhibitions' }),
    tslib_1.__metadata("design:type", String)
], Lead.prototype, "exhibition", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => design_model_1.Design, { keyTo: 'leadId' }),
    tslib_1.__metadata("design:type", Array)
], Lead.prototype, "designs", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => final_confirmation_order_model_1.FinalConfirmationOrder, { keyTo: 'leadId' }),
    tslib_1.__metadata("design:type", Array)
], Lead.prototype, "finalConfirmationOrders", void 0);
Lead = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Lead);
exports.Lead = Lead;
//# sourceMappingURL=lead.model.js.map