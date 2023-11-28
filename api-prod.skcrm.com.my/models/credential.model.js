"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Credential = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const user_model_1 = require("./user.model");
let Credential = class Credential extends repository_1.Entity {
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
], Credential.prototype, "uuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Credential.prototype, "password", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Credential.prototype, "resetToken", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'date',
    }),
    tslib_1.__metadata("design:type", Date)
], Credential.prototype, "tokenCreatedAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'date',
        default: Date(),
    }),
    tslib_1.__metadata("design:type", Date)
], Credential.prototype, "createdAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'date',
        default: Date(),
    }),
    tslib_1.__metadata("design:type", Date)
], Credential.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'boolean',
        default: true,
    }),
    tslib_1.__metadata("design:type", Boolean)
], Credential.prototype, "isActive", void 0);
tslib_1.__decorate([
    repository_1.belongsTo(() => user_model_1.User),
    tslib_1.__metadata("design:type", String)
], Credential.prototype, "userId", void 0);
Credential = tslib_1.__decorate([
    repository_1.model({
        settings: {
            hiddenProperties: ['password'],
        },
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Credential);
exports.Credential = Credential;
//# sourceMappingURL=credential.model.js.map