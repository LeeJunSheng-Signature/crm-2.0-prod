"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialSchema = void 0;
exports.CredentialSchema = {
    type: 'object',
    required: ['loginId', 'password'],
    properties: {
        loginId: {
            type: 'string',
        },
        password: {
            type: 'string',
            minLength: 4,
        },
    },
};
//# sourceMappingURL=credential.schema.js.map