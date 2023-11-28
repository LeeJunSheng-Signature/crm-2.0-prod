"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Setting = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Setting = class Setting extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Setting.prototype, "key", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Setting.prototype, "value", void 0);
Setting = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Setting);
exports.Setting = Setting;
//# sourceMappingURL=setting.model.js.map