"use strict";
var Design_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Design = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const _1 = require(".");
const brand_goods_model_1 = require("./brand-goods.model");
const design_additional_item_model_1 = require("./design-additional-item.model");
const design_additional_loose_item_model_1 = require("./design-additional-loose-item.model");
const design_create_cron_job_model_1 = require("./design-create-cron-job.model");
const design_other_item_model_1 = require("./design-other-item.model");
const final_confirmation_order_model_1 = require("./final-confirmation-order.model");
const lead_model_1 = require("./lead.model");
const order_info_model_1 = require("./order-info.model");
const quotation_details_model_1 = require("./quotation-details.model");
const trading_item_model_1 = require("./trading-item.model");
const loose_item_model_1 = require("./loose-item.model");
let Design = Design_1 = class Design extends _1.BaseEntity {
    // @hasMany(() => LooseItem, {
    //   through: {model: () => DesignAdditionalLooseItem, keyFrom: 'designId', keyTo: 'looseItemId'},
    // })
    // looseItems: LooseItem[];
    // TODO: remove the above code comment as it was used during testing
    constructor(data) {
        super(data);
    }
    // TODO: Check on the calculation mechanism with Factory side or Ruiwen, then update these two functions below again
    totalAmount() {
        return this.totalPriceDrawingItems
            + this.totalInstallationCharges
            + this.transportationCharge
            + this.totalPriceLooseItems
            + this.totalPriceTradingItems
            + this.totalPriceOtherItems;
    }
    discountedTotalAmount() {
        return this.discountedTotalPriceDrawingItems
            + this.totalInstallationCharges
            + this.transportationCharge
            + this.discountedTotalPriceLooseItems
            + this.discountedTotalPriceTradingItems
            + this.discountedTotalPriceOtherItems;
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        id: true,
        useDefaultIdType: false,
        defaultFn: 'uuidv4',
    }),
    tslib_1.__metadata("design:type", String)
], Design.prototype, "uuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Design.prototype, "referenceName", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Design.prototype, "quotationNumber", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Design.prototype, "state", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        default: '',
    }),
    tslib_1.__metadata("design:type", String)
], Design.prototype, "materials", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Design.prototype, "drawingNumber", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Design.prototype, "jobPart", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        default: 0.0,
    }),
    tslib_1.__metadata("design:type", Number)
], Design.prototype, "transportationDistance", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        default: 0.0,
    }),
    tslib_1.__metadata("design:type", Number)
], Design.prototype, "transportationCharge", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        default: 0.0,
    }),
    tslib_1.__metadata("design:type", Number)
], Design.prototype, "installerOutstationDistance", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        default: 0.0,
    }),
    tslib_1.__metadata("design:type", Number)
], Design.prototype, "installerOutstationCharge", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        default: 0.00,
    }),
    tslib_1.__metadata("design:type", Number)
], Design.prototype, "totalInstallationCharges", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        precision: 16,
        scale: 2,
        default: 0.00,
    }),
    tslib_1.__metadata("design:type", Number)
], Design.prototype, "totalPriceTradingItems", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        precision: 16,
        scale: 2,
        default: 0.00,
    }),
    tslib_1.__metadata("design:type", Number)
], Design.prototype, "discountedTotalPriceTradingItems", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        precision: 16,
        scale: 2,
        default: 0.00,
    }),
    tslib_1.__metadata("design:type", Number)
], Design.prototype, "totalPriceDrawingItems", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        precision: 16,
        scale: 2,
        default: 0.00,
    }),
    tslib_1.__metadata("design:type", Number)
], Design.prototype, "discountedTotalPriceDrawingItems", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        precision: 16,
        scale: 2,
        default: 0.0,
    }),
    tslib_1.__metadata("design:type", Number)
], Design.prototype, "totalPriceBasketItems", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        precision: 16,
        scale: 2,
        default: 0.0,
    }),
    tslib_1.__metadata("design:type", Number)
], Design.prototype, "discountedTotalPriceBasketItems", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        default: 0.00,
    }),
    tslib_1.__metadata("design:type", Number)
], Design.prototype, "masterItemDiscount", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        default: 0.00,
    }),
    tslib_1.__metadata("design:type", Number)
], Design.prototype, "basketItemDiscount", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        precision: 16,
        scale: 2,
        default: 0.0,
    }),
    tslib_1.__metadata("design:type", Number)
], Design.prototype, "lumpsum", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        precision: 16,
        scale: 2,
        default: 0.0,
    }),
    tslib_1.__metadata("design:type", Number)
], Design.prototype, "totalPrice", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        precision: 16,
        scale: 2,
        default: 0.0,
    }),
    tslib_1.__metadata("design:type", Number)
], Design.prototype, "discountedTotalPrice", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        precision: 16,
        scale: 2,
        default: 0.0,
    }),
    tslib_1.__metadata("design:type", Number)
], Design.prototype, "totalPriceLooseItems", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        precision: 16,
        scale: 2,
        default: 0.0,
    }),
    tslib_1.__metadata("design:type", Number)
], Design.prototype, "discountedTotalPriceLooseItems", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        precision: 16,
        scale: 2,
        default: 0.0,
    }),
    tslib_1.__metadata("design:type", Number)
], Design.prototype, "totalPriceOtherItems", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        dataType: 'FLOAT',
        precision: 16,
        scale: 2,
        default: 0.0,
    }),
    tslib_1.__metadata("design:type", Number)
], Design.prototype, "discountedTotalPriceOtherItems", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'Boolean',
        default: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], Design.prototype, "isIncludedWorktopOutstationCharge", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'Boolean',
        default: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], Design.prototype, "isIncludedInstallationCharge", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'Boolean',
        default: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], Design.prototype, "isIncludedInstallerOutstationCharge", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'Boolean',
        default: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], Design.prototype, "isIncludedTransportationCharge", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'Boolean',
        default: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], Design.prototype, "isToSummary", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'Boolean',
        default: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], Design.prototype, "isProcessedERPProduction", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'Boolean',
        default: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], Design.prototype, "isProcessedERPAcknowledged", void 0);
