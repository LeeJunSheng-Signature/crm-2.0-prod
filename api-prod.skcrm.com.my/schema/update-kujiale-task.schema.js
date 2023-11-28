"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateKujialeTaskSchema = void 0;
exports.UpdateKujialeTaskSchema = {
    type: 'object',
    required: ['drawingUuid', 'drawingId', 'leadId'],
    properties: {
        drawingUuid: {
            type: 'string'
        },
        drawingId: {
            type: 'string',
        },
        leadId: {
            type: 'string'
        },
    },
};
//# sourceMappingURL=update-kujiale-task.schema.js.map