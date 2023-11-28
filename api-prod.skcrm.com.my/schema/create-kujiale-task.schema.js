"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateKujialeTaskSchema = void 0;
exports.CreateKujialeTaskSchema = {
    type: 'object',
    required: ['drawingId', 'leadId'],
    properties: {
        drawingId: {
            type: 'string',
        },
        leadId: {
            type: 'string'
        },
        drawingReferenceName: {
            type: 'string'
        },
    },
};
//# sourceMappingURL=create-kujiale-task.schema.js.map