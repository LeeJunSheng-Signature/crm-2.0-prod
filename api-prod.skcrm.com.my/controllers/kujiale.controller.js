"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KujialeController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const crypto_js_1 = tslib_1.__importDefault(require("crypto-js"));
const ts_retry_promise_1 = require("ts-retry-promise");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const schema_1 = require("../schema");
const services_1 = require("../services");
const design_state_enum_1 = require("../types/design-state.enum");
let KujialeController = class KujialeController {
    constructor(leadRepository, calculationLogRepository, roleRepository, quotationDetailsRepository, missingItemRepository, designRepository, orderInfoRepository, brandGoodsRepository, itemListRepository, materialRepository, processRepository, kujialeService, getCurrentUser, emailService) {
        this.leadRepository = leadRepository;
        this.calculationLogRepository = calculationLogRepository;
        this.roleRepository = roleRepository;
        this.quotationDetailsRepository = quotationDetailsRepository;
        this.missingItemRepository = missingItemRepository;
        this.designRepository = designRepository;
        this.orderInfoRepository = orderInfoRepository;
        this.brandGoodsRepository = brandGoodsRepository;
        this.itemListRepository = itemListRepository;
        this.materialRepository = materialRepository;
        this.processRepository = processRepository;
        this.kujialeService = kujialeService;
        this.getCurrentUser = getCurrentUser;
        this.emailService = emailService;
    }
    async getKujialeAccessToken() {
        const userToken = await this.getCurrentUser();
        console.log(userToken);
        // Changed to use App UID + secondary email for registering, and App UID for authenticating
        if (process.env.KUJIALE_ENABLE === '1') {
            const timestamp = new Date().getTime();
            const sign = process.env.KUJIALE_APPSECRET +
                process.env.KUJIALE_APPKEY +
                userToken.appUID +
                timestamp;
            const registration = await this.kujialeService.register(userToken.appUID, userToken.name, userToken.kujialeEmail, 'abcd1234', timestamp, crypto_js_1.default.MD5(sign).toString());
            // console.log(registration);
        }
        const timestamp = new Date().getTime();
        const sign = process.env.KUJIALE_APPSECRET +
            process.env.KUJIALE_APPKEY +
            userToken.appUID +
            timestamp;
        return this.kujialeService.getSSOToken(userToken.appUID, timestamp, crypto_js_1.default.MD5(sign).toString());
    }
    async kujialeDrawingCalculate(task) {
        const userToken = await this.getCurrentUser();
        const timestamp = new Date().getTime();
        const sign = process.env.KUJIALE_APPSECRET +
            process.env.KUJIALE_APPKEY +
            userToken.appUID +
            timestamp;
        const signWithNoAppId = process.env.KUJIALE_APPSECRET + process.env.KUJIALE_APPKEY + timestamp;
        console.log('here');
        const quotationDetails = await this.getDrawingQuotationDetailsFromKujiale(userToken.appUID, timestamp, sign, signWithNoAppId, task.drawingId);
        let totalDrawingPrice = 0;
        const missingItems = [];
        await this.calculationLogRepository.deleteAll({
            drawingNumber: task.drawingId,
        });
        // TODO: will need to check on whether it is acceptible to clear missing item list before every calculation attempt
        await this.missingItemRepository.deleteAll({
            drawingNumber: task.drawingId,
        });
        for (const [index, quotationItem] of quotationDetails.quotationItems.entries()) {
            console.log(`=== ${quotationItem.brandGoodName}`);
            // Handle Chinese characters
            if (quotationItem.brandGoodName === '橱柜脚线')
                quotationItem.brandGoodName = 'u6a71u67dcu811au7ebf';
            if (quotationItem.brandGoodName === '橱柜台面') {
                // FIXME: This one although already changed to unicode, still have
                // collation error. (ER_CANT_AGGREGATE_2COLLATIONS)
                // continue;  // TODO: This if block was skipped with continue, currently remporarly disabling this continue block
                /**
                console.log('Found 橱柜台面, changing to u6a71u67dcu53f0u9762')
                quotationItem.brandGoodName = 'u6a71u67dcu53f0u9762'
                */
                console.log('Found 橱柜台面, changing to u6a71u67dcu53f0u9762');
                quotationItem.brandGoodName = 'u6a71u67dcu53f0u9762';
            }
            if (['MWS', 'MWSR', 'MWST', 'TMWS'].includes(quotationItem.brandGoodName)) {
                quotationItem.brandGoodName = quotationItem.productNumber;
            }
            const masterItem = await this.findMasterItem(quotationItem);
            if (!masterItem) {
                let missingItem = await this.missingItemRepository.findOne({
                    where: {
                        name: quotationItem.name,
                        brandGoodName: quotationItem.brandGoodName,
                        drawingNumber: task.drawingId,
                    },
                });
                if (!missingItem) {
                    missingItem = await this.missingItemRepository.create({
                        drawingNumber: task.drawingId,
                        brandGoodName: quotationItem.brandGoodName,
                        name: quotationItem.name,
                        productNumber: quotationItem.productNumber,
                    });
                }
                missingItems.push(missingItem);
                continue;
            }
            const { totalItemProcessCost, ccost, stdCost, material, colour, profile, markupRate, nonStdRate, totalCost, rrp: itemRRP, } = await this.calculateItemRRP(quotationItem, masterItem);
            const { x: width, y: depth, z: height } = quotationItem.size;
            await this.calculationLogRepository.create({
                drawingNumber: task.drawingId,
                kujialeSequenceId: index + 1,
                itemId: quotationItem.id,
                parentItemId: quotationItem.parentId,
                name: quotationItem.name,
                brandGoodName: quotationItem.brandGoodName,
                brandGoodCode: quotationItem.brandGoodCode,
                material,
                colour,
                profile,
                height,
                width,
                depth,
                totalItemProcessCost,
                ccost,
                stdCost,
                markupRate,
                nonStdRate,
                totalCost,
                rrp: itemRRP,
                quantity: quotationItem.quantity,
            });
            totalDrawingPrice += itemRRP;
            totalDrawingPrice = Number.parseFloat(totalDrawingPrice.toFixed(2));
        }
        if (missingItems.length) {
            await this.handleMissingItems(task.drawingId, missingItems);
            console.log('Missing Items: ', JSON.stringify(missingItems));
            return {
                totalDrawingPrice,
                message: `${missingItems.length} missing items found during calculation.`,
            };
        }
        return { totalDrawingPrice, message: '' };
    }
    async kujialeDrawingCreateDetailedQuotation(task) {
        var _a;
        const { count } = await this.designRepository.count({
            drawingNumber: task.drawingId,
        });
        if (count) {
            throw new rest_1.HttpErrors[400](`Detailed Quotation for drawing number ${task.drawingId} already exists`);
        }
        const drawingReferenceName = (_a = task === null || task === void 0 ? void 0 : task.drawingReferenceName) !== null && _a !== void 0 ? _a : '';
        const drawingUuid = ''; // Create DQ does not require design UUID to be defined
        return this.createOrUpdateDetailedQuotationFromKujiale(true, task.drawingId, drawingUuid, task.leadId, drawingReferenceName);
    }
    async kujialeDrawingUpdateDetailedQuotation(task) {
        const drawingReferenceName = '';
        return this.createOrUpdateDetailedQuotationFromKujiale(false, task.drawingId, task.drawingUuid, task.leadId, drawingReferenceName);
    }
    async handleMissingItems(drawingNumber, missingItems) {
        // Handle missing item
        const emailStringMissingItems = [];
        for (const missingItem of missingItems) {
            emailStringMissingItems.push(`
        Name: ${missingItem.name} <br>
        Brand Good Name: ${missingItem.brandGoodName} <br>
        Product Number: ${missingItem.productNumber} <br>
        `);
        }
        // Email
        const roleSysadmin = await this.roleRepository.findOne({
            where: {
                name: 'sysadmin',
            },
        });
        const sysadmins = await this.roleRepository
            .users(roleSysadmin.uuid)
            .find();
        const emailPromises = [];
        for (const sysadmin of sysadmins) {
            const email = new models_1.Email({
                to: sysadmin.email,
                subject: 'Missing Item found during calculation',
                content: `
        Some missing item(s) were found during calculation from Kujiale DesignCAD. <br>
        Here are the details: <br>
        <br>
        Drawing Number: ${drawingNumber} <br>
        <br> <br>
        Missing Items: <br>
        ${emailStringMissingItems.join('<br>')}
        `,
            });
            emailPromises.push(this.emailService.sendMail(email));
        }
        Promise.all(emailPromises);
    }
    async getDrawingQuotationDetailsFromKujiale(uid, timestamp, sign, signWithNoAppId, drawingId) {
        const { designId, obsAuditDesignId, designType, } = await this.findCustomerOrder(uid, timestamp, crypto_js_1.default.MD5(sign).toString(), drawingId);
        const task = await this.createInventoryDataAcquisitionTask(uid, timestamp, crypto_js_1.default.MD5(sign).toString(), designId, obsAuditDesignId, designType);
        console.log(task);
        const { taskId } = await this.createInventoryDataAcquisitionTask(uid, timestamp, crypto_js_1.default.MD5(sign).toString(), designId, obsAuditDesignId, designType);
        const isTaskSuccess = await this.getInventoryDataAcquisitionTaskStatus(uid, timestamp, crypto_js_1.default.MD5(signWithNoAppId).toString(), taskId);
        if (!isTaskSuccess)
            throw new rest_1.HttpErrors[408]('Kujiale inventory data acquisition task took too long');
        const { taskResultUrl } = await this.getInventoryDataAcquisitionTaskResult(uid, timestamp, crypto_js_1.default.MD5(signWithNoAppId).toString(), taskId);
        console.log(taskResultUrl);
        const quotationDetails = await this.kujialeService.getInventoryJsonData(taskResultUrl);
        return quotationDetails;
    }
    async findCustomerOrder(uid, timestamp, sign, drawingId) {
        const order = await this.kujialeService.findCustomerOrder(uid, timestamp, sign, drawingId);
        if (order.m.length)
            throw new rest_1.HttpErrors[400](order.m);
        if (!order.d.totalCount)
            throw new rest_1.HttpErrors[404](`No drawing found with id ${drawingId}`);
        const { designId, orderDesignId: obsAuditDesignId, itemInfoList, } = order.d.result[0];
        const modelTodesignType = {
            厨卫: '0',
            全屋家具: '1',
        };
        const isValidOrderDesignType = (value) => value in modelTodesignType;
        const itemInfoModelType = itemInfoList.find(itemInfo => itemInfo.fieldName === 'modelType').value;
        if (!isValidOrderDesignType(itemInfoModelType))
            throw new rest_1.HttpErrors[400](`Unimplemented or invalid order design type ${itemInfoModelType}`);
        const designType = modelTodesignType[itemInfoModelType];
        return { designId, obsAuditDesignId, designType };
    }
    async createInventoryDataAcquisitionTask(uid, timestamp, sign, designId, obsAuditDesignId, designType) {
        const { m: createTaskErrorMessage, d: taskId, } = await this.kujialeService.createInventoryDataAcquisitionTask(uid, timestamp, sign, designId, obsAuditDesignId, designType);
        if (createTaskErrorMessage)
            throw new rest_1.HttpErrors[400](createTaskErrorMessage);
        return { taskId };
    }
    async getInventoryDataAcquisitionTaskStatus(uid, timestamp, sign, taskId) {
        const getTaskStatusUntilSuccess = async () => {
            await new Promise(resolve => setTimeout(resolve, 3000)); // Delay 3 seconds
            const { m: taskStatusErrorMessage, d: taskStatusResult, } = await this.kujialeService.getInventoryDataAcquisitionTaskStatus(uid, timestamp, sign, taskId);
            if (taskStatusErrorMessage.length)
                return Promise.resolve(false);
            if (taskStatusResult !== 2)
                return Promise.reject();
            return Promise.resolve(true);
        };
        try {
            const isTaskSuccess = await ts_retry_promise_1.retry(getTaskStatusUntilSuccess, {
                retries: 10,
            });
            if (!isTaskSuccess)
                throw new Error('Failed');
            return true;
        }
        catch (e) {
            if (e.message === 'Failed')
                throw new rest_1.HttpErrors[400]('Data acquisition from kujiale failed');
            return false;
        }
    }
    async getInventoryDataAcquisitionTaskResult(uid, timestamp, sign, taskId) {
        const { m: taskResultErrorMessage, d: taskResultUrl, } = await this.kujialeService.getInventoryDataAcquisitionTaskResult(uid, timestamp, sign, taskId);
        if (taskResultErrorMessage.length)
            throw new rest_1.HttpErrors[500](taskResultErrorMessage);
        return { taskResultUrl };
    }
    async findMasterItem(quotationItem) {
        return this.itemListRepository.findOne({
            where: { name: quotationItem.brandGoodName },
        });
    }
    async calculateItemRRP(quotationItem, masterItem) {
        // FIXME: Whats the use of material & color?
        // const {material, color} = this.getItemMaterialAndColorFromMaterialName(quotationItem.materialName)
        var _a, _b, _c, _d;
        const isItemPartA = parseInt(quotationItem.unitCost) > 0;
        let ccost = 0;
        let material = '', colour = '', profile = '';
        if (!isItemPartA) {
            ccost = quotationItem.quantity;
            if (['LCU Channel', 'Alu Plinth'].includes(masterItem.subcategory)) {
                const { x: width } = quotationItem.size;
                ccost = parseFloat(width) / 1000;
            }
            if (masterItem.subcategory === 'Sliding Fitting') {
                const { x: width } = quotationItem.size;
                ccost *= parseFloat(width) / 1000;
            }
            if (quotationItem.brandGoodName === 'u6a71u67dcu811au7ebf') {
                // Alu Plinth quantity is divided by 2.
                // Refer kujiale_sri_lanka.php:899:8
                ccost /= 2;
            }
            ccost /= masterItem.fraction;
            if (masterItem.subcategory !== 'Sliding Fitting') {
                quotationItem.quantity = ccost;
            }
        }
        else {
            profile = quotationItem.brandGoodCode
                ? this.getItemProfile(quotationItem)
                : '';
            const masterMaterial = await this.materialRepository.findOne({
                where: {
                    and: [{ profile: profile }, { color_code: quotationItem.materialName }],
                },
            });
            if (!masterMaterial)
                throw new rest_1.HttpErrors[404](`Master material with profile ${profile} and color code ${quotationItem.materialName} not found for item ${quotationItem.name}`);
            const { z: height, x: width } = quotationItem.size;
            ccost =
                ((parseFloat(width) * parseFloat(height)) / 1000000) *
                    masterMaterial.price;
            material = (_a = masterMaterial.profile) !== null && _a !== void 0 ? _a : '';
            colour = (_b = masterMaterial.color_code) !== null && _b !== void 0 ? _b : '';
        }
        ccost = parseFloat(ccost.toFixed(2));
        const totalItemProcessCost = quotationItem.brandGoodCode
            ? await this.calculateItemTotalProcessCost(quotationItem)
            : 0;
        const totalCost = (totalItemProcessCost + ccost) * masterItem.stdcost;
        const markupRate = (_c = masterItem === null || masterItem === void 0 ? void 0 : masterItem.markuprate) !== null && _c !== void 0 ? _c : 1;
        const nonStdRate = (_d = masterItem === null || masterItem === void 0 ? void 0 : masterItem.nonstdrate) !== null && _d !== void 0 ? _d : 1;
        const rrp = Math.ceil(Number.parseFloat((totalCost * markupRate).toFixed(2)));
        return {
            totalItemProcessCost,
            ccost,
            material,
            colour,
            profile,
            stdCost: masterItem.stdcost,
            markupRate,
            nonStdRate,
            totalCost,
            rrp,
        };
    }
    async calculateItemInstallationCharge(quotationItem, masterItem) {
        const { x: width } = quotationItem.size;
        const installationcharges = masterItem.installationcharges;
        // From remarks
        // 5) Installation Charges , for Category "Kitchen Module" & "Wardrobe Module"&"TV Module“ , system take "W"/1000 (MR) * Rate
        return ['Kitchen Module', 'Wardrobe Module', 'TV Module'].includes(masterItem.category)
            ? (parseFloat(width) / 1000) * installationcharges
            : installationcharges * quotationItem.quantity;
    }
    getItemMaterialAndColorFromMaterialName(materialName) {
        let material = '';
        let color = '';
        if (!materialName)
            return { material, color };
        if (materialName.indexOf(' ') >= 0) {
            material = materialName.split(' ')[0];
            color = materialName.split(' ')[1];
        }
        else {
            material = materialName;
        }
        return { material, color };
    }
    getItemProfile(quotationItem) {
        const processStartWithAW = quotationItem.brandGoodCode
            .trim()
            .split(',')
            .find(itemProcess => itemProcess.substring(0, 2) === 'AW');
        return processStartWithAW !== undefined
            ? processStartWithAW.substring(2, processStartWithAW.length)
            : '';
    }
    async calculateItemTotalProcessCost(quotationItem) {
        const processes = quotationItem.brandGoodCode.slice(0, -1).split(',');
        if (processes)
            console.log('Calculating totalItemProcessCost');
        let totalItemProcessCost = 0;
        for (const process of processes) {
            const processCode = process.substring(0, 2);
            if (processCode.substring(0, 1) !== 'A')
                continue; // All process code need to start with A
            if (processCode === 'AW')
                continue; // AW is only used to define item profile, not process
            console.log(`Process ${process}`);
            const itemProcess = await this.processRepository.findOne({
                where: { systemCode: processCode },
            });
            if (!itemProcess)
                throw new rest_1.HttpErrors[404](`Process ${processCode} not found for ${quotationItem.name}`);
            const processVal = process.substring(2, process.length);
            const { x: width, y: depth, z: height } = quotationItem.size;
            totalItemProcessCost += this.calculateItemProcessCost(itemProcess, parseFloat(processVal), parseFloat(width), parseFloat(depth), parseFloat(height));
        }
        totalItemProcessCost = parseFloat(totalItemProcessCost.toFixed(2));
        console.log(`totalItemProcessCost: ${totalItemProcessCost}`);
        return totalItemProcessCost;
    }
    calculateItemProcessCost(itemProcess, processVal, width, depth, height) {
        const { rate: processRate, uom: processUOM } = itemProcess;
        if (!processRate && !processUOM)
            return 0;
        console.log(`UOM: ${processUOM}`);
        if (processUOM === 'M2') {
            const val = parseFloat(((width * height) / 1000000).toFixed(4));
            const processCost = processVal * processRate * val;
            console.log(`${processVal} * ${processRate} * ${val} = ${processCost}`);
            return processCost;
        }
        if (processUOM === 'M3') {
            const val = parseFloat(((width * depth * height) / 1000000000).toFixed(4));
            const processCost = processVal * processRate * val;
            console.log(`${processVal} * ${processRate} * ${val} = ${processCost}`);
            return processCost;
        }
        const processCost = processVal * processRate;
        console.log(`${processVal} * ${processRate} = ${processCost}\n`);
        return processCost;
    }
    extractNeededAttributesOnly(quotationItem) {
        const { id, parentId, name, remark, obsMaterialIds, topId, obsBrandGoodId, productNumber, brandGoodCode, brandGoodName, description, size, dimensions, brandGoodDescription, customCode, materialBrandGoodId, materialBrandGoodCode, materialName, materialCustomCode, quotationUnit, quantity, unitPrice, unitCost, nonStandardCoef, additionalFee, price, quotationRate, hided, billOutput, obsAccountId, baseTexture, } = quotationItem;
        return {
            id,
            parentId,
            name,
            remark,
            obsMaterialIds,
            topId,
            obsBrandGoodId,
            productNumber,
            brandGoodCode,
            brandGoodName,
            description,
            size,
            dimensions,
            brandGoodDescription,
            customCode,
            materialBrandGoodId,
            materialBrandGoodCode,
            materialName,
            materialCustomCode,
            quotationUnit,
            quantity,
            unitPrice,
            unitCost,
            nonStandardCoef,
            additionalFee,
            price,
            quotationRate,
            hided,
            billOutput,
            obsAccountId,
            baseTexture,
        };
    }
    async createOrUpdateDetailedQuotationFromKujiale(isCreateMode = true, drawingId, drawingUuid, leadId, drawingReferenceName) {
        // `isCreateMode` boolean checks on whether this drawing should be created, or is an existing drawing that should be updated from Kujiale (DQ Kujiale request for update)
        // `drawingUuid` is a drawing's ID, used for identifying which drawing to be updated in update mode for DQ, not used when creating a new design
        var _a, _b, _c, _d;
        const { user: userUuid, appUID: appUID } = await this.getCurrentUser();
        console.log(userUuid);
        const timestamp = new Date().getTime();
        const sign = process.env.KUJIALE_APPSECRET +
            process.env.KUJIALE_APPKEY +
            appUID +
            timestamp;
        const signWithNoAppId = process.env.KUJIALE_APPSECRET + process.env.KUJIALE_APPKEY + timestamp;
        const quotationDetails = await this.getDrawingQuotationDetailsFromKujiale(appUID, timestamp, sign, signWithNoAppId, drawingId);
        let design;
        if (!isCreateMode) {
            /* If updating, delete details of the previous drawing
              This can be done by trying to find if there is a design created previously
            */
            if (!drawingUuid) {
                throw new rest_1.HttpErrors[400](`Attempted to update a design but design UUID is not provided, provided design UUID: ${drawingUuid}`);
            }
            design = await this.designRepository.findOne({
                where: {
                    drawingNumber: drawingId,
                    uuid: drawingUuid,
                    leadId: leadId
                }
            });
            if (!design) {
                throw new rest_1.HttpErrors[400](`Attempted to update a design that does not exist with drawingNumber: ${drawingId}, and drawing UUID: ${drawingUuid}`);
            }
            // Delete all quotation details for the current design, recreate later
            await this.designRepository.quotationDetails(drawingUuid).delete();
        }
        else {
            design = await this.leadRepository.designs(leadId).create({
                drawingNumber: drawingId,
                leadId: leadId,
                referenceName: drawingReferenceName,
            });
        }
        const leadBranch = await this.leadRepository.branch(leadId);
        const isLeadBranchTypeDealer = leadBranch.type === 'dealer';
        let totalInstallationCharges = 0;
        const materials = [];
        for (const [index, q] of quotationDetails.quotationItems.entries()) {
            const quotationItem = this.extractNeededAttributesOnly(q);
            // Handle Chinese characters
            if (quotationItem.brandGoodName === '橱柜脚线')
                quotationItem.brandGoodName = 'u6a71u67dcu811au7ebf';
            if (quotationItem.brandGoodName === '橱柜台面') {
                // FIXME: This one although already changed the brandGoodName to unicode
                // bytes as string, still have collation error.
                // Mysql error: (ER_CANT_AGGREGATE_2COLLATIONS)
                // continue;  // TODO: This if block was skipped with continue, currently remporarly disabling this continue block
                quotationItem.brandGoodName = 'u6a71u67dcu53f0u9762';
            }
            const masterItem = await this.findMasterItem(quotationItem);
            if (!masterItem)
                continue; // Already handled missing items on /calculate
            const { rrp: itemRRP } = await this.calculateItemRRP(quotationItem, masterItem);
            const totalDealerPrice = itemRRP * ((_a = masterItem === null || masterItem === void 0 ? void 0 : masterItem.dealerprice) !== null && _a !== void 0 ? _a : 1);
            const itemInstallationCharge = await this.calculateItemInstallationCharge(quotationItem, masterItem);
            // if (isLeadBranchTypeDealer) itemRRP += totalDealerPrice;
            // ^^ TODO: Removing this line of code for the time being, as unsure on why dealer branch will add the dealer price again
            await this.designRepository.quotationDetails(design.uuid).create({
                ...quotationItem,
                kujialeSequenceId: index + 1,
                recommendedRetailPrice: itemRRP,
                totalDealerPrice,
                itemPart: masterItem.part,
                category: masterItem.category,
                subcategory: masterItem.subcategory,
            });
            const profile = quotationItem.brandGoodCode ? this.getItemProfile(quotationItem) : '';
            const masterMaterial = await this.materialRepository.findOne({
                where: {
                    and: [{ profile }, { color_code: quotationItem.materialName }],
                },
            });
            if (masterMaterial && masterMaterial.showInCrm === 'Y') {
                materials.push(`${masterMaterial.color_code} ${masterMaterial.profile}`);
            }
            totalInstallationCharges += itemInstallationCharge;
            totalInstallationCharges = Math.ceil(totalInstallationCharges);
        }
        const topItems = await this.designRepository
            .quotationDetails(design.uuid)
            .find({
            where: { topId: '' },
        });
        let totalPriceDrawingItems = 0;
        for (const { brandGoodName, uuid, id: topItemId } of topItems) {
            const parentMasterItem = await this.itemListRepository.findOne({
                where: { name: brandGoodName },
            });
            if (!parentMasterItem)
                continue; // Will not be null
            const childItems = await this.designRepository
                .quotationDetails(design.uuid)
                .find({
                where: {
                    and: [
                        { topId: topItemId },
                        // {itemPart: 'A'},  // For now, we allow any item part as long as it is the direct child of the parent item
                        { subcategory: { neq: 'Basket' } },
                    ],
                },
                fields: { recommendedRetailPrice: true },
            });
            const childrenTotalRrp = childItems
                .map(item => item.recommendedRetailPrice)
                .reduce((acc, rrp) => acc + Math.ceil(rrp), 0); // An addition would be to ceil the price of each item
            let newParentRrp = childrenTotalRrp * parentMasterItem.markuprate; //  * parseFloat(parentMasterItem.nonstdrate!)  // TODO: Study whether we need to multiply by nonstdrate here
            if ((((_b = parentMasterItem === null || parentMasterItem === void 0 ? void 0 : parentMasterItem.puom) === null || _b === void 0 ? void 0 : _b.trim().toLowerCase()) === 'unit') && (brandGoodName === null || brandGoodName === void 0 ? void 0 : brandGoodName.toUpperCase().startsWith('S'))) {
                /* Only for special items with these conditions, use nonstdrate:
                - puom is unit
                - brandgoodname (description) starts with S
                - model starts with S
                */
                newParentRrp = newParentRrp * ((_c = parentMasterItem === null || parentMasterItem === void 0 ? void 0 : parentMasterItem.nonstdrate) !== null && _c !== void 0 ? _c : 1);
            }
            newParentRrp = Math.round(newParentRrp);
            const newParentDealerPrice = newParentRrp * ((_d = parentMasterItem === null || parentMasterItem === void 0 ? void 0 : parentMasterItem.dealerprice) !== null && _d !== void 0 ? _d : 1);
            await this.quotationDetailsRepository.updateById(uuid, {
                recommendedRetailPrice: newParentRrp,
                totalDealerPrice: newParentDealerPrice
            });
            totalPriceDrawingItems += newParentRrp;
        }
        const designMaterials = new Array(...new Set(materials)).join(' & ');
        if (isCreateMode) {
            // If creating a new Kujiale design with new detailed quotation, use default values for totals
            await this.designRepository.updateById(design.uuid, {
                ...design,
                state: design_state_enum_1.DesignState.DetailedQuotation,
                totalInstallationCharges,
                totalPriceDrawingItems,
                discountedTotalPriceDrawingItems: totalPriceDrawingItems,
                totalPrice: totalPriceDrawingItems,
                discountedTotalPrice: totalPriceDrawingItems,
                materials: designMaterials,
            });
        }
        else {
            // If updating an existing Kujiale design with new detailed quotation, recalculate total values using existing totals
            const discountedTotalPriceDrawingItems = totalPriceDrawingItems * ((100 - design.masterItemDiscount) / 100);
            await this.designRepository.updateById(design.uuid, {
                ...design,
                state: design_state_enum_1.DesignState.DetailedQuotation,
                totalInstallationCharges,
                totalPriceDrawingItems,
                discountedTotalPriceDrawingItems: discountedTotalPriceDrawingItems,
                totalPrice: design.totalPrice - design.totalPriceDrawingItems + totalPriceDrawingItems,
                discountedTotalPrice: design.discountedTotalPrice - design.discountedTotalPriceDrawingItems + discountedTotalPriceDrawingItems,
                materials: designMaterials,
            });
            // For `totalPrice` and `discountedTotalPrice`, deduce the previous drawing total prices then add back the current total prices (and discounted variants)
        }
        return this.designRepository.findById(design.uuid, {
            include: [{ relation: 'quotationDetails' }],
        });
    }
};
tslib_1.__decorate([
    rest_1.get('/kujiale/token', {
        responses: {
            '200': {
                description: 'Kujiale login to retrieve access token',
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], KujialeController.prototype, "getKujialeAccessToken", null);
tslib_1.__decorate([
    rest_1.post('/kujiale/calculate', {
        responses: {
            '200': {
                description: 'Created task',
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    tslib_1.__param(0, rest_1.requestBody({
        required: true,
        content: {
            'application/json': { schema: schema_1.CreateKujialeTaskSchema },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], KujialeController.prototype, "kujialeDrawingCalculate", null);
tslib_1.__decorate([
    rest_1.post('/kujiale/detailedQuotation', {
        responses: {
            '200': {
                description: 'Created detailed quotation for drawing',
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    tslib_1.__param(0, rest_1.requestBody({
        required: true,
        content: {
            'application/json': { schema: schema_1.CreateKujialeTaskSchema },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], KujialeController.prototype, "kujialeDrawingCreateDetailedQuotation", null);
tslib_1.__decorate([
    rest_1.patch('/kujiale/detailedQuotation', {
        responses: {
            '200': {
                description: 'Updated detailed quotation for drawing',
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    tslib_1.__param(0, rest_1.requestBody({
        required: true,
        content: {
            'application/json': { schema: schema_1.UpdateKujialeTaskSchema },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], KujialeController.prototype, "kujialeDrawingUpdateDetailedQuotation", null);
KujialeController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.LeadRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.CalculationLogRepository)),
    tslib_1.__param(2, repository_1.repository(repositories_1.RoleRepository)),
    tslib_1.__param(3, repository_1.repository(repositories_1.QuotationDetailsRepository)),
    tslib_1.__param(4, repository_1.repository(repositories_1.MissingItemRepository)),
    tslib_1.__param(5, repository_1.repository(repositories_1.DesignRepository)),
    tslib_1.__param(6, repository_1.repository(repositories_1.OrderInfoRepository)),
    tslib_1.__param(7, repository_1.repository(repositories_1.BrandGoodsRepository)),
    tslib_1.__param(8, repository_1.repository(repositories_1.ItemListRepository)),
    tslib_1.__param(9, repository_1.repository(repositories_1.MaterialRepository)),
    tslib_1.__param(10, repository_1.repository(repositories_1.ProcessRepository)),
    tslib_1.__param(11, core_1.inject('services.Kujiale')),
    tslib_1.__param(12, core_1.inject.getter(authentication_1.AuthenticationBindings.CURRENT_USER)),
    tslib_1.__param(13, core_1.inject('services.EmailService')),
    tslib_1.__metadata("design:paramtypes", [repositories_1.LeadRepository,
        repositories_1.CalculationLogRepository,
        repositories_1.RoleRepository,
        repositories_1.QuotationDetailsRepository,
        repositories_1.MissingItemRepository,
        repositories_1.DesignRepository,
        repositories_1.OrderInfoRepository,
        repositories_1.BrandGoodsRepository,
        repositories_1.ItemListRepository,
        repositories_1.MaterialRepository,
        repositories_1.ProcessRepository, Object, Function, services_1.EmailService])
], KujialeController);
exports.KujialeController = KujialeController;
//# sourceMappingURL=kujiale.controller.js.map