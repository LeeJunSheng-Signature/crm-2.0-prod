"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpSchema = void 0;
exports.SignUpSchema = {
    type: 'object',
    required: [
        'name',
        'loginId',
        'mobile',
        'email',
        'password',
        'role',
        'branchId',
    ],
    properties: {
        name: {
            type: 'string',
        },
        loginId: {
            type: 'string',
        },
        mobile: {
            type: 'string',
        },
        email: {
            type: 'string',
            format: 'email',
        },
        role: {
            type: 'string',
        },
        branchId: {
            type: 'string',
        },
        password: {
            type: 'string',
            minLength: 4,
        },
        sccode: {
            type: 'string',
        },
    },
};
//# sourceMappingURL=signup.schema.js.map