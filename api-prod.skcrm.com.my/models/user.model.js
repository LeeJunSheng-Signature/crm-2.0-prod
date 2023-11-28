"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const base_entity_model_1 = require("./base-entity.model");
const branch_model_1 = require("./branch.model");
const credential_model_1 = require("./credential.model");
const permission_model_1 = require("./permission.model");
const profile_model_1 = require("./profile.model");
const role_model_1 = require("./role.model");
const session_model_1 = require("./session.model");
const user_permission_model_1 = require("./user-permission.model");
const user_role_model_1 = require("./user-role.model");
const user_logging_model_1 = require("./user-logging.model");
const lead_model_1 = require("./lead.model");
let User = class User extends base_entity_model_1.BaseEntity {
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
], User.prototype, "uuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "loginId", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "name", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "mobile", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: false
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "appUID", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: false
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "kujialeEmail", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'boolean',
        default: true,
    }),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "active", void 0);
tslib_1.__decorate([
    repository_1.hasOne(() => credential_model_1.Credential),
    tslib_1.__metadata("design:type", credential_model_1.Credential)
], User.prototype, "credential", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => role_model_1.Role, {
        through: { model: () => user_role_model_1.UserRole, keyFrom: 'userUuid', keyTo: 'roleUuid' },
    }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "roles", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => session_model_1.Session, { keyTo: 'userUuid' }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "sessions", void 0);
tslib_1.__decorate([
    repository_1.hasOne(() => profile_model_1.Profile),
    tslib_1.__metadata("design:type", profile_model_1.Profile)
], User.prototype, "profile", void 0);
tslib_1.__decorate([
    repository_1.belongsTo(() => branch_model_1.Branch),
    tslib_1.__metadata("design:type", String)
], User.prototype, "branchId", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => permission_model_1.Permission, { through: { model: () => user_permission_model_1.UserPermission } }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "permissions", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => user_logging_model_1.UserLogging),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "userLoggings", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => lead_model_1.Lead, { keyTo: 'userId' }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "leads", void 0);
User = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], User);
exports.User = User;
//# sourceMappingURL=user.model.js.map