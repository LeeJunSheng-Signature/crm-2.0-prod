"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const otplib_1 = require("otplib");
let OtpService = class OtpService {
    constructor() {
        var _a;
        this.secret = (_a = process.env.OTP_SECRET) !== null && _a !== void 0 ? _a : '';
    }
    getOTPCode() {
        return otplib_1.authenticator.generate(this.secret);
    }
    verifyOTP(token, createdAt) {
        var _a;
        const time = new Date().getTime() - createdAt.getTime();
        const validity = parseInt((_a = process.env.OTP_VALIDITY) !== null && _a !== void 0 ? _a : '0');
        if (time > validity) {
            return false;
        }
        return otplib_1.authenticator.check(token, this.secret);
    }
};
OtpService = tslib_1.__decorate([
    core_1.bind({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__metadata("design:paramtypes", [])
], OtpService);
exports.OtpService = OtpService;
//# sourceMappingURL=otp.service.js.map