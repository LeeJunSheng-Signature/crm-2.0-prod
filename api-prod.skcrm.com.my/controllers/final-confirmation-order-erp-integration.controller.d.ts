import { FinalConfirmationOrderWithRelations } from '../models';
import { DesignRepository, FinalConfirmationOrderRepository, ProfileRepository, DesignCreateCronJobRepository } from '../repositories';
export declare class FinalConfirmationOrderErpIntegrationController {
    designRepository: DesignRepository;
    finalConfirmationOrderRepository: FinalConfirmationOrderRepository;
    profileRepository: ProfileRepository;
    designCreateCronJobRepository: DesignCreateCronJobRepository;
    constructor(designRepository: DesignRepository, finalConfirmationOrderRepository: FinalConfirmationOrderRepository, profileRepository: ProfileRepository, designCreateCronJobRepository: DesignCreateCronJobRepository);
    findOrderConfirmationsNew(): Promise<Promise<{
        uuid: string | undefined;
        date: string | undefined;
        quotationNumber: string | undefined;
        customer: {
            uuid: string | undefined;
            name: string | undefined;
            phone: string | undefined;
            email: string | undefined;
            address1: string | undefined;
            address2: string | undefined;
            postcode: string | undefined;
            city: string | undefined;
            state: string | undefined;
        };
        salesConsultant: {
            name: string | undefined;
            phone: string | undefined;
            code: string | undefined;
        };
        design: {
            designId: string | undefined;
            jobPart: string | undefined;
            drawingNumber: string | undefined;
            quotationNumber: string | undefined;
            jobNumber: string;
            createdAt: Date | undefined;
            totalPrice: number;
            totalPriceDrawingItems: number;
            totalPriceTradingItems: number;
            totalPriceLooseItems: number;
            totalPriceOtherItems: number;
            totalPriceBasketItems: number;
            roundUpDiscount: number;
            isIncludedInstallationCharge: boolean;
            installationCharges: number;
            isIncludedInstallerOutstationCharge: boolean;
            installerOutstationDistance: number;
            installerOutstationCharges: number;
            isIncludedTransportationCharge: boolean;
            transportationDistance: number;
            transportationCharges: number;
            totalPriceDealer: number;
            totalPriceDrawingItemsDealer: number;
            totalPriceTradingItemsDealer: number;
            totalPriceLooseItemsDealer: number;
            totalPriceOtherItemsDealer: number;
            totalPriceBasketItemsDealer: number;
            roundUpDiscountDealer: number;
            isIncludedInstallationChargeDealer: boolean;
            installationChargesDealer: number;
            isIncludedInstallerOutstationChargeDealer: boolean;
            installerOutstationDistanceDealer: number;
            installerOutstationChargesDealer: number;
            isIncludedTransportationChargeDealer: boolean;
            transportationDistanceDealer: number;
            transportationChargesDealer: number;
            discountedTotalPriceDrawingItems: number;
            discountedTotalPriceTradingItems: number;
            discountedTotalPriceLooseItems: number;
            discountedTotalPriceOtherItems: number;
            discountedTotalPriceBasketItems: number;
            discountedTotalPrice: number;
            discountedTotalAmount: () => number;
            totaldrawing: number;
            worktopLabourCharges: string;
            worktopOutstationCharges: string;
            worktopLabourChargesDealer: string;
            worktopOutstationChargesDealer: string;
        }[];
        branch: {
            branch_name: string | undefined;
            branch_code: string | undefined;
            branch_category: string | undefined;
        };
        items: {
            quotationId: string;
            designId: string;
            productCategory: string;
            productSubCategory: string;
            productName: string | undefined;
            productNumber: string | undefined;
            retailPrice: number | undefined;
            dealerPrice: number | undefined;
            type_description: string;
            doorfinishing_list: string;
            item_quantity: number | undefined;
            uom: string;
            totaldrawing: number;
            myitem_discount: number;
            totalamount: number;
            totalamountdealer: number;
        }[];
        tradingItems: {
            designId: string;
            tradingItemId: string;
            stdcost: number | undefined;
            category: string | undefined;
            name: string | undefined;
            part: string | undefined;
            type_description: string;
            doorfinishing_list: string;
            uom: string;
            item_quantity: number;
            discount: number;
            totaldrawing: number;
            myitem_discount: number;
            totalamount: number;
            totalamountdealer: number;
        }[];
        looseItems: {
            additionalItem: string;
            looseItemId: string;
            stdcost: number | undefined;
            category: string | undefined;
            name: string | undefined;
            part: string | undefined;
            type_description: string;
            doorfinishing_list: string;
            uom: string | undefined;
            puom: string | undefined;
            suom: string | undefined;
            item_quantity: number;
            discount: number;
            totaldrawing: number;
            myitem_discount: number;
            totalamount: number;
            totalamountdealer: number;
        }[];
        otherItems: {
            designId: string;
            otherItemId: string | undefined;
            stdcost: any;
            category: any;
            name: string;
            type_description: string;
            doorfinishing_list: string;
            uom: any;
            item_quantity: number;
            discount: number;
            totaldrawing: number;
            myitem_discount: number;
            totalamount: number;
            totalamountdealer: number;
        }[];
        combineAllItems: ({
            quotationId: string;
            designId: string;
            productCategory: string;
            productSubCategory: string;
            productName: string | undefined;
            productNumber: string | undefined;
            retailPrice: number | undefined;
            dealerPrice: number | undefined;
            type_description: string;
            doorfinishing_list: string;
            item_quantity: number | undefined;
            uom: string;
            totaldrawing: number;
            myitem_discount: number;
            totalamount: number;
            totalamountdealer: number;
        } | {
            designId: string;
            tradingItemId: string;
            stdcost: number | undefined;
            category: string | undefined;
            name: string | undefined;
            part: string | undefined;
            type_description: string;
            doorfinishing_list: string;
            uom: string;
            item_quantity: number;
            discount: number;
            totaldrawing: number;
            myitem_discount: number;
            totalamount: number;
            totalamountdealer: number;
        } | {
            additionalItem: string;
            looseItemId: string;
            stdcost: number | undefined;
            category: string | undefined;
            name: string | undefined;
            part: string | undefined;
            type_description: string;
            doorfinishing_list: string;
            uom: string | undefined;
            puom: string | undefined;
            suom: string | undefined;
            item_quantity: number;
            discount: number;
            totaldrawing: number;
            myitem_discount: number;
            totalamount: number;
            totalamountdealer: number;
        } | {
            designId: string;
            otherItemId: string | undefined;
            stdcost: any;
            category: any;
            name: string;
            type_description: string;
            doorfinishing_list: string;
            uom: any;
            item_quantity: number;
            discount: number;
            totaldrawing: number;
            myitem_discount: number;
            totalamount: number;
            totalamountdealer: number;
        })[];
        totalPriceDrawingItems: number;
        totalPriceTradingItems: number;
        totalPriceLooseItems: number;
        totalPriceOtherItems: number;
        totalPrice: number;
        totalPriceDrawingItemsDiscounted: number;
        totalPriceTradingItemsDiscounted: number;
        totalPriceLooseItemsDiscounted: number;
        totalPriceOtherItemsDiscounted: number;
        totalPriceDiscounted: number;
        installationCharges: number;
        installerOutstationCharges: number;
        transportationCharges: number;
        total: number;
        roundUpDiscount: number;
        gst: number;
        nettTotal: number;
        roundDown: number;
        downPayment: number;
        balancePayment: number;
        total_approved_amount: number;
        totalPriceDealer: number;
        installationChargesDealer: number;
        installerOutstationChargesDealer: number;
        transportationChargesDealer: number;
        totalDealer: number;
        roundUpDiscountDealer: number;
        gstDealer: number;
        nettTotalDealer: number;
        roundDownDealer: number;
        downPaymentDealer: number;
        balancePaymentDealer: number;
        cashVoucher: string;
        firstDepositDate: string;
        txtworktoplabourcharges: string;
        txtworktopoutstationcharges: string;
    }>[]>;
    updateOrderConfirmationNewProcessed(orderConfirmationIds: string[]): Promise<void>;
    findOrderConfirmationPassDepositThresholdPercentage(): Promise<Promise<{
        uuid: string | undefined;
        date: string | undefined;
        quotationNumber: string | undefined;
        customer: {
            uuid: string | undefined;
            name: string | undefined;
            phone: string | undefined;
            email: string | undefined;
            address1: string;
            address2: string;
            postcode: string | undefined;
            city: string | undefined;
            state: string | undefined;
            country: string | undefined;
            type: string | undefined;
            exhibition: string | undefined;
        };
        salesConsultant: {
            name: string | undefined;
            phone: string | undefined;
            userCode: string | undefined;
        };
        branch: string | undefined;
        branchCode: string | undefined;
        branchType: string | undefined;
        fcoErpProcessedProduction: boolean;
        ocErpPulledDeposit: boolean;
        design: {
            designReferenceName: string;
            jobNumber: string;
            designId: string | undefined;
            items: import("../models").QuotationDetails[];
            additionalItems: {
                stdcost: number | undefined;
                category: string | undefined;
                name: string | undefined;
                uom: string | undefined;
                quantity: number;
                discount: number;
            }[];
            isProcessedERPProduction: boolean;
            installationCharges: number;
            transportationCharges: number;
            worktopOutstationCharges: number;
            roundUpDiscount: number;
            total: number;
            gst: number;
        } | ({
            number: number;
            designId: string | undefined;
            drawingNumber: string | undefined;
            jobNumber: string;
            item: string;
            description: string;
            quantity: number;
            uom: string;
            unitPrice: number;
            discount: number;
            amount: number;
            isProcessedERPAcknowledged: boolean;
        } | undefined)[];
        additionalItems: {
            item: string | undefined;
            description: string | undefined;
            quantity: number;
            uom: string | undefined;
            unitPrice: number;
            discount: number;
            amount: number;
        }[];
        installationCharges: number | undefined;
        transportationCharges: number | undefined;
        worktopOutstationCharges: number | undefined;
        total: number;
        roundUpDiscount: number;
        gst: number;
        nettTotal: number;
        roundDown: number;
        downPayment: number;
        balancePayment: number;
    }>[]>;
    updateOrderConfirmationPassDepositThresholdPercentageProcessed(orderConfirmationIds: string[]): Promise<void>;
    findFinalConfirmationOrdersProduction(): Promise<Promise<{
        uuid: string | undefined;
        date: string | undefined;
        quotationNumber: string | undefined;
        customer: {
            uuid: string | undefined;
            name: string | undefined;
            phone: string | undefined;
            email: string | undefined;
            address1: string | undefined;
            address2: string | undefined;
            postcode: string | undefined;
            city: string | undefined;
            state: string | undefined;
        };
        salesConsultant: {
            name: string | undefined;
            phone: string | undefined;
            code: string | undefined;
        };
        design: {
            designId: string | undefined;
            jobPart: string | undefined;
            drawingNumber: string | undefined;
            quotationNumber: string | undefined;
            jobNumber: string;
            createdAt: Date | undefined;
            totalPrice: number;
            totalPriceDrawingItems: number;
            totalPriceTradingItems: number;
            totalPriceLooseItems: number;
            totalPriceOtherItems: number;
            totalPriceBasketItems: number;
            roundUpDiscount: number;
            isIncludedInstallationCharge: boolean;
            installationCharges: number;
            isIncludedInstallerOutstationCharge: boolean;
            installerOutstationDistance: number;
            installerOutstationCharges: number;
            isIncludedTransportationCharge: boolean;
            transportationDistance: number;
            transportationCharges: number;
            totalPriceDealer: number;
            totalPriceDrawingItemsDealer: number;
            totalPriceTradingItemsDealer: number;
            totalPriceLooseItemsDealer: number;
            totalPriceOtherItemsDealer: number;
            totalPriceBasketItemsDealer: number;
            roundUpDiscountDealer: number;
            isIncludedInstallationChargeDealer: boolean;
            installationChargesDealer: number;
            isIncludedInstallerOutstationChargeDealer: boolean;
            installerOutstationDistanceDealer: number;
            installerOutstationChargesDealer: number;
            isIncludedTransportationChargeDealer: boolean;
            transportationDistanceDealer: number;
            transportationChargesDealer: number;
            discountedTotalPriceDrawingItems: number;
            discountedTotalPriceTradingItems: number;
            discountedTotalPriceLooseItems: number;
            discountedTotalPriceOtherItems: number;
            discountedTotalPriceBasketItems: number;
            discountedTotalPrice: number;
            discountedTotalAmount: () => number;
            totaldrawing: number;
            worktopLabourCharges: string;
            worktopOutstationCharges: string;
            worktopLabourChargesDealer: string;
            worktopOutstationChargesDealer: string;
        }[];
        branch: {
            branch_name: string | undefined;
            branch_code: string | undefined;
            branch_category: string | undefined;
        };
        items: {
            quotationId: string;
            designId: string;
            productCategory: string;
            productSubCategory: string;
            productName: string | undefined;
            productNumber: string | undefined;
            retailPrice: number | undefined;
            dealerPrice: number | undefined;
            type_description: string;
            doorfinishing_list: string;
            item_quantity: number | undefined;
            uom: string;
            totaldrawing: number;
            myitem_discount: number;
            totalamount: number;
            totalamountdealer: number;
        }[];
        tradingItems: {
            designId: string;
            tradingItemId: string;
            stdcost: number | undefined;
            category: string | undefined;
            name: string | undefined;
            part: string | undefined;
            type_description: string;
            doorfinishing_list: string;
            uom: string;
            item_quantity: number;
            discount: number;
            totaldrawing: number;
            myitem_discount: number;
            totalamount: number;
            totalamountdealer: number;
        }[];
        looseItems: {
            additionalItem: string;
            looseItemId: string;
            stdcost: number | undefined;
            category: string | undefined;
            name: string | undefined;
            part: string | undefined;
            type_description: string;
            doorfinishing_list: string;
            uom: string | undefined;
            puom: string | undefined;
            suom: string | undefined;
            item_quantity: number;
            discount: number;
            totaldrawing: number;
            myitem_discount: number;
            totalamount: number;
            totalamountdealer: number;
        }[];
        otherItems: {
            designId: string;
            otherItemId: string | undefined;
            stdcost: any;
            category: any;
            name: string;
            type_description: string;
            doorfinishing_list: string;
            uom: any;
            item_quantity: number;
            discount: number;
            totaldrawing: number;
            myitem_discount: number;
            totalamount: number;
            totalamountdealer: number;
        }[];
        combineAllItems: ({
            quotationId: string;
            designId: string;
            productCategory: string;
            productSubCategory: string;
            productName: string | undefined;
            productNumber: string | undefined;
            retailPrice: number | undefined;
            dealerPrice: number | undefined;
            type_description: string;
            doorfinishing_list: string;
            item_quantity: number | undefined;
            uom: string;
            totaldrawing: number;
            myitem_discount: number;
            totalamount: number;
            totalamountdealer: number;
        } | {
            designId: string;
            tradingItemId: string;
            stdcost: number | undefined;
            category: string | undefined;
            name: string | undefined;
            part: string | undefined;
            type_description: string;
            doorfinishing_list: string;
            uom: string;
            item_quantity: number;
            discount: number;
            totaldrawing: number;
            myitem_discount: number;
            totalamount: number;
            totalamountdealer: number;
        } | {
            additionalItem: string;
            looseItemId: string;
            stdcost: number | undefined;
            category: string | undefined;
            name: string | undefined;
            part: string | undefined;
            type_description: string;
            doorfinishing_list: string;
            uom: string | undefined;
            puom: string | undefined;
            suom: string | undefined;
            item_quantity: number;
            discount: number;
            totaldrawing: number;
            myitem_discount: number;
            totalamount: number;
            totalamountdealer: number;
        } | {
            designId: string;
            otherItemId: string | undefined;
            stdcost: any;
            category: any;
            name: string;
            type_description: string;
            doorfinishing_list: string;
            uom: any;
            item_quantity: number;
            discount: number;
            totaldrawing: number;
            myitem_discount: number;
            totalamount: number;
            totalamountdealer: number;
        })[];
        totalPriceDrawingItems: number;
        totalPriceTradingItems: number;
        totalPriceLooseItems: number;
        totalPriceOtherItems: number;
        totalPrice: number;
        totalPriceDrawingItemsDiscounted: number;
        totalPriceTradingItemsDiscounted: number;
        totalPriceLooseItemsDiscounted: number;
        totalPriceOtherItemsDiscounted: number;
        totalPriceDiscounted: number;
        installationCharges: number;
        installerOutstationCharges: number;
        transportationCharges: number;
        total: number;
        roundUpDiscount: number;
        gst: number;
        nettTotal: number;
        roundDown: number;
        downPayment: number;
        balancePayment: number;
        total_approved_amount: number;
        totalPriceDealer: number;
        installationChargesDealer: number;
        installerOutstationChargesDealer: number;
        transportationChargesDealer: number;
        totalDealer: number;
        roundUpDiscountDealer: number;
        gstDealer: number;
        nettTotalDealer: number;
        roundDownDealer: number;
        downPaymentDealer: number;
        balancePaymentDealer: number;
        cashVoucher: string;
        firstDepositDate: string;
        txtworktoplabourcharges: string;
        txtworktopoutstationcharges: string;
    }>[]>;
    findFinalConfirmationOrderProductionCreate(): Promise<{}>;
    findFinalConfirmationOrderProductionUpdate(): Promise<{}>;
    updateFinalConfirmationOrderDesignById(id: string, isProcessed: string): Promise<FinalConfirmationOrderWithRelations | String>;
    findFinalConfirmationOrderAcknowledged(): Promise<{}>;
    updateOrderConfirmationDesignById(id: string, isProcessed: string): Promise<FinalConfirmationOrderWithRelations | String>;
    updateFinalConfirmationOrderProductionProcessed(finalConfirmationOrderIds: string[]): Promise<void>;
    private getOrderIncludeFilter;
    private transformOrderConfirmationFormat;
    private transformOrderShape;
    patch(orderId: string, createType: string, createDone: string): Promise<String>;
}
