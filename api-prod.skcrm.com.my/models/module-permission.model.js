"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModulePermission = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const _1 = require(".");
let ModulePermission = class ModulePermission extends _1.BaseEntity {
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
], ModulePermission.prototype, "uuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], ModulePermission.prototype, "permissionUuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], ModulePermission.prototype, "moduleUuid", void 0);
ModulePermission = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], ModulePermission);
exports.ModulePermission = ModulePermission;
//# sourceMappingURL=module-permission.model.js.map