"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignAdditionalLooseItemController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let DesignAdditionalLooseItemController = class DesignAdditionalLooseItemController {
    constructor(designAdditionalLooseItemRepository) {
        this.designAdditionalLooseItemRepository = designAdditionalLooseItemRepository;
    }
    async create(designAdditionalLooseItem) {
        return this.designAdditionalLooseItemRepository.create(designAdditionalLooseItem);
    }
    async count(where) {
        return this.designAdditionalLooseItemRepository.count(where);
    }
    async find(filter) {
        return this.designAdditionalLooseItemRepository.find(filter);
    }
    async updateAll(designAdditionalLooseItem, where) {
        return this.designAdditionalLooseItemRepository.updateAll(designAdditionalLooseItem, where);
    }
    async findById(id, filter) {
        return this.designAdditionalLooseItemRepository.findById(id, filter);
    }
    async updateById(id, designAdditionalLooseItem) {
        await this.designAdditionalLooseItemRepository.updateById(id, designAdditionalLooseItem);
    }
    async replaceById(id, designAdditionalLooseItem) {
        await this.designAdditionalLooseItemRepository.replaceById(id, designAdditionalLooseItem);
    }
    async deleteById(id) {
        await this.designAdditionalLooseItemRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/design-additional-loose-items', {
        responses: {
            '200': {
                description: 'DesignAdditionalLooseItem model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.DesignAdditionalLooseItem) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.DesignAdditionalLooseItem, {
                    title: 'NewDesignAdditionalLooseItem',
                    exclude: ['uuid'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignAdditionalLooseItemController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/design-additional-loose-items/count', {
        responses: {
            '200': {
                description: 'DesignAdditionalLooseItem model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.DesignAdditionalLooseItem)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignAdditionalLooseItemController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/design-additional-loose-items', {
        responses: {
            '200': {
                description: 'Array of DesignAdditionalLooseItem model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.DesignAdditionalLooseItem, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.DesignAdditionalLooseItem)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignAdditionalLooseItemController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/design-additional-loose-items', {
        responses: {
            '200': {
                description: 'DesignAdditionalLooseItem PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.DesignAdditionalLooseItem, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.DesignAdditionalLooseItem)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.DesignAdditionalLooseItem, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignAdditionalLooseItemController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/design-additional-loose-items/{id}', {
        responses: {
            '200': {
                description: 'DesignAdditionalLooseItem model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.DesignAdditionalLooseItem, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.DesignAdditionalLooseItem, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignAdditionalLooseItemController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/design-additional-loose-items/{id}', {
        responses: {
            '204': {
                description: 'DesignAdditionalLooseItem PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.DesignAdditionalLooseItem, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.DesignAdditionalLooseItem]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignAdditionalLooseItemController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/design-additional-loose-items/{id}', {
        responses: {
            '204': {
                description: 'DesignAdditionalLooseItem PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.DesignAdditionalLooseItem]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignAdditionalLooseItemController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/design-additional-loose-items/{id}', {
        responses: {
            '204': {
                description: 'DesignAdditionalLooseItem DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignAdditionalLooseItemController.prototype, "deleteById", null);
DesignAdditionalLooseItemController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.DesignAdditionalLooseItemRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.DesignAdditionalLooseItemRepository])
], DesignAdditionalLooseItemController);
exports.DesignAdditionalLooseItemController = DesignAdditionalLooseItemController;
//# sourceMappingURL=design-additional-loose-item.controller.js.map