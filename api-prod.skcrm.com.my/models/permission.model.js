"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permission = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const _1 = require(".");
const role_model_1 = require("./role.model");
const rolepermission_model_1 = require("./rolepermission.model");
const module_model_1 = require("./module.model");
const module_permission_model_1 = require("./module-permission.model");
const operation_model_1 = require("./operation.model");
const operation_permission_model_1 = require("./operation-permission.model");
const user_model_1 = require("./user.model");
const user_permission_model_1 = require("./user-permission.model");
let Permission = class Permission extends _1.BaseEntity {
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
], Permission.prototype, "uuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Permission.prototype, "name", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => role_model_1.Role, { through: { model: () => rolepermission_model_1.Rolepermission, keyFrom: 'permissionUuid', keyTo: 'roleUuid' } }),
    tslib_1.__metadata("design:type", Array)
], Permission.prototype, "roles", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => module_model_1.Module, { through: { model: () => module_permission_model_1.ModulePermission, keyFrom: 'permissionUuid', keyTo: 'moduleUuid' } }),
    tslib_1.__metadata("design:type", Array)
], Permission.prototype, "modules", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => operation_model_1.Operation, { through: { model: () => operation_permission_model_1.OperationPermission, keyFrom: 'permissionUuid', keyTo: 'operationUuid' } }),
    tslib_1.__metadata("design:type", Array)
], Permission.prototype, "operations", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => user_model_1.User, { through: { model: () => user_permission_model_1.UserPermission } }),
    tslib_1.__metadata("design:type", Array)
], Permission.prototype, "users", void 0);
Permission = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Permission);
exports.Permission = Permission;
//# sourceMappingURL=permission.model.js.map