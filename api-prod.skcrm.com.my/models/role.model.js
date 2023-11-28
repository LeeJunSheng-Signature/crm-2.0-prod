"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const base_entity_model_1 = require("./base-entity.model");
const permission_model_1 = require("./permission.model");
const rolepermission_model_1 = require("./rolepermission.model");
const user_role_model_1 = require("./user-role.model");
const user_model_1 = require("./user.model");
let Role = class Role extends base_entity_model_1.BaseEntity {
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
], Role.prototype, "uuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Role.prototype, "name", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Role.prototype, "displayName", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => permission_model_1.Permission, { through: { model: () => rolepermission_model_1.Rolepermission, keyFrom: 'roleUuid', keyTo: 'permissionUuid' } }),
    tslib_1.__metadata("design:type", Array)
], Role.prototype, "permissions", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => user_model_1.User, { through: { model: () => user_role_model_1.UserRole, keyFrom: 'roleUuid', keyTo: 'userUuid' } }),
    tslib_1.__metadata("design:type", Array)
], Role.prototype, "users", void 0);
Role = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Role);
exports.Role = Role;
//# sourceMappingURL=role.model.js.map