"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceReportCalculateSchema = void 0;
const baseItemProperty = {
    quantity: { type: 'number' },
    width: { type: 'string' },
    height: { type: 'string' },
    depth: { type: 'string' },
    rootCause: { type: 'string' },
    reason: { type: 'string' },
    subReason: { type: 'string' },
    party: { type: 'string' },
    remarks: { type: 'string' },
    remarksFactory: { type: 'string' },
};
const items = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            ...baseItemProperty,
            serviceReportItemId: { type: 'string' },
            serviceReportMaterialId: { type: 'string' },
        }
    }
};
const customItems = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            ...baseItemProperty,
            item: { type: 'string' },
            material: { type: 'string' },
            colour: { type: 'string' },
            profile: { type: 'string' },
            unitPrice: { type: 'number' },
        }
    }
};
exports.ServiceReportCalculateSchema = {
    type: 'object',
    required: ['items', 'customItems'],
    properties: {
        items,
        customItems,
    },
};
//# sourceMappingURL=service-report-calculate-schema.js.map