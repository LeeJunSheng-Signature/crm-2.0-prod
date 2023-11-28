"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationSchema = void 0;
exports.NotificationSchema = {
    type: 'object',
    required: ['title', 'string'],
    properties: {
        playerIds: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
        externalUserIds: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
        segments: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
        title: {
            type: 'string',
        },
        message: {
            type: 'string',
        },
    },
};
//# sourceMappingURL=notification.schema.js.map