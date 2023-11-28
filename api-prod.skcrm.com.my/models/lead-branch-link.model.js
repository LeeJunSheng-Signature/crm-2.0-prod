"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadBranchLink = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let LeadBranchLink = class LeadBranchLink extends repository_1.Entity {
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
], LeadBranchLink.prototype, "uuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], LeadBranchLink.prototype, "total", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], LeadBranchLink.prototype, "current", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'date',
    }),
    tslib_1.__metadata("design:type", Date)
], LeadBranchLink.prototype, "date", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], LeadBranchLink.prototype, "campaign", void 0);
LeadBranchLink = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], LeadBranchLink);
exports.LeadBranchLink = LeadBranchLink;
//# sourceMappingURL=lead-branch-link.model.js.map