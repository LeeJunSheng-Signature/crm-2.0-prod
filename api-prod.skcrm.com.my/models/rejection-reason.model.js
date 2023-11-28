"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RejectionReason = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let RejectionReason = class RejectionReason extends repository_1.Entity {
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
], RejectionReason.prototype, "uuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], RejectionReason.prototype, "reasonCategory", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], RejectionReason.prototype, "reasonTitle", void 0);
RejectionReason = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], RejectionReason);
exports.RejectionReason = RejectionReason;
//# sourceMappingURL=rejection-reason.model.js.map