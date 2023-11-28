"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const _1 = require(".");
const user_model_1 = require("./user.model");
let Session = class Session extends _1.BaseEntity {
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
], Session.prototype, "uuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Session.prototype, "deviceToken", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Session.prototype, "pushType", void 0);
tslib_1.__decorate([
    repository_1.belongsTo(() => user_model_1.User, { name: 'user' }),
    tslib_1.__metadata("design:type", String)
], Session.prototype, "userUuid", void 0);
Session = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Session);
exports.Session = Session;
//# sourceMappingURL=session.model.js.map