"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdditionalLeadAttributeFCOSchema = void 0;
exports.AdditionalLeadAttributeFCOSchema = {
    type: 'object',
    required: ['birthday', 'race', 'deliveryAddress', 'propertySize'],
    properties: {
        birthday: { type: 'number', length: 6 },
        race: { type: 'string' },
        propertySize: { type: 'number' },
        deliveryAddress: { type: 'string' },
        property_type: { type: 'string' },
        email: { type: 'string' },
    },
};
//# sourceMappingURL=additional-lead-attribute-fco.schema.js.map