"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rolepermission = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const _1 = require(".");
let Rolepermission = class Rolepermission extends _1.BaseEntity {
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
], Rolepermission.prototype, "uuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Rolepermission.prototype, "roleUuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Rolepermission.prototype, "permissionUuid", void 0);
Rolepermission = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Rolepermission);
exports.Rolepermission = Rolepermission;
//# sourceMappingURL=rolepermission.model.js.map