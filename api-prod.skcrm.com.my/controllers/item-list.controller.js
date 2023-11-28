"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemListController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const xlsx_1 = tslib_1.__importDefault(require("xlsx"));
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const services_1 = require("../services");
let ItemListController = class ItemListController {
    constructor(itemListRepository, multerFileService) {
        this.itemListRepository = itemListRepository;
        this.multerFileService = multerFileService;
    }
    async create(itemList) {
        return this.itemListRepository.create(itemList);
    }
    async count(where) {
        return this.itemListRepository.count(where);
    }
    async find(filter) {
        return this.itemListRepository.find(filter);
    }
    async updateAll(itemList, where) {
        return this.itemListRepository.updateAll(itemList, where);
    }
    async findById(id, filter) {
        return this.itemListRepository.findById(id, filter);
    }
    async updateById(id, itemList) {
        await this.itemListRepository.updateById(id, itemList);
    }
    async replaceById(id, itemList) {
        await this.itemListRepository.replaceById(id, itemList);
    }
    async deleteById(id) {
        await this.itemListRepository.deleteById(id);
    }
    async uploads(request, response) {
        var _a, _b, _c;
        const { file } = await this.multerFileService.getFiles(request, response);
        const fileType = file.mimetype;
        const defaultUploadMode = 'update'; // By default, update item list, instead of resetting item list
        // The two modes available for item list upload is `update` and `reset`
        const uploadModeIsUpdate = ((_c = (_b = (_a = request === null || request === void 0 ? void 0 : request.body) === null || _a === void 0 ? void 0 : _a.uploadMode) === null || _b === void 0 ? void 0 : _b.toLowerCase()) !== null && _c !== void 0 ? _c : defaultUploadMode) === 'update';
        // console.log(request.body.uploadMode, request?.body?.uploadMode?.toLowerCase() ?? defaultUploadMode, uploadModeIsUpdate);  // Checking whether the upload mode is passed in request body
        // console.log(`Filetype of uploaded file: ${fileType}`);
        const supportedFileTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/wps-office.xlsx'];
        if (!supportedFileTypes.includes(fileType)) {
            // Define a list of supported file types: currently supporting Excel and WPS spreadsheet
            throw new rest_1.HttpErrors.UnprocessableEntity('Invalid file type for item list Excel spreadsheet');
        }
        const wb = xlsx_1.default.read(file.buffer, { type: 'buffer' });
        const firstSheet = wb.Sheets[wb.SheetNames[0]];
        const jsonSheet = xlsx_1.default.utils.sheet_to_json(firstSheet, {
            defval: '',
        });
        console.log('Sheet names in workbook: ', JSON.stringify(wb.SheetNames)); // Printing all sheetnames for verification
        const updatePromises = [];
        const createModels = [];
        // const createPromises = [];
        if (!uploadModeIsUpdate) {
            // If upload mode is reset, delete all items in item list
            await this.itemListRepository.deleteAll(); // Delete all item records first, before inserting from jsonSheet
        }
        for (const data of jsonSheet) {
            const model = new models_1.ItemList();
            let trimmedKey;
            for (const key in data) {
                trimmedKey = key.trim().toLowerCase();
                switch (trimmedKey) {
                    case 'category':
                        model.category = data[key];
                        break;
                    case 'subcategory':
                        model.subcategory = data[key];
                        break;
                    case 'name':
                        model.name = data[key];
                        break;
                    case 'itemcode':
                        model.itemcode = data[key];
                        break;
                    case 'virture':
                        model.virture = data[key];
                        break;
                    case 'brand':
                        model.brand = data[key];
                        break;
                    case 'material':
                        model.material = data[key];
                        break;
                    case 'colour':
                        model.colour = data[key];
                        break;
                    case 'profile':
                        model.profile = data[key];
                        break;
                    case 'puom':
                        model.puom = data[key];
                        break;
                    case 'suom':
                        model.suom = data[key];
                        break;
                    case 'fraction':
                        model.fraction = Number(data[key]);
                        break;
                    case 'std cost':
                        model.stdcost = Number(data[key]);
                        break;
                    case 'markuprate':
                        model.markuprate = Number(data[key]);
                        break;
                    case 'part':
                        model.part = data[key];
                        break;
                    case 'nonstdrate':
                        model.nonstdrate = Number(data[key]);
                        break;
                    case 'installationcharges':
                        model.installationcharges = Number(data[key]);
                        break;
                    case 'dealer price':
                        model.dealerprice = Number(data[key]);
                        break;
                    case 'active':
                        model.active = data[key];
                        break;
                    case 'oversea':
                        model.oversea = data[key];
                        break;
                    case 'oversea dealer price (usd)':
                        model.overseadealerprice = Number(data[key]);
                        break;
                }
            }
            // console.log(JSON.stringify(model));
            /*
              After reading a record of item list from excel sheet and creating an item model,
              will need to check on whether the upload mode is `update` or `reset`.
      
              `update` mode requires finding item list repository to check if the current item exists and needs updating; if item does not exist then will be created.
              `reset`  mode does not require finding whether the item exists; records will be created only.
            */
            if (uploadModeIsUpdate) {
                // `update` mode: check if item exists then update, else create
                const item = await this.itemListRepository.findOne({
                    where: { name: model.name },
                });
                // console.log(`Item: ${JSON.stringify(item)}`);
                if (item) {
                    // console.log('Existing item, update for now');
                    updatePromises.push(this.itemListRepository.updateById(item.uuid, model));
                    /* TODO: A potential enhancement would be to check if all attributes of the item model in the new spreadsheet are the same as in db
                            This situation indicates that there is no need to update this specific item record, and will not need to be pushed to `updatePromises`
                    */
                    // else createPromises.push(this.itemListRepository.create(model));
                }
                else {
                    // createPromises.push(this.itemListRepository.create(model));
                    createModels.push(model);
                }
            }
            else {
                // `reset` mode: does not require checking if item exists, hence only creating
                createModels.push(model);
            }
            /* TODO: Refactor `createModels` logic: in `update` mode, if item exists `continue` after update promise is pushed
                      Remove else blocks above for only `createModels.push(model);`, and uncomment the `createModels.push(model);` line below
            */
            // createModels.push(model);
        }
        await Promise.all(updatePromises);
        // await Promise.all(createPromises);
        await this.itemListRepository.createAll(createModels);
        // return {created: createPromises.length, updated: updatePromises.length};
        return { created: createModels.length, updated: updatePromises.length };
    }
};
tslib_1.__decorate([
    rest_1.post('/item-lists', {
        responses: {
            '200': {
                description: 'ItemList model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.ItemList) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.ItemList, {
                    title: 'NewItemList',
                    exclude: ['uuid'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ItemListController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/item-lists/count', {
        responses: {
            '200': {
                description: 'ItemList model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.ItemList)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ItemListController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/item-lists', {
        responses: {
            '200': {
                description: 'Array of ItemList model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.ItemList, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.ItemList)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ItemListController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/item-lists', {
        responses: {
            '200': {
                description: 'ItemList PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.ItemList, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.ItemList)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.ItemList, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ItemListController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/item-lists/{id}', {
        responses: {
            '200': {
                description: 'ItemList model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.ItemList, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.ItemList, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ItemListController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/item-lists/{id}', {
        responses: {
            '204': {
                description: 'ItemList PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.ItemList, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.ItemList]),
    tslib_1.__metadata("design:returntype", Promise)
], ItemListController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/item-lists/{id}', {
        responses: {
            '204': {
                description: 'ItemList PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.ItemList]),
    tslib_1.__metadata("design:returntype", Promise)
], ItemListController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/item-lists/{id}', {
        responses: {
            '204': {
                description: 'ItemList DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ItemListController.prototype, "deleteById", null);
tslib_1.__decorate([
    rest_1.post(`/item-lists/batch/upload/xlsx`, {
        responses: {
            '200': {
                description: 'Upload a Files model instances into Container',
                content: { 'application/json': { schema: { type: 'object' } } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody.file()),
    tslib_1.__param(1, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ItemListController.prototype, "uploads", null);
ItemListController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.ItemListRepository)),
    tslib_1.__param(1, core_1.inject('services.MulterFileService')),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ItemListRepository,
        services_1.MulterFileService])
], ItemListController);
exports.ItemListController = ItemListController;
//# sourceMappingURL=item-list.controller.js.map