tslib_1.__decorate([
    repository_1.belongsTo(() => lead_model_1.Lead, { name: 'lead' }),
    tslib_1.__metadata("design:type", String)
], Design.prototype, "leadId", void 0);
tslib_1.__decorate([
    repository_1.hasOne(() => order_info_model_1.OrderInfo),
    tslib_1.__metadata("design:type", order_info_model_1.OrderInfo)
], Design.prototype, "orderInfo", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => brand_goods_model_1.BrandGoods),
    tslib_1.__metadata("design:type", Array)
], Design.prototype, "brandGoods", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => quotation_details_model_1.QuotationDetails, { keyTo: 'designId' }),
    tslib_1.__metadata("design:type", Array)
], Design.prototype, "quotationDetails", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => trading_item_model_1.TradingItem, { through: { model: () => design_additional_item_model_1.DesignAdditionalItem, keyFrom: 'designId', keyTo: 'tradingItemId' } }),
    tslib_1.__metadata("design:type", Array)
], Design.prototype, "tradingItems", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => loose_item_model_1.LooseItem, { through: { model: () => design_additional_loose_item_model_1.DesignAdditionalLooseItem, keyFrom: 'designId', keyTo: 'looseItemId' } }),
    tslib_1.__metadata("design:type", Array)
], Design.prototype, "looseItems", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => design_other_item_model_1.DesignOtherItem, { keyTo: 'designId' }),
    tslib_1.__metadata("design:type", Array)
], Design.prototype, "designOtherItems", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => design_additional_item_model_1.DesignAdditionalItem, { keyTo: 'designId' }),
    tslib_1.__metadata("design:type", Array)
], Design.prototype, "designAdditionalItems", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => design_additional_loose_item_model_1.DesignAdditionalLooseItem, { keyTo: 'designId' }),
    tslib_1.__metadata("design:type", Array)
], Design.prototype, "designAdditionalLooseItems", void 0);
tslib_1.__decorate([
    repository_1.belongsTo(() => final_confirmation_order_model_1.FinalConfirmationOrder, { name: 'finalConfirmationOrder' }),
    tslib_1.__metadata("design:type", String)
], Design.prototype, "finalConfirmationOrderId", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => Design_1, { keyTo: 'designId' }),
    tslib_1.__metadata("design:type", Array)
], Design.prototype, "designs", void 0);
tslib_1.__decorate([
    repository_1.hasOne(() => design_create_cron_job_model_1.DesignCreateCronJob),
    tslib_1.__metadata("design:type", design_create_cron_job_model_1.DesignCreateCronJob)
], Design.prototype, "designCreateCronJob", void 0);
Design = Design_1 = tslib_1.__decorate([
    repository_1.model({ settings: { strict: true } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Design);
exports.Design = Design;
//# sourceMappingURL=design.model.js.map