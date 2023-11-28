"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const _1 = require(".");
const user_model_1 = require("./user.model");
let Profile = class Profile extends _1.BaseEntity {
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
], Profile.prototype, "uuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string'
    }),
    tslib_1.__metadata("design:type", String)
], Profile.prototype, "sccode", void 0);
tslib_1.__decorate([
    repository_1.belongsTo(() => user_model_1.User),
    tslib_1.__metadata("design:type", String)
], Profile.prototype, "userId", void 0);
Profile = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Profile);
exports.Profile = Profile;
//# sourceMappingURL=profile.model.js.map