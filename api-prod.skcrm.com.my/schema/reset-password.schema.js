"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordSchema = void 0;
exports.ResetPasswordSchema = {
    type: 'object',
    required: ['password'],
    properties: {
        password: {
            type: 'string',
            minLength: 4,
        }
    },
};
//# sourceMappingURL=reset-password.schema.js.map