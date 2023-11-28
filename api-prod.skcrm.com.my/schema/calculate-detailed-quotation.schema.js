"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculateDetailedQuotationSchema = void 0;
exports.CalculateDetailedQuotationSchema = {
    type: 'object',
    required: ['tradingItems', 'masterItemDiscount', 'basketItemDiscount', 'otherItems'],
    properties: {
        tradingItems: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    uuid: { type: 'string' },
                    quantity: { type: 'number' },
                }
            },
        },
        masterItemDiscount: {
            type: 'number'
        },
        basketItemDiscount: {
            type: 'number'
        },
        otherItems: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    uuid: { type: 'string' },
                    quantity: { type: 'number' },
                    UOM: { type: 'string' },
                    name: { type: 'string' },
                    description: { type: 'string' },
                    unitPrice: { type: 'number' },
                    discount: { type: 'number' },
                    discountedPrice: { type: 'number' },
                }
            },
        },
    },
};
//# sourceMappingURL=calculate-detailed-quotation.schema.js.map