import { Getter } from '@loopback/core';
import { MyUserProfile } from '../components/jwt-authentication/types';
import { Design } from '../models';
import { BrandGoodsRepository, CalculationLogRepository, DesignRepository, ItemListRepository, LeadRepository, MaterialRepository, MissingItemRepository, OrderInfoRepository, ProcessRepository, QuotationDetailsRepository, RoleRepository } from '../repositories';
import { EmailService, Kujiale } from '../services';
import { CreateKujialeTask, UpdateKujialeTask } from '../types/kujiale.types';
export declare class KujialeController {
    leadRepository: LeadRepository;
    calculationLogRepository: CalculationLogRepository;
    roleRepository: RoleRepository;
    quotationDetailsRepository: QuotationDetailsRepository;
    missingItemRepository: MissingItemRepository;
    designRepository: DesignRepository;
    orderInfoRepository: OrderInfoRepository;
    brandGoodsRepository: BrandGoodsRepository;
    itemListRepository: ItemListRepository;
    materialRepository: MaterialRepository;
    processRepository: ProcessRepository;
    protected kujialeService: Kujiale;
    getCurrentUser: Getter<MyUserProfile>;
    protected emailService: EmailService;
    constructor(leadRepository: LeadRepository, calculationLogRepository: CalculationLogRepository, roleRepository: RoleRepository, quotationDetailsRepository: QuotationDetailsRepository, missingItemRepository: MissingItemRepository, designRepository: DesignRepository, orderInfoRepository: OrderInfoRepository, brandGoodsRepository: BrandGoodsRepository, itemListRepository: ItemListRepository, materialRepository: MaterialRepository, processRepository: ProcessRepository, kujialeService: Kujiale, getCurrentUser: Getter<MyUserProfile>, emailService: EmailService);
    getKujialeAccessToken(): Promise<{
        c: string;
        m: string;
        d: string;
    }>;
    kujialeDrawingCalculate(task: CreateKujialeTask): Promise<{
        totalDrawingPrice: number;
        message: string;
    }>;
    kujialeDrawingCreateDetailedQuotation(task: CreateKujialeTask): Promise<Design>;
    kujialeDrawingUpdateDetailedQuotation(task: UpdateKujialeTask): Promise<Design>;
    private handleMissingItems;
    private getDrawingQuotationDetailsFromKujiale;
    private findCustomerOrder;
    private createInventoryDataAcquisitionTask;
    private getInventoryDataAcquisitionTaskStatus;
    private getInventoryDataAcquisitionTaskResult;
    private findMasterItem;
    private calculateItemRRP;
    private calculateItemInstallationCharge;
    private getItemMaterialAndColorFromMaterialName;
    private getItemProfile;
    private calculateItemTotalProcessCost;
    private calculateItemProcessCost;
    private extractNeededAttributesOnly;
    private createOrUpdateDetailedQuotationFromKujiale;
}
