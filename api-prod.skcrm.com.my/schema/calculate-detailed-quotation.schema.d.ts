export declare const CalculateDetailedQuotationSchema: {
    type: string;
    required: string[];
    properties: {
        tradingItems: {
            type: string;
            items: {
                type: string;
                properties: {
                    uuid: {
                        type: string;
                    };
                    quantity: {
                        type: string;
                    };
                };
            };
        };
        masterItemDiscount: {
            type: string;
        };
        basketItemDiscount: {
            type: string;
        };
        otherItems: {
            type: string;
            items: {
                type: string;
                properties: {
                    uuid: {
                        type: string;
                    };
                    quantity: {
                        type: string;
                    };
                    UOM: {
                        type: string;
                    };
                    name: {
                        type: string;
                    };
                    description: {
                        type: string;
                    };
                    unitPrice: {
                        type: string;
                    };
                    discount: {
                        type: string;
                    };
                    discountedPrice: {
                        type: string;
                    };
                };
            };
        };
    };
};
