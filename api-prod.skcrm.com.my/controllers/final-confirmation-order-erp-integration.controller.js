"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinalConfirmationOrderErpIntegrationController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const order_state_enum_1 = require("../types/order-state.enum");
let FinalConfirmationOrderErpIntegrationController = class FinalConfirmationOrderErpIntegrationController {
    constructor(designRepository, finalConfirmationOrderRepository, profileRepository, designCreateCronJobRepository) {
        this.designRepository = designRepository;
        this.finalConfirmationOrderRepository = finalConfirmationOrderRepository;
        this.profileRepository = profileRepository;
        this.designCreateCronJobRepository = designCreateCronJobRepository;
    }
    async findOrderConfirmationsNew() {
        const newOrderConfirmations = await this.finalConfirmationOrderRepository.find({
            where: {
                and: [
                    { state: order_state_enum_1.OrderState.OrderConfirmation },
                    { ocErpProcessedNew: false },
                ]
            },
            include: this.getOrderIncludeFilter(),
        });
        // TODO: See shape of return, is it what they need?
        return newOrderConfirmations.map(this.transformOrderShape);
    }
    async updateOrderConfirmationNewProcessed(orderConfirmationIds) {
        const promises = orderConfirmationIds
            .map(uuid => this
            .finalConfirmationOrderRepository
            .updateById(uuid, { ocErpProcessedNew: true }));
        await Promise.all(promises);
    }
    async findOrderConfirmationPassDepositThresholdPercentage() {
        const orderConfirmations = await this
            .finalConfirmationOrderRepository
            .find({
            where: {
                and: [
                    { state: order_state_enum_1.OrderState.OrderConfirmation },
                    { status: order_state_enum_1.OCStatus.Acknowledged },
                    // { ocErpProcessedNew: true },  // The previous developer included this field, not sure if it's needed
                    { ocErpPulledDeposit: false },
                ]
            },
            include: this.getOrderIncludeFilter(),
        });
        // console.log(`orderConfirmations       ${JSON.stringify(orderConfirmations)}`);
        const orderConfirmationsPassDepositThreshold = orderConfirmations.filter(oc => {
            var _a;
            const round = (n) => parseFloat(n.toFixed(2));
            const tradingItems = oc
                .designs
                .map(design => design.designAdditionalItems)
                .flat()
                .filter(item => !!item)
                .map(additionalItem => {
                var _a, _b, _c, _d;
                return {
                    stdcost: (_a = additionalItem.tradingItem) === null || _a === void 0 ? void 0 : _a.stdcost,
                    category: (_b = additionalItem.tradingItem) === null || _b === void 0 ? void 0 : _b.category,
                    name: (_c = additionalItem.tradingItem) === null || _c === void 0 ? void 0 : _c.name,
                    uom: (_d = additionalItem.tradingItem) === null || _d === void 0 ? void 0 : _d.uom,
                    quantity: additionalItem.quantity,
                    discount: additionalItem.discount,
                };
            });
            const tradingItemsTotal = tradingItems.reduce((acc, tradingItem) => acc + tradingItem.stdcost, 0);
            const drawingItemsTotal = oc.designs.reduce((acc, design) => acc + design.totalAmount(), 0);
            const total = drawingItemsTotal + tradingItemsTotal;
            const gst = round(total * 0.08);
            const roundUpDiscount = round((_a = oc.designs[oc.designs.length - 1].lumpsum) !== null && _a !== void 0 ? _a : 0);
            const grandTotal = round(total + gst - roundUpDiscount);
            const paidDepositPercentage = oc.paidAmountDeposit / grandTotal;
            return paidDepositPercentage >= 0.10;
        });
        // console.log(`orderConfirmationsPassDepositThreshold       ${JSON.stringify(orderConfirmationsPassDepositThreshold)}`);
        return orderConfirmationsPassDepositThreshold.map(this.transformOrderConfirmationFormat);
        // return await Promise.all(orderConfirmationsPassDepositThreshold.map(this.transformOrderConfirmationFormat))
    }
    async updateOrderConfirmationPassDepositThresholdPercentageProcessed(orderConfirmationIds) {
        const promises = orderConfirmationIds
            .map(uuid => this
            .finalConfirmationOrderRepository
            .updateById(uuid, { ocErpProcessedDeposit: true }));
        await Promise.all(promises);
    }
    /*
     TODO : NEED TO GET DESIGN ID after done Payslip features
  
     Example:
        if(!isset($_GET['id'])) {
            $_GET['id'] = 0;
        }
        if(!isset($_GET['from_id'])) {
            $_GET['from_id'] = 1;
        }
        if(!isset($_GET['to_id'])) {
            $_GET['to_id'] = 999999999;
        }
  
  
  
        tblproposal_create_so
  
        where
        s.create_type = 'create' and
        s.create_done = 'N'
        if($_GET['id'] != 0){
          $sql .= "and s.proposal_id = '".$_GET['id']."'
        }
  
     */
    async findFinalConfirmationOrdersProduction() {
        const productionFco = await this.finalConfirmationOrderRepository.find({
            // Comment by asyraf because got issue
            // where: {
            //   and: [
            //     { state: OrderState.FinalConfirmationOrder },
            //     { status: FCOStatus.Production },
            //     { fcoErpProcessedProduction: false },
            //   ]
            // },
            // Comment by asyraf because got issue
            include: this.getOrderIncludeFilter(),
        });
        return productionFco
            .filter(fco => !!fco.designs) // For testing, since some fco in server 13 dont have design (a scenario that shouldnt happen)
            .map(this.transformOrderShape);
    }
    async findFinalConfirmationOrderProductionCreate() {
        // TODO: Get all cron for createDone = N (array)
        const cronJob = await this.designCreateCronJobRepository.findOne({
            where: {
                createType: 'create',
                createDone: 'N'
            }
        });
        const productionFco = await this.finalConfirmationOrderRepository.findOne({
            // Comment by asyraf
            // where: {
            //   and: [
            //     { state: OrderState.FinalConfirmationOrder },
            //     // { status: FCOStatus.Production },
            //     { status: FCOStatus.PendingDetailer },
            //     { fcoErpProcessedProduction: false },
            //   ]
            // },
            // Comment by asyraf
            where: {
                uuid: cronJob === null || cronJob === void 0 ? void 0 : cronJob.orderId
            },
            include: this.getOrderIncludeFilter(),
        });
        if (productionFco == null) {
            return {};
        }
        return this.transformOrderShape(productionFco);
    }
    async findFinalConfirmationOrderProductionUpdate() {
        // TODO: Get all cron for createDone = N (array)
        const cronJob = await this.designCreateCronJobRepository.findOne({
            where: {
                createType: 'update',
                createDone: 'N'
            }
        });
        const productionFco = await this.finalConfirmationOrderRepository.findOne({
            // Comment by asyraf
            // where: {
            //   and: [
            //     { state: OrderState.FinalConfirmationOrder },
            //     // { status: FCOStatus.Production },
            //     { status: FCOStatus.PendingDetailer },
            //     { fcoErpProcessedProduction: false },
            //   ]
            // },
            // Comment by asyraf
            where: {
                uuid: cronJob === null || cronJob === void 0 ? void 0 : cronJob.orderId
            },
            include: this.getOrderIncludeFilter(),
        });
        if (productionFco == null) {
            return {};
        }
        return this.transformOrderShape(productionFco);
    }
    async updateFinalConfirmationOrderDesignById(id, isProcessed) {
        var _a;
        // UPDATE DESIGN ISPROCESSED IN FINAL CONFIRMATION ORDER: FOR NEW FIX
        if (id === '' || isProcessed === '') {
            throw new rest_1.HttpErrors[404]('id or isProcessed should not be empty strings');
        }
        isProcessed = isProcessed.toLowerCase();
        if (isProcessed !== 'true' && isProcessed !== 'false') {
            throw new rest_1.HttpErrors[404]('isProcessed should be either \'true\' or \'false\'');
        }
        const processed = true ? isProcessed === 'true' : false;
        const foundDesign = await this.designRepository.findById(id);
        if (!foundDesign)
            throw new rest_1.HttpErrors[404]('Design/Quotation not found');
        if (foundDesign.isProcessedERPProduction === processed) {
            return 'Design already has the same value for the isProcessed property passed in';
        }
        foundDesign.isProcessedERPProduction = processed;
        await this.designRepository.updateById(id, foundDesign);
        const productionFCO = await this.finalConfirmationOrderRepository.findOne({
            where: {
                and: [
                    { state: order_state_enum_1.OrderState.FinalConfirmationOrder },
                    { status: order_state_enum_1.FCOStatus.Production },
                    { status: order_state_enum_1.FCOStatus.PendingDetailer },
                    // { fcoErpProcessedProduction: false },
                    { uuid: foundDesign.finalConfirmationOrderId }
                ]
            },
            include: this.getOrderIncludeFilter(),
        });
        if (productionFCO === null) {
            // return "No Final Confirmation Order with Production status and not processed production found for this design ID";
            return "No Final Confirmation Order with Production status found for this design ID";
        }
        const currentFCO = await this.finalConfirmationOrderRepository.findOne({
            where: {
                and: [
                    { state: order_state_enum_1.OrderState.FinalConfirmationOrder },
                    // { fcoErpProcessedProduction: false },
                    // { status: FCOStatus.Production },
                    { status: order_state_enum_1.FCOStatus.PendingDetailer },
                    { uuid: foundDesign.finalConfirmationOrderId }
                ]
            },
        });
        if (currentFCO === null) {
            // return "No Final Confirmation Order with Production status and not processed production found for this design ID";
            return "No Final Confirmation Order with Production status found for this design ID";
        }
        let num = 0;
        if (processed === true) {
            if (((_a = productionFCO.designs.length) !== null && _a !== void 0 ? _a : 0) !== 0) {
                for (let i = 0; i < productionFCO.designs.length; i++) {
                    if (productionFCO.designs[i].isProcessedERPProduction === !processed) {
                        num++;
                        break;
                    }
                }
            }
        }
        if (!num) { //  || des.length > 0
            currentFCO.fcoErpProcessedProduction = productionFCO.fcoErpProcessedProduction = processed;
            await this.finalConfirmationOrderRepository.updateById(currentFCO.uuid, currentFCO);
        }
        return productionFCO;
    }
    async findFinalConfirmationOrderAcknowledged() {
        // Convert A SINGLE FINAL CONFIRMATION ORDER: FOR NEW FIX
        const productionFco = await this.finalConfirmationOrderRepository.findOne({
            where: {
                and: [
                    { state: order_state_enum_1.OrderState.OrderConfirmation },
                    { status: order_state_enum_1.OCStatus.Acknowledged },
                    { ocErpPulledDeposit: false },
                ]
            },
            include: this.getOrderIncludeFilter(),
        });
        if (productionFco == null) {
            return {};
        }
        return this.transformOrderConfirmationFormat(productionFco);
    }
    async updateOrderConfirmationDesignById(id, isProcessed) {
        var _a;
        // UPDATE DESIGN ISPROCESSED IN FINAL CONFIRMATION ORDER: FOR NEW FIX
        if (id === '' || isProcessed === '') {
            throw new rest_1.HttpErrors[404]('id or isProcessed should not be empty strings');
        }
        isProcessed = isProcessed.toLowerCase();
        if (isProcessed !== 'true' && isProcessed !== 'false') {
            throw new rest_1.HttpErrors[404]('isProcessed should be either \'true\' or \'false\'');
        }
        const processed = isProcessed === 'true' ? true : false;
        const foundDesign = await this.designRepository.findById(id);
        if (!foundDesign)
            throw new rest_1.HttpErrors[404]('Design/Quotation not found');
        if (foundDesign.isProcessedERPAcknowledged === processed) {
            return "Design already has the same value for the isProcessed property passed in";
        }
        foundDesign.isProcessedERPAcknowledged = processed;
        await this.designRepository.updateById(id, foundDesign);
        const orderConfirmation = await this
            .finalConfirmationOrderRepository
            .findOne({
            where: {
                and: [
                    { state: order_state_enum_1.OrderState.OrderConfirmation },
                    { status: order_state_enum_1.OCStatus.Acknowledged },
                    // { ocErpPulledDeposit: false },
                    { uuid: foundDesign.finalConfirmationOrderId }
                ]
            },
            include: this.getOrderIncludeFilter(),
        });
        if (orderConfirmation === null) {
            return "No Order Confirmation with Acknowledged status found for this design ID";
        }
        const currentOC = await this
            .finalConfirmationOrderRepository
            .findOne({
            where: {
                and: [
                    { state: order_state_enum_1.OrderState.OrderConfirmation },
                    { status: order_state_enum_1.OCStatus.Acknowledged },
                    // { ocErpPulledDeposit: false },
                    { uuid: foundDesign.finalConfirmationOrderId }
                ]
            },
        });
        if (currentOC === null) {
            return "No Order Confirmation with Acknowledged status found for this design ID";
        }
        let num = 0;
        if (processed === true) {
            if (((_a = orderConfirmation.designs.length) !== null && _a !== void 0 ? _a : 0) !== 0) {
                for (let i = 0; i < orderConfirmation.designs.length; i++) {
                    if (orderConfirmation.designs[i].isProcessedERPAcknowledged === !processed) {
                        num++;
                        break;
                    }
                }
            }
        }
        if (!num) { //  || des.length > 0
            currentOC.ocErpPulledDeposit = orderConfirmation.ocErpPulledDeposit = processed;
            await this.finalConfirmationOrderRepository.updateById(currentOC.uuid, currentOC);
        }
        return orderConfirmation;
    }
    async updateFinalConfirmationOrderProductionProcessed(finalConfirmationOrderIds) {
        const promises = finalConfirmationOrderIds
            .map(uuid => this
            .finalConfirmationOrderRepository
            .updateById(uuid, { fcoErpProcessedProduction: true }));
        await Promise.all(promises);
    }
    getOrderIncludeFilter() {
        return [
            {
                // Comment by asyraf
                // relation: 'designs',
                // scope: {
                //   include: [
                //     {relation: 'quotationDetails'},
                //     {relation: 'designAdditionalItems', scope: {include: [{relation: 'tradingItem'}]}},
                //     // {relation: 'designAdditionalLooseItems', scope: {include: [{relation: 'looseItems'}]}},
                //     {relation: 'designOtherItems'}
                //   ]
                // }
                // Comment by asyraf
                relation: 'designs',
                scope: {
                    include: [
                        { relation: 'quotationDetails' },
                        { relation: 'designAdditionalItems' },
                        { relation: 'tradingItems' },
                        { relation: 'looseItems' },
                        { relation: 'designOtherItems' },
                        { relation: 'designAdditionalLooseItems', scope: { include: [{ relation: 'looseItem' }] } },
                        { relation: 'designAdditionalItems', scope: { include: [{ relation: 'tradingItem' }] } },
                    ]
                }
            },
            {
                relation: 'lead',
                scope: {
                    include: [{ relation: 'branch' }, { relation: 'user' }]
                }
            }
        ];
    }
    async transformOrderConfirmationFormat(order) {
        // Convert A SINGLE FINAL CONFIRMATION ORDER: FOR NEW FIX
        // const round = (n: number) => parseFloat(n.toFixed(2))
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (order.designs == null) {
            order.designs = [];
        }
        const tradingItems = order
            .designs
            .map(design => design.designAdditionalItems)
            .flat()
            .filter(item => !!item)
            .map(additionalItem => {
            var _a, _b, _c, _d;
            return {
                stdcost: (_a = additionalItem.tradingItem) === null || _a === void 0 ? void 0 : _a.stdcost,
                category: (_b = additionalItem.tradingItem) === null || _b === void 0 ? void 0 : _b.category,
                name: (_c = additionalItem.tradingItem) === null || _c === void 0 ? void 0 : _c.name,
                uom: (_d = additionalItem.tradingItem) === null || _d === void 0 ? void 0 : _d.uom,
                quantity: additionalItem.quantity,
                discount: additionalItem.discount,
            };
        });
        const tradingItemsTotal = tradingItems.reduce((acc, tradingItem) => acc + tradingItem.stdcost, 0);
        const drawingItemsTotal = order.designs.reduce((acc, design) => acc + design.totalAmount(), 0);
        const total = (drawingItemsTotal + tradingItemsTotal);
        const gst = (total * 0.08);
        const roundUpDiscount = (order.designs.length ? (_a = order.designs[order.designs.length - 1].lumpsum) !== null && _a !== void 0 ? _a : 0 : 0);
        const grandTotal = (total + gst - roundUpDiscount);
        // const total = round(drawingItemsTotal + tradingItemsTotal)
        // const gst = round(total * 0.08)
        // const roundUpDiscount = round(order.designs.length ? order.designs[order.designs.length - 1].lumpsum ?? 0 : 0)
        // const grandTotal = round(total + gst - roundUpDiscount)
        const roundDown = Math.floor(grandTotal);
        const lead = order.lead;
        const user = lead.user;
        const profile = await this.profileRepository.findOne({
            where: {
                userId: user.uuid
            }
        });
        let drawingItemIdx = 0;
        const drawingItems = order.state === order_state_enum_1.OrderState.FinalConfirmationOrder ?
            order.designs.filter(design => !design.isProcessedERPProduction)
                .map(design => {
                var _a;
                return {
                    designReferenceName: design.referenceName,
                    jobNumber: (design.referenceName.includes('Kitchen') || design.referenceName.includes('Pantry')) ? ('K' + String(order.jobId) + design.jobPart) : ('W' + String(order.jobId) + design.jobPart),
                    designId: design.uuid,
                    items: design.quotationDetails.sort((a, b) => {
                        // sort by id (loopback cant order by in include filter)
                        if (a.id > b.id)
                            return 1;
                        if (a.id < b.id)
                            return -1;
                        return 0;
                    }),
                    additionalItems: design.designAdditionalItems === undefined ? [] : design.designAdditionalItems
                        .filter(item => !!item)
                        .filter(item => item.designId === design.uuid)
                        .map(item => item)
                        .map(additionalItem => {
                        var _a, _b, _c, _d;
                        return {
                            stdcost: (_a = additionalItem.tradingItem) === null || _a === void 0 ? void 0 : _a.stdcost,
                            category: (_b = additionalItem.tradingItem) === null || _b === void 0 ? void 0 : _b.category,
                            name: (_c = additionalItem.tradingItem) === null || _c === void 0 ? void 0 : _c.name,
                            uom: (_d = additionalItem.tradingItem) === null || _d === void 0 ? void 0 : _d.uom,
                            quantity: additionalItem.quantity,
                            discount: additionalItem.discount,
                        };
                    }),
                    isProcessedERPProduction: design.isProcessedERPProduction,
                    installationCharges: design.totalInstallationCharges,
                    transportationCharges: design.transportationCharge,
                    worktopOutstationCharges: design.installerOutstationCharge,
                    roundUpDiscount: (_a = design.lumpsum) !== null && _a !== void 0 ? _a : 0,
                    total: design.totalAmount(),
                    gst: (design.totalAmount() * 0.08)
                };
            })[0]
            : order.designs.map((design) => {
                if (!design.quotationDetails)
                    return;
                drawingItemIdx += 1;
                return {
                    number: drawingItemIdx,
                    designId: design.uuid,
                    drawingNumber: design.drawingNumber,
                    jobNumber: String(order.jobId) + " " + design.jobPart,
                    item: design.referenceName,
                    description: design.materials,
                    quantity: design.quotationDetails[0].quantity,
                    uom: 'Set',
                    unitPrice: (design.totalPriceDrawingItems),
                    discount: 0,
                    amount: (design.totalPriceDrawingItems),
                    isProcessedERPAcknowledged: design.isProcessedERPAcknowledged
                };
            }).filter(design => design !== null);
        // TO DO OR QUESTION: I DUN UNDERSTAND ABOUT THIS PART - WHAT IS THE ELSE CONDITION IN THE TERNARY IF ELSE CONDITION
        return {
            uuid: order.uuid,
            date: (_b = order.createdAt) === null || _b === void 0 ? void 0 : _b.toDateString(),
            quotationNumber: order.quotationNumber,
            customer: {
                uuid: lead.uuid,
                name: lead.name,
                phone: lead.phone,
                email: lead.email,
                address1: lead.address1,
                address2: lead.address2,
                postcode: lead.postcode,
                city: lead.city,
                state: lead.locationState,
                country: lead.country,
                type: lead.type,
                exhibition: lead.exhibition != null ? (_c = lead.exhibition) === null || _c === void 0 ? void 0 : _c.name : '',
            },
            salesConsultant: {
                name: (_d = lead.user) === null || _d === void 0 ? void 0 : _d.name,
                phone: (_e = lead.user) === null || _e === void 0 ? void 0 : _e.mobile,
                userCode: profile === null || profile === void 0 ? void 0 : profile.sccode
            },
            branch: (_f = lead.branch) === null || _f === void 0 ? void 0 : _f.name,
            branchCode: (_g = lead.branch) === null || _g === void 0 ? void 0 : _g.code,
            branchType: (_h = lead.branch) === null || _h === void 0 ? void 0 : _h.type,
            fcoErpProcessedProduction: order.fcoErpProcessedProduction,
            ocErpPulledDeposit: order.ocErpPulledDeposit,
            design: drawingItems !== null && drawingItems !== void 0 ? drawingItems : [],
            additionalItems: tradingItems.map(item => {
                return {
                    item: item.category,
                    description: item.name,
                    quantity: item.quantity,
                    uom: item.uom,
                    unitPrice: (item.stdcost),
                    discount: item.discount * 100,
                    amount: (item.stdcost * item.quantity * (1 - item.discount))
                };
            }),
            installationCharges: order.designs.every(design => design.isIncludedInstallationCharge) ?
                order.designs.reduce((acc, design) => acc + design.totalInstallationCharges, 0)
                : undefined,
            transportationCharges: order.designs.every(design => design.isIncludedTransportationCharge) ?
                order.designs.reduce((acc, design) => acc + design.transportationCharge, 0)
                : undefined,
            worktopOutstationCharges: order.designs.every(design => design.isIncludedWorktopOutstationCharge) ?
                order.designs.reduce((acc, design) => acc + design.installerOutstationCharge, 0)
                : undefined,
            total: total,
            roundUpDiscount: roundUpDiscount,
            gst: gst,
            nettTotal: grandTotal,
            roundDown: roundDown,
            downPayment: order.paidAmountDeposit,
            balancePayment: roundDown - order.paidAmountDeposit,
        };
    }
    async transformOrderShape(order) {
        var _a, _b, _c, _d, _e, _f;
        const round = (n) => parseFloat(n.toFixed(2));
        if (order.designs == null) {
            order.designs = [];
        }
        const lead = order.lead;
        const user = lead.user;
        const profile = await this.profileRepository.findOne({
            where: {
                userId: user.uuid
            }
        });
        const Design = order
            .designs
            .map(design => {
            return {
                designId: design.uuid,
                jobPart: design.jobPart,
                drawingNumber: design.drawingNumber,
                quotationNumber: design.quotationNumber,
                jobNumber: (design.referenceName.includes('Kitchen') || design.referenceName.includes('Pantry')) ? ('K' + String(order.jobId) + design.jobPart) : ('W' + String(order.jobId) + design.jobPart),
                createdAt: design.createdAt,
                /* Exact Price */
                totalPrice: design.totalPrice,
                totalPriceDrawingItems: design.totalPriceDrawingItems,
                totalPriceTradingItems: design.totalPriceTradingItems,
                totalPriceLooseItems: design.totalPriceLooseItems,
                totalPriceOtherItems: design.totalPriceOtherItems,
                totalPriceBasketItems: design.totalPriceBasketItems,
                roundUpDiscount: design.lumpsum,
                isIncludedInstallationCharge: design.isIncludedInstallationCharge,
                installationCharges: design.isIncludedInstallationCharge === true ? design.totalInstallationCharges : 0,
                isIncludedInstallerOutstationCharge: design.isIncludedInstallerOutstationCharge,
                installerOutstationDistance: design.installerOutstationDistance,
                installerOutstationCharges: design.isIncludedInstallerOutstationCharge === true ? design.installerOutstationCharge : 0,
                isIncludedTransportationCharge: design.isIncludedTransportationCharge,
                transportationDistance: design.transportationDistance,
                transportationCharges: design.isIncludedTransportationCharge === true ? design.transportationCharge : 0,
                /* Exact Price */
                /* Dealer Price */
                totalPriceDealer: design.totalPrice,
                totalPriceDrawingItemsDealer: design.totalPriceDrawingItems,
                totalPriceTradingItemsDealer: design.totalPriceTradingItems,
                totalPriceLooseItemsDealer: design.totalPriceLooseItems,
                totalPriceOtherItemsDealer: design.totalPriceOtherItems,
                totalPriceBasketItemsDealer: design.totalPriceBasketItems,
                roundUpDiscountDealer: design.lumpsum,
                isIncludedInstallationChargeDealer: design.isIncludedInstallationCharge,
                installationChargesDealer: design.isIncludedInstallationCharge === true ? design.totalInstallationCharges : 0,
                isIncludedInstallerOutstationChargeDealer: design.isIncludedInstallerOutstationCharge,
                installerOutstationDistanceDealer: design.installerOutstationDistance,
                installerOutstationChargesDealer: design.isIncludedInstallerOutstationCharge === true ? design.installerOutstationCharge : 0,
                isIncludedTransportationChargeDealer: design.isIncludedTransportationCharge,
                transportationDistanceDealer: design.transportationDistance,
                transportationChargesDealer: design.isIncludedTransportationCharge === true ? design.transportationCharge : 0,
                // otherItem: design.totalPriceOtherItems,
                // otherItemDiscounted: design.discountedTotalPriceOtherItems,
                // otherItemDealer: design.totalPriceOtherItems,
                /* Dealer Price */
                /* Discounted Price */
                discountedTotalPriceDrawingItems: design.discountedTotalPriceDrawingItems,
                discountedTotalPriceTradingItems: design.discountedTotalPriceTradingItems,
                discountedTotalPriceLooseItems: design.discountedTotalPriceLooseItems,
                discountedTotalPriceOtherItems: design.discountedTotalPriceOtherItems,
                discountedTotalPriceBasketItems: design.discountedTotalPriceBasketItems,
                discountedTotalPrice: design.discountedTotalPrice,
                discountedTotalAmount: design.discountedTotalAmount,
                /* Discounted Price */
                totaldrawing: Object.keys(order.designs).length,
                // After
                worktopLabourCharges: '0',
                worktopOutstationCharges: '0',
                worktopLabourChargesDealer: '0',
                worktopOutstationChargesDealer: '0',
            };
        });
        const quotationDetails = order
            .designs.map(design => design.quotationDetails)
            .flat()
            .filter(quotationDetailsItem => !!quotationDetailsItem)
            .map(quotationDetail => {
            return {
                quotationId: quotationDetail.uuid,
                designId: quotationDetail.designId,
                productCategory: quotationDetail.category,
                productSubCategory: quotationDetail.subcategory,
                productName: quotationDetail.name,
                productNumber: quotationDetail.productNumber,
                retailPrice: quotationDetail.recommendedRetailPrice,
                dealerPrice: quotationDetail.totalDealerPrice,
                // Before
                // type_description: '** TYPE DESCRIPTION (UPDATE) **',                   // UNKNOWN should be text
                // doorfinishing_list: '** DOOR FINISHING LIST (UPDATE) **',              // UNKNOWN should be text
                // uom: 'Unit',                                                           // UNKNOWN should be text (eg: pcs, unit)
                // totaldrawing: 2,                                                       // UNKNOWN should be decimal
                // myitem_discount: 2,                                                    // UNKNOWN should be decimal
                // After
                type_description: quotationDetail.category ? quotationDetail.category : '',
                doorfinishing_list: quotationDetail.brandGoodName + ' ' + quotationDetail.productNumber,
                item_quantity: quotationDetail.quantity,
                uom: 'Unit',
                totaldrawing: 1,
                myitem_discount: 1,
                totalamount: Math.ceil(quotationDetail.recommendedRetailPrice || 0),
                totalamountdealer: Math.ceil(quotationDetail.totalDealerPrice || 0),
            };
        });
        const tradingItems = order
            .designs.map(design => design.designAdditionalItems)
            .flat()
            .filter(item => !!item)
            .map(additionalItem => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
            return {
                designId: additionalItem.designId,
                tradingItemId: additionalItem.tradingItemId,
                stdcost: (_a = additionalItem.tradingItem) === null || _a === void 0 ? void 0 : _a.stdcost,
                category: (_b = additionalItem.tradingItem) === null || _b === void 0 ? void 0 : _b.category,
                name: (_c = additionalItem.tradingItem) === null || _c === void 0 ? void 0 : _c.name,
                part: (_d = additionalItem.tradingItem) === null || _d === void 0 ? void 0 : _d.part,
                // drawingNumber: '20200904365849',
                type_description: ((_e = additionalItem.tradingItem) === null || _e === void 0 ? void 0 : _e.category) ? (_f = additionalItem.tradingItem) === null || _f === void 0 ? void 0 : _f.category : '',
                doorfinishing_list: ((_g = additionalItem.tradingItem) === null || _g === void 0 ? void 0 : _g.name) + ' ' + ((_h = additionalItem.tradingItem) === null || _h === void 0 ? void 0 : _h.itemcode),
                uom: ((_j = additionalItem.tradingItem) === null || _j === void 0 ? void 0 : _j.uom) ? (_k = additionalItem.tradingItem) === null || _k === void 0 ? void 0 : _k.uom : '',
                item_quantity: additionalItem.quantity,
                discount: additionalItem.discount,
                totaldrawing: 1,
                myitem_discount: 1,
                totalamount: Math.ceil(((_l = additionalItem.tradingItem) === null || _l === void 0 ? void 0 : _l.stdcost) * ((_m = additionalItem.tradingItem) === null || _m === void 0 ? void 0 : _m.markuprate) * additionalItem.quantity),
                totalamountdealer: Math.ceil(Math.ceil(((_o = additionalItem.tradingItem) === null || _o === void 0 ? void 0 : _o.stdcost) * ((_p = additionalItem.tradingItem) === null || _p === void 0 ? void 0 : _p.markuprate) * additionalItem.quantity) * ((_q = additionalItem.tradingItem) === null || _q === void 0 ? void 0 : _q.dealerprice)),
            };
        });
        const looseItems = order
            .designs.map(design => design.designAdditionalLooseItems)
            .flat()
            .filter(item => !!item)
            .map(additionalItem => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
            return {
                additionalItem: additionalItem.designId,
                looseItemId: additionalItem.looseItemId,
                stdcost: (_a = additionalItem.looseItem) === null || _a === void 0 ? void 0 : _a.stdcost,
                category: (_b = additionalItem.looseItem) === null || _b === void 0 ? void 0 : _b.category,
                name: (_c = additionalItem.looseItem) === null || _c === void 0 ? void 0 : _c.name,
                part: (_d = additionalItem.looseItem) === null || _d === void 0 ? void 0 : _d.part,
                type_description: ((_e = additionalItem.looseItem) === null || _e === void 0 ? void 0 : _e.category) ? (_f = additionalItem.looseItem) === null || _f === void 0 ? void 0 : _f.category : '',
                doorfinishing_list: (((_g = additionalItem.looseItem) === null || _g === void 0 ? void 0 : _g.name) ? (_h = additionalItem.looseItem) === null || _h === void 0 ? void 0 : _h.name : '') + ' ' + (((_j = additionalItem.looseItem) === null || _j === void 0 ? void 0 : _j.itemcode) ? (_k = additionalItem.looseItem) === null || _k === void 0 ? void 0 : _k.itemcode : ''),
                uom: (_l = additionalItem.looseItem) === null || _l === void 0 ? void 0 : _l.puom,
                puom: (_m = additionalItem.looseItem) === null || _m === void 0 ? void 0 : _m.puom,
                suom: (_o = additionalItem.looseItem) === null || _o === void 0 ? void 0 : _o.suom,
                item_quantity: additionalItem.quantity,
                discount: additionalItem.discount,
                totaldrawing: 1,
                myitem_discount: 1,
                totalamount: Math.ceil(((_p = additionalItem.looseItem) === null || _p === void 0 ? void 0 : _p.stdcost) * ((_q = additionalItem.looseItem) === null || _q === void 0 ? void 0 : _q.markuprate) * additionalItem.quantity),
                totalamountdealer: Math.ceil(Math.ceil(((_r = additionalItem.looseItem) === null || _r === void 0 ? void 0 : _r.stdcost) * ((_s = additionalItem.looseItem) === null || _s === void 0 ? void 0 : _s.markuprate) * additionalItem.quantity) * ((_t = additionalItem.looseItem) === null || _t === void 0 ? void 0 : _t.dealerprice)),
            };
        });
        const otherItems = order
            .designs.map(design => design.designOtherItems)
            .flat()
            .filter(item => !!item)
            .map(additionalItem => {
            var _a, _b;
            return {
                designId: additionalItem.designId,
                otherItemId: additionalItem.uuid,
                stdcost: additionalItem.stdcost,
                category: additionalItem.category,
                name: additionalItem.name,
                type_description: 'Other',
                doorfinishing_list: additionalItem.description + ' ' + additionalItem.name,
                uom: ((_a = additionalItem.tradingItem) === null || _a === void 0 ? void 0 : _a.UOM) ? (_b = additionalItem.tradingItem) === null || _b === void 0 ? void 0 : _b.UOM : 0,
                item_quantity: additionalItem.quantity,
                discount: additionalItem.discount,
                totaldrawing: 1,
                myitem_discount: 1,
                totalamount: Math.ceil(additionalItem.unitPrice || 0),
                totalamountdealer: 0,
            };
        });
        // const drawingItemsTotal = quotationDetails.reduce((acc, drawingItem) => acc + (drawingItem.dis! != undefined ? tradingItem.stdcost! : 0), 0)
        // const tradingItemsTotal = tradingItems.reduce((acc, tradingItem) => acc + (tradingItem.stdcost! != undefined ? tradingItem.stdcost! : 0), 0)
        // const roundUpDiscount = round(order.designs.length ? order.designs[order.designs.length - 1].lumpsum ?? 0 : 0)
        const totalPriceDrawingItems = round(Design.reduce((acc, drawingItem) => acc + (drawingItem.totalPriceDrawingItems != undefined ? drawingItem.totalPriceDrawingItems : 0), 0));
        const totalPriceTradingItems = round(Design.reduce((acc, drawingItem) => acc + (drawingItem.totalPriceTradingItems != undefined ? drawingItem.totalPriceTradingItems : 0), 0));
        const totalPriceLooseItems = round(Design.reduce((acc, drawingItem) => acc + (drawingItem.totalPriceLooseItems != undefined ? drawingItem.totalPriceLooseItems : 0), 0));
        const totalPriceOtherItems = round(Design.reduce((acc, drawingItem) => acc + (drawingItem.totalPriceOtherItems != undefined ? drawingItem.totalPriceOtherItems : 0), 0));
        const itemTotalUp = round(totalPriceDrawingItems + totalPriceTradingItems + totalPriceLooseItems + totalPriceOtherItems);
        const totalPriceDrawingItemsDiscounted = round(Design.reduce((acc, drawingItem) => acc + (drawingItem.discountedTotalPriceDrawingItems != undefined ? drawingItem.discountedTotalPriceDrawingItems : 0), 0));
        const totalPriceTradingItemsDiscounted = round(Design.reduce((acc, drawingItem) => acc + (drawingItem.discountedTotalPriceTradingItems != undefined ? drawingItem.discountedTotalPriceTradingItems : 0), 0));
        const totalPriceLooseItemsDiscounted = round(Design.reduce((acc, drawingItem) => acc + (drawingItem.discountedTotalPriceLooseItems != undefined ? drawingItem.discountedTotalPriceLooseItems : 0), 0));
        const totalPriceOtherItemsDiscounted = round(Design.reduce((acc, drawingItem) => acc + (drawingItem.discountedTotalPriceOtherItems != undefined ? drawingItem.discountedTotalPriceOtherItems : 0), 0));
        const itemTotalUpDiscounted = round(totalPriceDrawingItemsDiscounted + totalPriceTradingItemsDiscounted + totalPriceLooseItemsDiscounted + totalPriceOtherItemsDiscounted);
        const installationCharges = Design.reduce((acc, design) => acc + design.installationCharges, 0);
        const installerOutstationCharges = Design.reduce((acc, design) => acc + design.installerOutstationCharges, 0);
        const transportationCharges = Design.reduce((acc, design) => acc + design.transportationCharges, 0);
        const total = round(totalPriceDrawingItemsDiscounted + totalPriceTradingItemsDiscounted + totalPriceLooseItemsDiscounted + totalPriceOtherItemsDiscounted + installationCharges);
        const roundUpDiscount = round(Design.reduce((acc, drawingItem) => acc + (drawingItem.roundUpDiscount != undefined ? drawingItem.roundUpDiscount : 0), 0));
        const gst = round(total * 0.00); // currently put 0.00 (Government benchmark = 0.08)
        // const grandTotal = round(total + gst - roundUpDiscount)
        // const totalAmount = order.designs.reduce((acc, design) => acc + design.totalAmount(), 0)
        const nettTotal = total - roundUpDiscount;
        const roundDown = Math.floor(nettTotal);
        const downPayment = order.paidAmountDeposit;
        const balancePayment = roundDown - downPayment;
        let finalArray = [
            ...quotationDetails,
            ...tradingItems,
            ...looseItems,
            ...otherItems,
        ];
        return {
            uuid: order.uuid,
            date: (_a = order.createdAt) === null || _a === void 0 ? void 0 : _a.toDateString(),
            quotationNumber: order.quotationNumber,
            customer: {
                uuid: lead.uuid,
                name: lead.name,
                phone: lead.phone,
                email: lead.email,
                address1: lead.address1,
                address2: lead.address2,
                postcode: lead.postcode,
                city: lead.city,
                state: lead.state
            },
            salesConsultant: {
                name: (_b = lead.user) === null || _b === void 0 ? void 0 : _b.name,
                phone: (_c = lead.user) === null || _c === void 0 ? void 0 : _c.mobile,
                code: profile === null || profile === void 0 ? void 0 : profile.sccode // lead.user?.profile?.sccode
            },
            design: Design,
            branch: {
                branch_name: (_d = lead.branch) === null || _d === void 0 ? void 0 : _d.name,
                branch_code: (_e = lead.branch) === null || _e === void 0 ? void 0 : _e.code,
                branch_category: (_f = lead.branch) === null || _f === void 0 ? void 0 : _f.type,
            },
            items: quotationDetails,
            tradingItems: tradingItems,
            looseItems: looseItems,
            otherItems: otherItems,
            combineAllItems: finalArray,
            totalPriceDrawingItems: totalPriceDrawingItems,
            totalPriceTradingItems: totalPriceTradingItems,
            totalPriceLooseItems: totalPriceLooseItems,
            totalPriceOtherItems: totalPriceOtherItems,
            totalPrice: itemTotalUp,
            totalPriceDrawingItemsDiscounted: totalPriceDrawingItemsDiscounted,
            totalPriceTradingItemsDiscounted: totalPriceTradingItemsDiscounted,
            totalPriceLooseItemsDiscounted: totalPriceLooseItemsDiscounted,
            totalPriceOtherItemsDiscounted: totalPriceOtherItemsDiscounted,
            totalPriceDiscounted: itemTotalUpDiscounted,
            installationCharges: installationCharges,
            installerOutstationCharges: installerOutstationCharges,
            transportationCharges: transportationCharges,
            total: total,
            roundUpDiscount: roundUpDiscount,
            gst: gst,
            nettTotal: nettTotal,
            roundDown: roundDown,
            downPayment: downPayment,
            balancePayment: balancePayment,
            total_approved_amount: order.totalApprovedAmount,
            /* Dealer Price */
            totalPriceDealer: itemTotalUp,
            installationChargesDealer: installationCharges,
            installerOutstationChargesDealer: installerOutstationCharges,
            transportationChargesDealer: transportationCharges,
            totalDealer: total,
            roundUpDiscountDealer: roundUpDiscount,
            gstDealer: gst,
            nettTotalDealer: nettTotal,
            roundDownDealer: roundDown,
            downPaymentDealer: downPayment,
            balancePaymentDealer: balancePayment,
            /* Dealer Price */
            // After
            cashVoucher: '0',
            firstDepositDate: '0000-00-00 00:00:00',
            // txtotherchargesdesc: '0',                                                // should be decimal
            txtworktoplabourcharges: '0',
            txtworktopoutstationcharges: '0'
            // totalPrice: order.designs.every(design => design.totalPrice) ?              // should be decimal                                                 // need to recheck
            // order.designs.reduce((acc, design) => acc + design.totalPrice, 0)           // should be decimal
            // : undefined,
            // // worktopLabourCharges:  
            // worktopOutstationCharges: order.designs.every(design => Number(design.isIncludedInstallationCharge) === 1) ?
            //   order.designs.reduce((acc, design) => acc + design.installerOutstationCharge, 0)
            //   : undefined, // undefined
            // installationChargess: order.designs.every(design => Number(design.isIncludedInstallationCharge) === 1) ?
            //   order.designs.reduce((acc, design) => acc + design.totalInstallationCharges, 0)
            //   : undefined,
            // installerOutstationChargess: order.designs.every(design => Number(design.installerOutstationCharge) === 1) ?                   // need to recheck
            // order.designs.reduce((acc, design) => acc + design.installerOutstationCharge, 0)
            // : undefined,
            // transportationChargess: order.designs.every(design => Number(design.isIncludedTransportationCharge) === 1) ?
            //   order.designs.reduce((acc, design) => acc + design.transportationCharge, 0)
            //   : undefined,
        };
    }
    async patch(orderId, createType, createDone) {
        if (orderId === '' || createType === '') {
            throw new rest_1.HttpErrors[404]('id or status should not be empty strings');
        }
        const order = await this.designCreateCronJobRepository.findOne({ where: { orderId: orderId, createType: createType } });
        if (!order)
            throw new rest_1.HttpErrors[400](`No order found with order id ${orderId}`);
        await this.designCreateCronJobRepository.updateById(order === null || order === void 0 ? void 0 : order.uuid, {
            createType: createType,
            createDone: createDone,
        });
        return 'Successfully update cron';
    }
};
tslib_1.__decorate([
    rest_1.get('/order-confirmations/erp/new', {
        responses: {
            '200': {
                description: 'Array of Order Confirmations with state New',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.FinalConfirmationOrder) }
                    }
                },
            },
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], FinalConfirmationOrderErpIntegrationController.prototype, "findOrderConfirmationsNew", null);
tslib_1.__decorate([
    rest_1.post('/order-confirmations/erp/new/processed', {
        responses: {
            '204': {
                description: 'Set New Order Confirmations to processed success.',
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: { type: 'array', items: { type: "string" } }
            }
        }
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], FinalConfirmationOrderErpIntegrationController.prototype, "updateOrderConfirmationNewProcessed", null);
tslib_1.__decorate([
    rest_1.get('/order-confirmations/erp/pass-deposit-threshold-percentage', {
        responses: {
            '200': {
                description: 'Array of Order Confirmations with >10% deposit',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.FinalConfirmationOrder) }
                    }
                },
            },
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], FinalConfirmationOrderErpIntegrationController.prototype, "findOrderConfirmationPassDepositThresholdPercentage", null);
tslib_1.__decorate([
    rest_1.post('/order-confirmations/erp/pass-deposit-threshold-percentage/processed', {
        responses: {
            '204': {
                description: 'Set Order Confirmations with >10% deposit to processed success.',
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: { type: 'array', items: { type: "string" } }
            }
        }
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], FinalConfirmationOrderErpIntegrationController.prototype, "updateOrderConfirmationPassDepositThresholdPercentageProcessed", null);
tslib_1.__decorate([
    rest_1.get('/final-confirmation-orders/erp/production', {
        responses: {
            '200': {
                description: 'Array of Final Confirmation Orders with state Production',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.FinalConfirmationOrder, { includeRelations: true }) }
                    }
                },
            },
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], FinalConfirmationOrderErpIntegrationController.prototype, "findFinalConfirmationOrdersProduction", null);
tslib_1.__decorate([
    rest_1.get('/final-confirmation-order/erp/production/create', {
        responses: {
            '200': {
                description: 'A single Final Confirmation Order with state Pending Detailer',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.FinalConfirmationOrder, { includeRelations: true })
                    }
                },
            },
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], FinalConfirmationOrderErpIntegrationController.prototype, "findFinalConfirmationOrderProductionCreate", null);
tslib_1.__decorate([
    rest_1.get('/final-confirmation-order/erp/production/update', {
        responses: {
            '200': {
                description: 'A single Final Confirmation Order with state Pending Detailer',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.FinalConfirmationOrder, { includeRelations: true })
                    }
                },
            },
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], FinalConfirmationOrderErpIntegrationController.prototype, "findFinalConfirmationOrderProductionUpdate", null);
tslib_1.__decorate([
    rest_1.patch('/final-confirmation-order/erp/design/{id}', {
        responses: {
            '204': {
                description: 'Final Confirmation Order - Design PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: { type: 'string' }
            }
        }
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], FinalConfirmationOrderErpIntegrationController.prototype, "updateFinalConfirmationOrderDesignById", null);
tslib_1.__decorate([
    rest_1.get('/order-confirmation/erp/acknowledged', {
        responses: {
            '200': {
                description: 'A single Final Confirmation Order with Order Confirmation status Acknowledged',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.FinalConfirmationOrder, { includeRelations: true })
                    }
                },
            },
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], FinalConfirmationOrderErpIntegrationController.prototype, "findFinalConfirmationOrderAcknowledged", null);
tslib_1.__decorate([
    rest_1.patch('/order-confirmation/erp/design/{id}', {
        responses: {
            '204': {
                description: 'Order Confirmation - Design PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: { type: 'string' }
            }
        }
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], FinalConfirmationOrderErpIntegrationController.prototype, "updateOrderConfirmationDesignById", null);
tslib_1.__decorate([
    rest_1.post('/final-confirmation-orders/erp/production/processed', {
        responses: {
            '204': {
                description: 'Set Final Confirmation Order in production state to processed by erp success.',
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: { type: 'array', items: { type: "string" } }
            }
        }
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], FinalConfirmationOrderErpIntegrationController.prototype, "updateFinalConfirmationOrderProductionProcessed", null);
tslib_1.__decorate([
    rest_1.get('/final-confirmation-orders/erp/production/update-status/{orderId}/{createType}/{createDone}', {
        responses: {
            '204': {
                description: 'update cron job status PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('orderId')),
    tslib_1.__param(1, rest_1.param.path.string('createType')),
    tslib_1.__param(2, rest_1.param.path.string('createDone')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], FinalConfirmationOrderErpIntegrationController.prototype, "patch", null);
FinalConfirmationOrderErpIntegrationController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.DesignRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.FinalConfirmationOrderRepository)),
    tslib_1.__param(2, repository_1.repository(repositories_1.ProfileRepository)),
    tslib_1.__param(3, repository_1.repository(repositories_1.DesignCreateCronJobRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.DesignRepository,
        repositories_1.FinalConfirmationOrderRepository,
        repositories_1.ProfileRepository,
        repositories_1.DesignCreateCronJobRepository])
], FinalConfirmationOrderErpIntegrationController);
exports.FinalConfirmationOrderErpIntegrationController = FinalConfirmationOrderErpIntegrationController;
//# sourceMappingURL=final-confirmation-order-erp-integration.controller.js.map