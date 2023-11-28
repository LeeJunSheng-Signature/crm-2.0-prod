"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignAdditionalItemController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let DesignAdditionalItemController = class DesignAdditionalItemController {
    constructor(designAdditionalItemRepository) {
        this.designAdditionalItemRepository = designAdditionalItemRepository;
    }
    async create(designAdditionalItem) {
        return this.designAdditionalItemRepository.create(designAdditionalItem);
    }
    async count(where) {
        return this.designAdditionalItemRepository.count(where);
    }
    async find(filter) {
        return this.designAdditionalItemRepository.find(filter);
    }
    async updateAll(designAdditionalItem, where) {
        return this.designAdditionalItemRepository.updateAll(designAdditionalItem, where);
    }
    async findById(id, filter) {
        return this.designAdditionalItemRepository.findById(id, filter);
    }
    async updateById(id, designAdditionalItem) {
        await this.designAdditionalItemRepository.updateById(id, designAdditionalItem);
    }
    async replaceById(id, designAdditionalItem) {
        await this.designAdditionalItemRepository.replaceById(id, designAdditionalItem);
    }
    async deleteById(id) {
        await this.designAdditionalItemRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/design-additional-items', {
        responses: {
            '200': {
                description: 'DesignAdditionalItem model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.DesignAdditionalItem) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.DesignAdditionalItem, {
                    title: 'NewDesignAdditionalItem',
                    exclude: ['uuid'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignAdditionalItemController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/design-additional-items/count', {
        responses: {
            '200': {
                description: 'DesignAdditionalItem model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.DesignAdditionalItem)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignAdditionalItemController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/design-additional-items', {
        responses: {
            '200': {
                description: 'Array of DesignAdditionalItem model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.DesignAdditionalItem, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.DesignAdditionalItem)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignAdditionalItemController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/design-additional-items', {
        responses: {
            '200': {
                description: 'DesignAdditionalItem PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.DesignAdditionalItem, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.DesignAdditionalItem)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.DesignAdditionalItem, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignAdditionalItemController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/design-additional-items/{id}', {
        responses: {
            '200': {
                description: 'DesignAdditionalItem model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.DesignAdditionalItem, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.DesignAdditionalItem, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignAdditionalItemController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/design-additional-items/{id}', {
        responses: {
            '204': {
                description: 'DesignAdditionalItem PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.DesignAdditionalItem, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.DesignAdditionalItem]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignAdditionalItemController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/design-additional-items/{id}', {
        responses: {
            '204': {
                description: 'DesignAdditionalItem PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.DesignAdditionalItem]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignAdditionalItemController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/design-additional-items/{id}', {
        responses: {
            '204': {
                description: 'DesignAdditionalItem DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignAdditionalItemController.prototype, "deleteById", null);
DesignAdditionalItemController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.DesignAdditionalItemRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.DesignAdditionalItemRepository])
], DesignAdditionalItemController);
exports.DesignAdditionalItemController = DesignAdditionalItemController;
//# sourceMappingURL=design-additional-item.controller.js.map