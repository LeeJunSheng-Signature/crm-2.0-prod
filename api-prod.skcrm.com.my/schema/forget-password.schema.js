"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgetPasswordSchema = void 0;
exports.ForgetPasswordSchema = {
    type: 'object',
    required: ['token', 'password'],
    properties: {
        token: {
            type: 'string',
        },
        password: {
            type: 'string',
            minLength: 4,
        },
    },
};
//# sourceMappingURL=forget-password.schema.js.map