"use strict";
var Branch_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Branch = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const lead_model_1 = require("./lead.model");
const user_model_1 = require("./user.model");
let Branch = Branch_1 = class Branch extends repository_1.Entity {
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
], Branch.prototype, "uuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Branch.prototype, "name", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Branch.prototype, "code", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        default: 'dealer'
    }),
    tslib_1.__metadata("design:type", String)
], Branch.prototype, "type", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Branch.prototype, "telno", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Branch.prototype, "faxno", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Branch.prototype, "email", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Branch.prototype, "address1", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Branch.prototype, "address2", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Branch.prototype, "state", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Branch.prototype, "country", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Branch.prototype, "SSMNo", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Branch.prototype, "GSTNo", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string'
    }),
    tslib_1.__metadata("design:type", String)
], Branch.prototype, "logo", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Branch.prototype, "branchId", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        default: 999
    }),
    tslib_1.__metadata("design:type", Number)
], Branch.prototype, "priority", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        default: 0
    }),
    tslib_1.__metadata("design:type", Number)
], Branch.prototype, "leadcapacity", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        default: 0
    }),
    tslib_1.__metadata("design:type", Number)
], Branch.prototype, "multiplier", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'date',
        default: () => new Date(),
    }),
    tslib_1.__metadata("design:type", Date)
], Branch.prototype, "createdAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'date',
        default: () => new Date(),
    }),
    tslib_1.__metadata("design:type", Date)
], Branch.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => Branch_1, { keyTo: 'branchId' }),
    tslib_1.__metadata("design:type", Array)
], Branch.prototype, "subBranches", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => lead_model_1.Lead, { keyTo: 'branchId' }),
    tslib_1.__metadata("design:type", Array)
], Branch.prototype, "leads", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => user_model_1.User),
    tslib_1.__metadata("design:type", Array)
], Branch.prototype, "users", void 0);
Branch = Branch_1 = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Branch);
exports.Branch = Branch;
//# sourceMappingURL=branch.model.js.map