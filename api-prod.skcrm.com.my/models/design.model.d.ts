import { BaseEntity } from '.';
import { BrandGoods, BrandGoodsWithRelations } from './brand-goods.model';
import { DesignAdditionalItem, DesignAdditionalItemWithRelations } from './design-additional-item.model';
import { DesignAdditionalLooseItem, DesignAdditionalLooseItemWithRelations } from './design-additional-loose-item.model';
import { DesignCreateCronJob } from './design-create-cron-job.model';
import { DesignOtherItem, DesignOtherItemWithRelations } from './design-other-item.model';
import { LeadWithRelations } from './lead.model';
import { OrderInfo } from './order-info.model';
import { QuotationDetails } from './quotation-details.model';
import { TradingItem, TradingItemWithRelations } from './trading-item.model';
import { LooseItem, LooseItemWithRelations } from './loose-item.model';
export declare class Design extends BaseEntity {
    uuid?: string;
    referenceName: string;
    quotationNumber?: string;
    state: string;
    materials: string;
    drawingNumber?: string;
    jobPart?: string;
    transportationDistance: number;
    transportationCharge: number;
    installerOutstationDistance: number;
    installerOutstationCharge: number;
    totalInstallationCharges: number;
    totalPriceTradingItems: number;
    discountedTotalPriceTradingItems: number;
    totalPriceDrawingItems: number;
    discountedTotalPriceDrawingItems: number;
    totalPriceBasketItems: number;
    discountedTotalPriceBasketItems: number;
    masterItemDiscount: number;
    basketItemDiscount: number;
    lumpsum: number;
    totalPrice: number;
    discountedTotalPrice: number;
    totalPriceLooseItems: number;
    discountedTotalPriceLooseItems: number;
    totalPriceOtherItems: number;
    discountedTotalPriceOtherItems: number;
    isIncludedWorktopOutstationCharge: boolean;
    isIncludedInstallationCharge: boolean;
    isIncludedInstallerOutstationCharge: boolean;
    isIncludedTransportationCharge: boolean;
    isToSummary: boolean;
    isProcessedERPProduction: boolean;
    isProcessedERPAcknowledged: boolean;
    leadId: string;
    orderInfo: OrderInfo;
    brandGoods: BrandGoods[];
    quotationDetails: QuotationDetails[];
    tradingItems: TradingItem[];
    looseItems: LooseItem[];
    designOtherItems: DesignOtherItem[];
    designAdditionalItems: DesignAdditionalItem[];
    designAdditionalLooseItems: DesignAdditionalLooseItem[];
    finalConfirmationOrderId: string;
    designs: Design[];
    designCreateCronJob: DesignCreateCronJob;
    constructor(data?: Partial<Design>);
    totalAmount(): number;
    discountedTotalAmount(): number;
}
export interface DesignRelations {
    lead?: LeadWithRelations;
    additionalItem?: DesignAdditionalItemWithRelations;
    tradingItems?: TradingItemWithRelations;
    additionalLooseItem?: DesignAdditionalLooseItemWithRelations;
    looseItems?: LooseItemWithRelations;
    designOtherItems?: DesignOtherItemWithRelations;
    brandGoods?: BrandGoodsWithRelations;
}
export declare type DesignWithRelations = Design & DesignRelations;