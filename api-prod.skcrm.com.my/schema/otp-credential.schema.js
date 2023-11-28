"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPCredentialSchema = void 0;
exports.OTPCredentialSchema = {
    type: 'object',
    required: ['code'],
    properties: {
        code: {
            type: 'string',
            length: 6,
        },
    },
};
//# sourceMappingURL=otp-credential.schema.js.map