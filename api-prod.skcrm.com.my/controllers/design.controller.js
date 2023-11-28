"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const calculate_detailed_quotation_schema_1 = require("../schema/calculate-detailed-quotation.schema");
let DesignController = class DesignController {
    constructor(designRepository, tradingItemRepository, looseItemRepository, designAdditionalItemRepository, designAdditionalLooseItemRepository, designOtherItemRepository) {
        this.designRepository = designRepository;
        this.tradingItemRepository = tradingItemRepository;
        this.looseItemRepository = looseItemRepository;
        this.designAdditionalItemRepository = designAdditionalItemRepository;
        this.designAdditionalLooseItemRepository = designAdditionalLooseItemRepository;
        this.designOtherItemRepository = designOtherItemRepository;
    }
    async create(design) {
        return this.designRepository.create(design);
    }
    async calculateDetailedQuotation(data, id) {
        // console.log(`CalculateDetailedQuotation Data: ${JSON.stringify(data)}`);
        var _a;
        const design = await this.designRepository.findById(id, { include: [{ relation: 'tradingItems' }, { relation: 'looseItems' }, { relation: 'designOtherItems' }] });
        if (!design)
            throw new rest_1.HttpErrors[404](`Design with id ${id} not found.`);
        const { tradingItems, looseItems, masterItemDiscount, basketItemDiscount, otherItems } = data;
        // Calculate basket item pricing for quotation details (total price, discounted total price for basket items)
        let totalPriceBasketItems = 0;
        let discountedTotalPriceBasketItems = 0;
        let basketItemPrice = 0;
        const basketItemFilter = {
            where: {
                subcategory: { eq: 'Basket' }
            }
        };
        const quotationDetails = await this.designRepository.quotationDetails(id).find(basketItemFilter);
        for (const quotationDetail of quotationDetails) {
            basketItemPrice = (_a = quotationDetail.recommendedRetailPrice) !== null && _a !== void 0 ? _a : 0;
            totalPriceBasketItems += basketItemPrice;
            discountedTotalPriceBasketItems += basketItemPrice - (basketItemPrice * basketItemDiscount / 100);
        }
        let totalPriceTradingItems = 0;
        let discountedTotalPriceTradingItems = 0;
        for (const tradingItem of tradingItems) {
            const additionalItem = await this.designAdditionalItemRepository.findOne({
                where: {
                    designId: design.uuid,
                    tradingItemId: tradingItem.uuid
                }
            });
            if (additionalItem) {
                additionalItem.quantity = tradingItem.quantity;
                additionalItem.discount = tradingItem.discount;
                await this.designAdditionalItemRepository.update(additionalItem);
            }
            else {
                await this.designAdditionalItemRepository.create({
                    designId: design.uuid,
                    tradingItemId: tradingItem.uuid,
                    quantity: tradingItem.quantity,
                    discount: tradingItem.discount
                });
            }
            const { stdcost, markuprate, nonstdrate } = await this.tradingItemRepository.findById(tradingItem.uuid);
            // const itemPrice = stdcost! * parseFloat(markuprate!) * (1 - tradingItem.discount) * tradingItem.quantity
            const itemPrice = stdcost * markuprate * (nonstdrate !== null && nonstdrate !== void 0 ? nonstdrate : 1) * tradingItem.quantity;
            const discountedItemPrice = Math.ceil(itemPrice * (1 - tradingItem.discount));
            totalPriceTradingItems += itemPrice;
            discountedTotalPriceTradingItems += discountedItemPrice;
        }
        // Delete designAdditionalItem if its tradingId does not exist in param tradingItems.uuid
        const additionalItems = await this.designRepository.designAdditionalItems(design.uuid).find();
        const tradingItemUuids = tradingItems.map(item => item.uuid);
        for (const { uuid, tradingItemId } of additionalItems) {
            if (!tradingItemUuids.includes(tradingItemId)) {
                await this.designAdditionalItemRepository.deleteById(uuid);
            }
        }
        /* Operations on Loose Items
            Overall Idea:
            - Find Loose Item
            - Add to Design Additional Item Repository
        */
        let totalPriceLooseItems = 0;
        let discountedTotalPriceLooseItems = 0;
        for (const looseItem of looseItems) {
            const additionalItem = await this.designAdditionalLooseItemRepository.findOne({
                where: {
                    designId: design.uuid,
                    looseItemId: looseItem.uuid
                }
            });
            if (additionalItem) {
                additionalItem.quantity = looseItem.quantity;
                additionalItem.discount = looseItem.discount;
                await this.designAdditionalLooseItemRepository.update(additionalItem);
            }
            else {
                await this.designAdditionalLooseItemRepository.create({
                    designId: design.uuid,
                    looseItemId: looseItem.uuid,
                    quantity: looseItem.quantity,
                    discount: looseItem.discount
                });
            }
            const { stdcost, markuprate, nonstdrate } = await this.looseItemRepository.findById(looseItem.uuid);
            const itemPrice = Math.ceil(stdcost * markuprate * (nonstdrate !== null && nonstdrate !== void 0 ? nonstdrate : 1) * looseItem.quantity);
            const discountedItemPrice = Math.ceil(itemPrice * (1 - looseItem.discount));
            totalPriceLooseItems += itemPrice;
            discountedTotalPriceLooseItems += discountedItemPrice;
        }
        // Delete designAdditionalLooseItem if its looseItemId does not exist in param looseItems.uuid
        const additionalLooseItems = await this.designRepository.designAdditionalLooseItems(design.uuid).find();
        const looseItemUuids = looseItems.map(item => item.uuid);
        for (const { uuid, looseItemId } of additionalLooseItems) {
            if (!looseItemUuids.includes(looseItemId)) {
                await this.designAdditionalLooseItemRepository.deleteById(uuid);
            }
        }
        // Operations on Other Items
        // Idea - if not existing, UUID is null, else existing ones have legitimate UUID value
        /*
        IF DELETED ITEM:
          DELETE FROM DATABASE
        IF EXISTING OTHER ITEM:
          UPDATE DETAILS IN OTHER ITEM REPOSITORY
        ELSE IF NEW OTHER ITEM:
          CREATE NEW OTHER ITEM
        ACCUMULATE TO TOTAL PRICING
        */
        // Deleting other items
        // Delete designOtherItem if its uuid does not exist in param otherItems.uuid
        const designOtherItems = await this.designRepository.designOtherItems(design.uuid).find();
        // Delete deleted otherItems from frontend, in the database
        const filteredFormOtherItemsUuids = otherItems.filter(e => e.uuid !== '');
        const formOtherItemsUuids = filteredFormOtherItemsUuids.map(item => {
            return item.uuid;
        }); // The UUIDs of the Other Items from the forms
        // console.log(`formOtherItemsUuids: ${JSON.stringify(formOtherItemsUuids)}\n\n`);
        for (const { uuid } of designOtherItems) {
            // console.log(`otherItems uuid: ${uuid}`);
            if (!formOtherItemsUuids.includes(uuid)) {
                await this.designOtherItemRepository.deleteById(uuid);
            }
        }
        // Update existing or adding other items
        let otherItemPrice = 0;
        let totalPriceOtherItems = 0;
        let discountedTotalPriceOtherItems = 0;
        for (const otherItem of otherItems) {
            if (otherItem.uuid !== '') {
                // Checking if this item already exists in database, update details
                // Check if item already exists in database
                const existingOtherItem = await this.designOtherItemRepository.findOne({
                    where: {
                        designId: design.uuid,
                        uuid: otherItem.uuid
                    }
                });
                // Update details
                if (existingOtherItem) {
                    console.log(`Inside existing other item\n\n`);
                    existingOtherItem.quantity = otherItem.quantity;
                    existingOtherItem.UOM = otherItem.UOM;
                    existingOtherItem.name = otherItem.name;
                    existingOtherItem.description = otherItem.description;
                    existingOtherItem.unitPrice = otherItem.unitPrice;
                    existingOtherItem.discount = otherItem.discount;
                    existingOtherItem.discountedPrice = otherItem.discountedPrice;
                    await this.designOtherItemRepository.update(existingOtherItem);
                }
            }
            else {
                // If this item does not already exists in database, create new item
                const createdOtherItem = await this.designOtherItemRepository.create({
                    designId: design.uuid,
                    quantity: otherItem.quantity,
                    UOM: otherItem.UOM,
                    name: otherItem.name,
                    description: otherItem.description,
                    unitPrice: otherItem.unitPrice,
                    discount: otherItem.discount,
                    discountedPrice: otherItem.discountedPrice
                });
                console.log(`createdOtherItem: ${JSON.stringify(createdOtherItem)}`);
            }
            otherItemPrice = otherItem.quantity * otherItem.unitPrice;
            totalPriceOtherItems += otherItemPrice;
            discountedTotalPriceOtherItems += otherItem.discountedPrice;
        }
        // Include the original values for total price drawing items and overall total price, as well as discounted values
        // After a bit of pondering, I have decided to add the fields `discountedTotalPrice` and `discountedTotalPriceDrawingItems`
        // Here, calculate: `totalPrice`, `discountedTotalPrice`, `discountedTotalPriceDrawingItems`
        const totalPrice = design.totalPriceDrawingItems + basketItemPrice + totalPriceTradingItems + totalPriceLooseItems + totalPriceOtherItems;
        const discountedTotalPriceDrawingItems = Math.ceil(design.totalPriceDrawingItems * (100 - masterItemDiscount) / 100);
        const discountedTotalPrice = discountedTotalPriceDrawingItems + discountedTotalPriceBasketItems + discountedTotalPriceTradingItems + discountedTotalPriceLooseItems + discountedTotalPriceOtherItems;
        // console.log("BASKET PRICE", discountedTotalPriceBasketItems);
        // console.log(totalPrice, discountedTotalPriceDrawingItems, discountedTotalPrice);
        await this.designRepository.updateById(design.uuid, {
            totalPriceTradingItems: totalPriceTradingItems,
            discountedTotalPriceTradingItems: discountedTotalPriceTradingItems,
            masterItemDiscount: masterItemDiscount,
            basketItemDiscount: basketItemDiscount,
            totalPrice: totalPrice,
            discountedTotalPrice: discountedTotalPrice,
            totalPriceDrawingItems: design.totalPriceDrawingItems,
            discountedTotalPriceDrawingItems: discountedTotalPriceDrawingItems,
            totalPriceBasketItems: totalPriceBasketItems,
            discountedTotalPriceBasketItems: discountedTotalPriceBasketItems,
            totalPriceOtherItems: totalPriceOtherItems,
            discountedTotalPriceOtherItems: discountedTotalPriceOtherItems,
            totalPriceLooseItems: totalPriceLooseItems,
            discountedTotalPriceLooseItems: discountedTotalPriceLooseItems
        });
        // console.log(`totalPriceOtherItems: ${totalPriceOtherItems}`);
        // console.log(`discountedTotalPriceOtherItems: ${discountedTotalPriceOtherItems}`);
        // console.log(`discountedTotalPrice: ${discountedTotalPrice}`);
        const result = await this.designRepository.findById(id, { include: [{ relation: 'tradingItems' }, { relation: 'looseItems' }, { relation: 'quotationDetails' }, { relation: 'designOtherItems' }] });
        // console.log(`result: ${JSON.stringify(result)}`);
        return result;
    }
    async count(where) {
        return this.designRepository.count(where);
    }
    async find(filter) {
        const designs = await this.designRepository.find(filter); // , { include: [{ relation: 'tradingItems' }, { relation: 'looseItems' }, { relation: 'quotationDetails' }, { relation: 'designOtherItems' }]}
        return designs;
    }
    async updateAll(design, where) {
        return this.designRepository.updateAll(design, where);
    }
    async findById(id, filter) {
        const design = await this.designRepository.findById(id, filter);
        return design;
    }
    async updateById(id, design) {
        const RATE_PER_KM = 2.5;
        const { transportationDistance, installerOutstationDistance } = design;
        if (transportationDistance !== null) {
            if (transportationDistance !== 0) {
                // Formula: ((Distance X Transportation rate per km) + 100) / 0.85
                design.transportationCharge = Math.ceil((transportationDistance * RATE_PER_KM + 100)
                    / 0.85);
                design.transportationCharge = parseFloat(design.transportationCharge.toFixed(2));
            }
            else {
                design.transportationCharge = 0.00;
            }
        }
        if (installerOutstationDistance !== null) {
            const foundDesign = await this.designRepository.findById(id);
            if (!foundDesign)
                throw new rest_1.HttpErrors[404]('Quotation not found');
            const { totalInstallationCharges } = foundDesign;
            if (installerOutstationDistance !== 0) {
                // Formula: ((Distance * 0.8) + (Installation Charges * 0.25)) / 0.85
                design.installerOutstationCharge = Math.ceil(((installerOutstationDistance * 0.8) + (totalInstallationCharges * 0.25))
                    / 0.85);
                design.installerOutstationCharge = parseFloat(design.installerOutstationCharge.toFixed(2));
            }
            else {
                design.installerOutstationCharge = 0.00;
            }
        }
        await this.designRepository.updateById(id, design);
    }
    async replaceById(id, design) {
        await this.designRepository.replaceById(id, design);
    }
    async deleteById(id) {
        await this.designRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/designs', {
        responses: {
            '200': {
                description: 'Design model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Design) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Design, {
                    title: 'NewDesign',
                    exclude: ['uuid'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.post('/designs/{id}/calculate-detailed-quotation', {
        responses: {
            '200': {
                description: ''
            }
        }
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: calculate_detailed_quotation_schema_1.CalculateDetailedQuotationSchema
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignController.prototype, "calculateDetailedQuotation", null);
tslib_1.__decorate([
    rest_1.get('/designs/count', {
        responses: {
            '200': {
                description: 'Design model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Design)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/designs', {
        responses: {
            '200': {
                description: 'Array of Design model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.Design, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Design)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/designs', {
        responses: {
            '200': {
                description: 'Design PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Design, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Design)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Design, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/designs/{id}', {
        responses: {
            '200': {
                description: 'Design model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Design, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Design, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/designs/{id}', {
        responses: {
            '204': {
                description: 'Design PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Design, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Design]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/designs/{id}', {
        responses: {
            '204': {
                description: 'Design PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Design]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/designs/{id}', {
        responses: {
            '204': {
                description: 'Design DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignController.prototype, "deleteById", null);
DesignController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.DesignRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.TradingItemRepository)),
    tslib_1.__param(2, repository_1.repository(repositories_1.LooseItemRepository)),
    tslib_1.__param(3, repository_1.repository(repositories_1.DesignAdditionalItemRepository)),
    tslib_1.__param(4, repository_1.repository(repositories_1.DesignAdditionalLooseItemRepository)),
    tslib_1.__param(5, repository_1.repository(repositories_1.DesignOtherItemRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.DesignRepository,
        repositories_1.TradingItemRepository,
        repositories_1.LooseItemRepository,
        repositories_1.DesignAdditionalItemRepository,
        repositories_1.DesignAdditionalLooseItemRepository,
        repositories_1.DesignOtherItemRepository])
], DesignController);
exports.DesignController = DesignController;
//# sourceMappingURL=design.controller.js.map