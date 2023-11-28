"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPermissionAttachSchema = void 0;
exports.UserPermissionAttachSchema = {
    type: 'object',
    properties: {
        permissionIds: {
            type: 'array',
            items: { type: 'string' }
        },
        rolesIds: {
            type: 'array',
            items: { type: 'string' }
        }
    }
};
//# sourceMappingURL=user-permission-attach.schema.js.map