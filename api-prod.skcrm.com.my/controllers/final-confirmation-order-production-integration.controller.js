"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinalConfirmationOrderProductionIntegrationController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let FinalConfirmationOrderProductionIntegrationController = class FinalConfirmationOrderProductionIntegrationController {
    constructor(designRepository, finalConfirmationOrderRepository, profileRepository) {
        this.designRepository = designRepository;
        this.finalConfirmationOrderRepository = finalConfirmationOrderRepository;
        this.profileRepository = profileRepository;
    }
    async findOrderConfirmationsNew(designId, filter) {
        const newOrderConfirmations = await this.finalConfirmationOrderRepository.findOne({
            include: this.getOrderIncludeFilter(),
            where: {
                and: [
                    { uuid: designId },
                ]
            },
        });
        if (newOrderConfirmations == null) {
            return {};
        }
        // return newOrderConfirmations.map(this.transformOrderShape)
        return this.transformOrderShape(newOrderConfirmations);
    }
    getOrderIncludeFilter() {
        return [
            {
                relation: 'designs',
                scope: {
                    include: [
                        { relation: 'quotationDetails' },
                        { relation: 'designAdditionalItems', scope: { include: [{ relation: 'tradingItem' }] } },
                        // {relation: 'designAdditionalItems'},
                        // {relation: 'tradingItems'},
                        // {relation: 'designAdditionalLooseItems',include: [{relation: 'looseItems'}]},
                        { relation: 'designOtherItems' }
                    ]
                }
            },
            {
                relation: 'lead',
                scope: {
                    include: [
                        { relation: 'branch' },
                        { relation: 'user' },
                        { relation: 'exhibitions' }
                    ]
                }
            }
        ];
    }
    async transformOrderShape(order) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const round = (n) => parseFloat(n.toFixed(2));
        if (order.designs == null) {
            order.designs = [];
        }
        const Design = order.designs.map(design => {
            return {
                designId: design.uuid,
                jobPart: design.jobPart,
                drawingNumber: design.drawingNumber,
                quotationNumber: design.quotationNumber,
                jobNumber: (design.referenceName.includes('Kitchen') || design.referenceName.includes('Pantry')) ? ('K' + String(order.jobId) + design.jobPart) : ('W' + String(order.jobId) + design.jobPart),
                createdAt: design.createdAt,
                isIncludedWorktopOutstationCharge: design.isIncludedWorktopOutstationCharge,
                isIncludedInstallationCharge: design.isIncludedInstallationCharge,
                isIncludedInstallerOutstationCharge: design.isIncludedInstallerOutstationCharge,
                isIncludedTransporatationCharge: design.isIncludedTransportationCharge,
                totalPriceOtherItems: design.totalPriceOtherItems,
                totalPrice: design.totalPrice,
                installerOutstationDistance: design.installerOutstationDistance,
                transportationDistance: design.transportationDistance,
                installerOutstationCharge: design.installerOutstationCharge,
                transportationCharge: design.transportationCharge,
                totalInstallationCharges: design.totalInstallationCharges,
                discountedTotalPrice: design.discountedTotalPrice
            };
        });
        const quotationDetails = order.designs
            .flatMap(design => design.quotationDetails)
            .flat()
            .filter(item => item)
            .map(item_quotation => {
            var _a, _b;
            return {
                uuid: item_quotation.uuid,
                designId: item_quotation.designId,
                quantity: item_quotation.quantity,
                productNumber: item_quotation.productNumber,
                size: item_quotation.size,
                remark: item_quotation.remark,
                unitCost: item_quotation.unitCost,
                materialName: item_quotation.materialName,
                name: item_quotation.name,
                id: item_quotation.id,
                parentId: item_quotation.parentId,
                topId: item_quotation.topId,
                itemPart: item_quotation.itemPart,
                recommendedRetailPrice: item_quotation.recommendedRetailPrice,
                nonStandardCoef: item_quotation.nonStandardCoef,
                totalDealerPrice: item_quotation.totalDealerPrice,
                // Check if not (NULL,blank) AND contain string 'AW' ELSE ''
                profile: item_quotation.brandGoodCode == null ? '' : ((item_quotation.brandGoodCode != '') ? (item_quotation.brandGoodCode.includes('AW') == true ? ((_b = (_a = item_quotation.brandGoodCode) === null || _a === void 0 ? void 0 : _a.trim().split(',').find((itemProcess => itemProcess.substring(0, 2) === 'AW'))) === null || _b === void 0 ? void 0 : _b.replace('AW', '')) : '') : ''),
                type_description: item_quotation.category ? item_quotation.category : '',
                doorfinishing_list: item_quotation.brandGoodName + '' + item_quotation.productNumber,
            };
        });
        const dummy_size = { "x": 0, "y": 0, "z": 0 };
        const tradingItems = order.designs.map(design => design.designAdditionalItems)
            .flat().filter(item => !!item).map(additionalItem => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
            return {
                uuid: (_a = additionalItem === null || additionalItem === void 0 ? void 0 : additionalItem.tradingItem) === null || _a === void 0 ? void 0 : _a.uuid,
                stdcost: (_b = additionalItem === null || additionalItem === void 0 ? void 0 : additionalItem.tradingItem) === null || _b === void 0 ? void 0 : _b.stdcost,
                category: (_c = additionalItem === null || additionalItem === void 0 ? void 0 : additionalItem.tradingItem) === null || _c === void 0 ? void 0 : _c.category,
                name: (_d = additionalItem === null || additionalItem === void 0 ? void 0 : additionalItem.tradingItem) === null || _d === void 0 ? void 0 : _d.name,
                type_description: (_e = additionalItem.tradingItem) === null || _e === void 0 ? void 0 : _e.category,
                doorfinishing_list: ((_f = additionalItem.tradingItem) === null || _f === void 0 ? void 0 : _f.name) + '' + ((_g = additionalItem.tradingItem) === null || _g === void 0 ? void 0 : _g.itemcode),
                uom: (_h = additionalItem === null || additionalItem === void 0 ? void 0 : additionalItem.tradingItem) === null || _h === void 0 ? void 0 : _h.uom,
                quantity: additionalItem.quantity,
                discount: additionalItem.discount,
                productNumber: '',
                size: dummy_size,
                remark: '',
                unitCost: 0.0,
                materialName: (_j = additionalItem === null || additionalItem === void 0 ? void 0 : additionalItem.tradingItem) === null || _j === void 0 ? void 0 : _j.name,
                profile: (_k = additionalItem === null || additionalItem === void 0 ? void 0 : additionalItem.tradingItem) === null || _k === void 0 ? void 0 : _k.profile,
                id: '',
                parentId: '',
                topId: '',
                itemPart: (_l = additionalItem === null || additionalItem === void 0 ? void 0 : additionalItem.tradingItem) === null || _l === void 0 ? void 0 : _l.part,
                recommendedRetailPrice: Math.ceil(((_m = additionalItem === null || additionalItem === void 0 ? void 0 : additionalItem.tradingItem) === null || _m === void 0 ? void 0 : _m.stdcost) * ((_o = additionalItem === null || additionalItem === void 0 ? void 0 : additionalItem.tradingItem) === null || _o === void 0 ? void 0 : _o.markuprate) * (additionalItem === null || additionalItem === void 0 ? void 0 : additionalItem.quantity)),
                nonStandardCoef: 0,
                totalDealerPrice: Math.ceil(Math.ceil(((_p = additionalItem === null || additionalItem === void 0 ? void 0 : additionalItem.tradingItem) === null || _p === void 0 ? void 0 : _p.stdcost) * ((_q = additionalItem === null || additionalItem === void 0 ? void 0 : additionalItem.tradingItem) === null || _q === void 0 ? void 0 : _q.markuprate) * (additionalItem === null || additionalItem === void 0 ? void 0 : additionalItem.quantity)) * ((_r = additionalItem === null || additionalItem === void 0 ? void 0 : additionalItem.tradingItem) === null || _r === void 0 ? void 0 : _r.dealerprice)),
            };
        });
        const looseItems = order
            .designs.map(design => design.designAdditionalLooseItems)
            .flat()
            .filter(item => !!item)
            .map(additionalItem => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
            return {
                designId: additionalItem.designId,
                uuid: additionalItem.looseItemId,
                stdcost: (_a = additionalItem.looseItem) === null || _a === void 0 ? void 0 : _a.stdcost,
                category: (_b = additionalItem.looseItem) === null || _b === void 0 ? void 0 : _b.category,
                name: (_c = additionalItem.looseItem) === null || _c === void 0 ? void 0 : _c.name,
                part: (_d = additionalItem.looseItem) === null || _d === void 0 ? void 0 : _d.part,
                type_description: (_e = additionalItem.looseItem) === null || _e === void 0 ? void 0 : _e.category,
                doorfinishing_list: ((_f = additionalItem.looseItem) === null || _f === void 0 ? void 0 : _f.name) + '' + ((_g = additionalItem.looseItem) === null || _g === void 0 ? void 0 : _g.itemcode),
                uom: (_h = additionalItem.looseItem) === null || _h === void 0 ? void 0 : _h.puom,
                puom: (_j = additionalItem.looseItem) === null || _j === void 0 ? void 0 : _j.puom,
                suom: (_k = additionalItem.looseItem) === null || _k === void 0 ? void 0 : _k.suom,
                totaldrawing: 0,
                myitem_discount: 0,
                quantity: additionalItem.quantity,
                discount: additionalItem.discount,
                productNumber: '',
                size: dummy_size,
                remark: '',
                unitCost: 0.0,
                materialName: (_l = additionalItem === null || additionalItem === void 0 ? void 0 : additionalItem.looseItem) === null || _l === void 0 ? void 0 : _l.name,
                profile: (_m = additionalItem === null || additionalItem === void 0 ? void 0 : additionalItem.looseItem) === null || _m === void 0 ? void 0 : _m.profile,
                id: '',
                parentId: '',
                topId: '',
                itemPart: (_o = additionalItem === null || additionalItem === void 0 ? void 0 : additionalItem.looseItem) === null || _o === void 0 ? void 0 : _o.part,
                recommendedRetailPrice: Math.ceil(((_p = additionalItem === null || additionalItem === void 0 ? void 0 : additionalItem.looseItem) === null || _p === void 0 ? void 0 : _p.stdcost) * ((_q = additionalItem === null || additionalItem === void 0 ? void 0 : additionalItem.looseItem) === null || _q === void 0 ? void 0 : _q.markuprate) * (additionalItem === null || additionalItem === void 0 ? void 0 : additionalItem.quantity)),
                nonStandardCoef: 0,
                totalDealerPrice: Math.ceil(Math.ceil(((_r = additionalItem === null || additionalItem === void 0 ? void 0 : additionalItem.looseItem) === null || _r === void 0 ? void 0 : _r.stdcost) * ((_s = additionalItem === null || additionalItem === void 0 ? void 0 : additionalItem.looseItem) === null || _s === void 0 ? void 0 : _s.markuprate) * (additionalItem === null || additionalItem === void 0 ? void 0 : additionalItem.quantity)) * ((_t = additionalItem === null || additionalItem === void 0 ? void 0 : additionalItem.looseItem) === null || _t === void 0 ? void 0 : _t.dealerprice)),
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
                uuid: additionalItem.uuid,
                stdcost: additionalItem.stdcost,
                category: additionalItem.category,
                name: additionalItem.name,
                type_description: 'Other',
                doorfinishing_list: additionalItem.description + '' + additionalItem.name,
                uom: (_a = additionalItem.tradingItem) === null || _a === void 0 ? void 0 : _a.UOM,
                totaldrawing: 0,
                myitem_discount: 0,
                quantity: additionalItem.quantity,
                discount: additionalItem.discount,
                productNumber: '',
                size: dummy_size,
                remark: '',
                unitCost: 0.0,
                materialName: additionalItem.name,
                profile: (_b = additionalItem === null || additionalItem === void 0 ? void 0 : additionalItem.looseItem) === null || _b === void 0 ? void 0 : _b.description,
                id: '',
                parentId: '',
                topId: '',
                itemPart: 'Other',
                recommendedRetailPrice: additionalItem.unitPrice,
                nonStandardCoef: 0,
                totalDealerPrice: 0,
            };
        });
        const itemPartA = order.designs
            .map(design => design.quotationDetails)
            .flat()
            .filter(item => item.itemPart == 'A')
            .map(itempart_a => {
            return {
                recommendedRetailPrice: itempart_a.recommendedRetailPrice,
                quantity: itempart_a.quantity,
            };
        });
        const itemPartB = order.designs
            .map(design => design.quotationDetails)
            .flat()
            .filter(item => item.itemPart == 'B')
            .map(itempart_a => {
            return {
                recommendedRetailPrice: itempart_a.recommendedRetailPrice,
                quantity: itempart_a.quantity,
            };
        });
        const itemPartC = order.designs.map(design => design.designAdditionalItems)
            .flat().filter(item => { var _a, _b; return ((_a = item === null || item === void 0 ? void 0 : item.tradingItem) === null || _a === void 0 ? void 0 : _a.category) == 'Worktop' && ((_b = item === null || item === void 0 ? void 0 : item.tradingItem) === null || _b === void 0 ? void 0 : _b.part) == 'C'; }).map(itempart_c => {
            var _a, _b;
            return {
                stdcost: (_a = itempart_c === null || itempart_c === void 0 ? void 0 : itempart_c.tradingItem) === null || _a === void 0 ? void 0 : _a.stdcost,
                markuprate: (_b = itempart_c === null || itempart_c === void 0 ? void 0 : itempart_c.tradingItem) === null || _b === void 0 ? void 0 : _b.markuprate,
                quantity: itempart_c.quantity,
            };
        });
        const itemPartD = order.designs.map(design => design.designAdditionalItems)
            .flat().filter(item => { var _a, _b; return ((_a = item === null || item === void 0 ? void 0 : item.tradingItem) === null || _a === void 0 ? void 0 : _a.category) == 'Kitchen Appliances' && ((_b = item === null || item === void 0 ? void 0 : item.tradingItem) === null || _b === void 0 ? void 0 : _b.part) == 'D'; }).map(itempart_c => {
            var _a, _b;
            return {
                stdcost: (_a = itempart_c === null || itempart_c === void 0 ? void 0 : itempart_c.tradingItem) === null || _a === void 0 ? void 0 : _a.stdcost,
                markuprate: (_b = itempart_c === null || itempart_c === void 0 ? void 0 : itempart_c.tradingItem) === null || _b === void 0 ? void 0 : _b.markuprate,
                quantity: itempart_c.quantity,
            };
        });
        const itemPartE = order.designs.map(design => design.designAdditionalItems)
            .flat().filter(item => { var _a, _b; return ((_a = item === null || item === void 0 ? void 0 : item.tradingItem) === null || _a === void 0 ? void 0 : _a.category) == 'Sink and Tap' && ((_b = item === null || item === void 0 ? void 0 : item.tradingItem) === null || _b === void 0 ? void 0 : _b.part) == 'E'; }).map(itempart_c => {
            var _a, _b;
            return {
                stdcost: (_a = itempart_c === null || itempart_c === void 0 ? void 0 : itempart_c.tradingItem) === null || _a === void 0 ? void 0 : _a.stdcost,
                markuprate: (_b = itempart_c === null || itempart_c === void 0 ? void 0 : itempart_c.tradingItem) === null || _b === void 0 ? void 0 : _b.markuprate,
                quantity: itempart_c.quantity,
            };
        });
        const itemPartF = order.designs.map(design => design.designAdditionalItems)
            .flat().filter(item => { var _a, _b; return ((_a = item === null || item === void 0 ? void 0 : item.tradingItem) === null || _a === void 0 ? void 0 : _a.category) == 'Fitting and Accessories' && ((_b = item === null || item === void 0 ? void 0 : item.tradingItem) === null || _b === void 0 ? void 0 : _b.part) == 'F'; }).map(itempart_c => {
            var _a, _b;
            return {
                stdcost: (_a = itempart_c === null || itempart_c === void 0 ? void 0 : itempart_c.tradingItem) === null || _a === void 0 ? void 0 : _a.stdcost,
                markuprate: (_b = itempart_c === null || itempart_c === void 0 ? void 0 : itempart_c.tradingItem) === null || _b === void 0 ? void 0 : _b.markuprate,
                quantity: itempart_c.quantity,
            };
        });
        // Asyraf Reference
        // const itemPrice = item.stdcost * item.markuprate * item.designAdditionalItems[0].quantity
        // const itemDealerPrice = itemPrice * item.dealerprice
        // const tradingItem = {
        //   ...item,
        //   quantity: item.designAdditionalItems[0].quantity,
        //   discount: item.designAdditionalItems[0].discount * 100,
        //   displayedDealerPrice: itemDealerPrice,
        //   discountedPrice: itemPrice * (1 - item.designAdditionalItems[0].discount)
        // }
        // if (item.category === 'Worktop') {
        //   this.worktops.push(tradingItem)
        // } else if (item.category === 'Kitchen Appliances') {
        //   this.kitchens.push(tradingItem)
        // } else if (item.category === 'Sink and Tap') {
        //   this.sinks.push(tradingItem)
        // }
        // this.dealerprice.totalPriceTradingItems += itemDealerPrice // Manually add to dealerprice total for frontend display
        // this.tradingItems.push(tradingItem)
        // Asyraf Reference
        const totalInstallationCharges = order.designs.reduce((acc, design) => acc + design.totalInstallationCharges, 0);
        const discountedTotalPrice = order.designs.reduce((acc, design) => acc + design.discountedTotalPrice, 0);
        const subTotal_A = itemPartA.reduce((acc, design) => acc + design.quantity, 0) * itemPartA.reduce((acc, design) => acc + design.recommendedRetailPrice, 0);
        const subTotal_B = itemPartB.reduce((acc, design) => acc + design.quantity, 0) * itemPartB.reduce((acc, design) => acc + design.recommendedRetailPrice, 0);
        const subTotal_C = itemPartC.reduce((acc, design) => acc + design.quantity, 0) * itemPartC.reduce((acc, design) => acc + design.stdcost, 0) * itemPartC.reduce((acc, design) => acc + design.markuprate, 0);
        const subTotal_D = itemPartD.reduce((acc, design) => acc + design.quantity, 0) * itemPartD.reduce((acc, design) => acc + design.stdcost, 0) * itemPartD.reduce((acc, design) => acc + design.markuprate, 0);
        const subTotal_E = itemPartE.reduce((acc, design) => acc + design.quantity, 0) * itemPartE.reduce((acc, design) => acc + design.stdcost, 0) * itemPartE.reduce((acc, design) => acc + design.markuprate, 0);
        const subTotal_F = itemPartF.reduce((acc, design) => acc + design.quantity, 0) * itemPartF.reduce((acc, design) => acc + design.stdcost, 0) * itemPartF.reduce((acc, design) => acc + design.markuprate, 0);
        const item_partA_summary = {
            proposal_part_a_summary: 0,
            proposal_part_a_installation: round(totalInstallationCharges),
            proposal_part_a_discount: round(discountedTotalPrice),
            proposal_part_a_subtotal: round(subTotal_A),
            proposal_part_a_total: round(subTotal_A + totalInstallationCharges)
        };
        const item_partB_summary = {
            proposal_part_b_summary: 0,
            proposal_part_b_installation: round(totalInstallationCharges),
            proposal_part_b_discount: round(discountedTotalPrice),
            proposal_part_b_subtotal: round(subTotal_B),
            proposal_part_b_total: round(subTotal_B + totalInstallationCharges)
        };
        const item_partC_summary = {
            proposal_part_c_summary: 0,
            proposal_part_c_installation: round(totalInstallationCharges),
            proposal_part_c_discount: round(discountedTotalPrice),
            proposal_part_c_subtotal: round(subTotal_C),
            proposal_part_c_total: round(subTotal_C + totalInstallationCharges)
        };
        const item_partD_summary = {
            proposal_part_d_summary: 0,
            proposal_part_d_installation: round(totalInstallationCharges),
            proposal_part_d_discount: round(discountedTotalPrice),
            proposal_part_d_subtotal: round(subTotal_D),
            proposal_part_d_total: round(subTotal_D + totalInstallationCharges)
        };
        const item_partE_summary = {
            proposal_part_e_summary: 0,
            proposal_part_e_installation: round(totalInstallationCharges),
            proposal_part_e_discount: round(discountedTotalPrice),
            proposal_part_e_subtotal: round(subTotal_E),
            proposal_part_e_total: round(subTotal_E + totalInstallationCharges)
        };
        const item_partF_summary = {
            proposal_part_f_summary: 0,
            proposal_part_f_installation: round(totalInstallationCharges),
            proposal_part_f_discount: round(discountedTotalPrice),
            proposal_part_f_subtotal: round(subTotal_F),
            proposal_part_f_total: round(subTotal_F + totalInstallationCharges)
        };
        const tradingItemsTotal = tradingItems.reduce((acc, tradingItem) => acc + tradingItem.stdcost, 0);
        const drawingItemsTotal = order.designs.reduce((acc, design) => acc + design.totalAmount(), 0);
        const total = round(drawingItemsTotal + tradingItemsTotal);
        const gst = round(total * 0.08);
        const roundUpDiscount = round(order.designs.length ? (_a = order.designs[order.designs.length - 1].lumpsum) !== null && _a !== void 0 ? _a : 0 : 0);
        const grandTotal = round(total + gst - roundUpDiscount);
        const roundDown = Math.floor(grandTotal);
        const lead = order.lead;
        const user = lead.user;
        const profile = await this.profileRepository.findOne({
            where: {
                userId: user.uuid
            }
        });
        let finalArray = [
            ...quotationDetails,
            ...tradingItems,
            ...looseItems,
            ...otherItems,
        ];
        return {
            uuid: order.uuid,
            date: (_b = order.createdAt) === null || _b === void 0 ? void 0 : _b.toDateString(),
            quotationNumber: order.quotationNumber,
            remark: order.remarks,
            createdDate: order.createdAt,
            jobId: order.jobId,
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
                uuid: (_d = lead.user) === null || _d === void 0 ? void 0 : _d.uuid,
                name: (_e = lead.user) === null || _e === void 0 ? void 0 : _e.name,
                phone: (_f = lead.user) === null || _f === void 0 ? void 0 : _f.mobile,
                sccode: profile === null || profile === void 0 ? void 0 : profile.sccode
            },
            design: Design,
            branch: {
                uuid: (_g = lead.branch) === null || _g === void 0 ? void 0 : _g.uuid,
                branch_name: (_h = lead.branch) === null || _h === void 0 ? void 0 : _h.name,
                branch_code: (_j = lead.branch) === null || _j === void 0 ? void 0 : _j.code,
                branch_category: (_k = lead.branch) === null || _k === void 0 ? void 0 : _k.type,
            },
            items: quotationDetails,
            tradingItems: tradingItems,
            looseItems: looseItems,
            otherItems: otherItems,
            combineAllItems: finalArray,
            roundDown: roundDown,
            downPayment: order.paidAmountDeposit,
            balancePayment: roundDown - order.paidAmountDeposit,
            tradingItemsTotal: tradingItemsTotal,
            drawingItemsTotal: drawingItemsTotal,
            totalPrice: order.designs.every(design => design.totalPrice) ? // need to recheck
                order.designs.reduce((acc, design) => acc + design.totalPrice, 0)
                : undefined,
            // worktopLabourCharges:                                                                              // need to recheck
            total: total,
            worktopOutstationCharges: order.designs.every(design => design.isIncludedWorktopOutstationCharge) ?
                order.designs.reduce((acc, design) => acc + design.installerOutstationCharge, 0)
                : undefined,
            roundUpDiscount: roundUpDiscount,
            installationCharges: order.designs.every(design => design.isIncludedInstallationCharge) ?
                order.designs.reduce((acc, design) => acc + design.totalInstallationCharges, 0)
                : undefined,
            installerOutstationCharges: order.designs.every(design => design.installerOutstationCharge) ? // need to recheck
                order.designs.reduce((acc, design) => acc + design.installerOutstationCharge, 0)
                : undefined,
            gst: gst,
            nettTotal: grandTotal,
            transportationCharges: order.designs.every(design => design.isIncludedTransportationCharge) ?
                order.designs.reduce((acc, design) => acc + design.transportationCharge, 0)
                : undefined,
            grandTotal: order.designs.reduce((acc, design) => acc + design.discountedTotalPrice, 0),
            item_partA_summary: item_partA_summary,
            item_partB_summary: item_partB_summary,
            item_partC_summary: item_partC_summary,
            item_partD_summary: item_partD_summary,
            item_partE_summary: item_partE_summary,
            item_partF_summary: item_partF_summary,
        };
    }
};
tslib_1.__decorate([
    rest_1.get('/final-confirmation-order/production-order/{designId}', {
        responses: {
            '200': {
                description: 'Array of Order Confirmations with Integrate with Production Order',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.FinalConfirmationOrder, { includeRelations: true }) }
                    }
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('designId')),
    tslib_1.__param(1, rest_1.param.filter(models_1.FinalConfirmationOrder, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FinalConfirmationOrderProductionIntegrationController.prototype, "findOrderConfirmationsNew", null);
FinalConfirmationOrderProductionIntegrationController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.DesignRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.FinalConfirmationOrderRepository)),
    tslib_1.__param(2, repository_1.repository(repositories_1.ProfileRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.DesignRepository,
        repositories_1.FinalConfirmationOrderRepository,
        repositories_1.ProfileRepository])
], FinalConfirmationOrderProductionIntegrationController);
exports.FinalConfirmationOrderProductionIntegrationController = FinalConfirmationOrderProductionIntegrationController;
//# sourceMappingURL=final-confirmation-order-production-integration.controller.js.map