"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationPermission = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const _1 = require(".");
let OperationPermission = class OperationPermission extends _1.BaseEntity {
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
], OperationPermission.prototype, "uuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], OperationPermission.prototype, "permissionUuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], OperationPermission.prototype, "operationUuid", void 0);
OperationPermission = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], OperationPermission);
exports.OperationPermission = OperationPermission;
//# sourceMappingURL=operation-permission.model.js.map