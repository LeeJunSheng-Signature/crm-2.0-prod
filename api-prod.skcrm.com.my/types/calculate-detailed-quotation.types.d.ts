export declare type CalculateDetailedQuotation = {
    tradingItems: {
        uuid: string;
        quantity: number;
        discount: number;
    }[];
    looseItems: {
        uuid: string;
        quantity: number;
        discount: number;
    }[];
    masterItemDiscount: number;
    basketItemDiscount: number;
    otherItems: {
        uuid: string;
        quantity: number;
        UOM: string;
        name: string;
        description: string;
        unitPrice: number;
        discount: number;
        discountedPrice: number;
    }[];
};
