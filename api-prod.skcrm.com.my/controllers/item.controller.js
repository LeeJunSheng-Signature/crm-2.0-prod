"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ItemController = class ItemController {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    async create(item) {
        return this.itemRepository.create(item);
    }
    async count(where) {
        return this.itemRepository.count(where);
    }
    async find(filter) {
        return this.itemRepository.find(filter);
    }
    async updateAll(item, where) {
        return this.itemRepository.updateAll(item, where);
    }
    async findById(id, filter) {
        return this.itemRepository.findById(id, filter);
    }
    async updateById(id, item) {
        await this.itemRepository.updateById(id, item);
    }
    async replaceById(id, item) {
        await this.itemRepository.replaceById(id, item);
    }
    async deleteById(id) {
        await this.itemRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/items', {
        responses: {
            '200': {
                description: 'Item model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Item) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Item, {
                    title: 'NewItem',
                    exclude: ['uuid'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ItemController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/items/count', {
        responses: {
            '200': {
                description: 'Item model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Item)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ItemController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/items', {
        responses: {
            '200': {
                description: 'Array of Item model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.Item, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Item)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ItemController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/items', {
        responses: {
            '200': {
                description: 'Item PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Item, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Item)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Item, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ItemController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/items/{id}', {
        responses: {
            '200': {
                description: 'Item model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Item, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Item, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ItemController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/items/{id}', {
        responses: {
            '204': {
                description: 'Item PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Item, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Item]),
    tslib_1.__metadata("design:returntype", Promise)
], ItemController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/items/{id}', {
        responses: {
            '204': {
                description: 'Item PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Item]),
    tslib_1.__metadata("design:returntype", Promise)
], ItemController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/items/{id}', {
        responses: {
            '204': {
                description: 'Item DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ItemController.prototype, "deleteById", null);
ItemController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.ItemRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ItemRepository])
], ItemController);
exports.ItemController = ItemController;
//# sourceMappingURL=item.controller.js.map