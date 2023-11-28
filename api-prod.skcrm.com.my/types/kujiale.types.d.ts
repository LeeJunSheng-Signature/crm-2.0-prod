export declare type CreateKujialeTask = {
    drawingId: string;
    leadId: string;
    drawingReferenceName?: string;
};
export declare type UpdateKujialeTask = {
    drawingUuid: string;
    drawingId: string;
    leadId: string;
};
export declare type FindCustomerOrderResponseResult = {
    templateKey: string;
    orderReadableId: string;
    creatorEmail: string;
    orgId: string;
    designId: string;
    designName: string;
    levelId: string;
    orderDesignId: string;
    itemInfoList: {
        fieldName: string;
        value: string;
    }[];
    state: {
        id: number;
        name: string;
        key: string;
    };
};
export declare type FindCustomerOrderResponse = {
    c: string;
    m: string;
    d: {
        totalCount: number;
        count: number;
        hasMore: boolean;
        result: FindCustomerOrderResponseResult[];
        f: null;
    };
    f: null;
};
export declare type CreateTaskWithCallbackResponse = {
    c: string;
    m: string;
    d: {
        obsTaskId: string;
    };
    f: null;
};
export declare type QuotationItem = {
    id: string;
    parentId: string;
    name: string;
    remark: string;
    obsMaterialIds: string;
    topId: string;
    obsBrandGoodId: string;
    productNumber: string;
    brandGoodCode: string;
    brandGoodName: string;
    description: string;
    size: {
        x: string;
        y: string;
        z: string;
    };
    dimensions: string;
    brandGoodDescription: string;
    customCode: string;
    materialBrandGoodId: string;
    materialBrandGoodCode: string;
    materialName: string;
    materialCustomCode: string;
    quotationUnit: string;
    quantity: number;
    unitPrice: string;
    unitCost: string;
    nonStandardCoef: string;
    additionalFee: string;
    price: string;
    quotationRate: number;
    hided: boolean;
    billOutput: boolean;
    obsAccountId: string;
    baseTexture: string;
};
export declare type QuotationDetailsJson = {
    id: string;
    quotationItems: QuotationItem[];
    packageQuotationInfos: [];
    modelQuotationRelations: [];
    quotatityRelations: [];
    combinations: [];
    rooms: {
        roomId: string;
        roomName: string;
    }[];
    orderInfo: {
        customerName: string;
        customerTelephone: string;
        orderCode: string;
        currentNodeKey: string;
        discard: number;
        associatedSchema: {
            planId: string;
            designId: string;
        }[];
        createTime: string;
        statusId: number;
        obsDesignerUserId: string;
        designerName: string;
        storeName: string;
    };
    accountInfo: {
        accountName: string;
        accountLogo: string;
        accountLogoImage: string;
    };
    surfaces: [];
    auditDesignOrders: [];
    designInfo: {
        levelIndex: number;
        toolType: number;
        name: string;
        roomId: string;
        roomType: null;
    };
    brandGoods: {
        obsBrandGoodId: string;
        brandGoodName: string;
        previewImg: null;
        previewImgUrl: null;
        brandName: string;
        obsAccountId: string;
        seriesTagName: string;
    }[];
    brandGoodTagRelations: [];
    tags: [];
    tagKeys: [];
};
