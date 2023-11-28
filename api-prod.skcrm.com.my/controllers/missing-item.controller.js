"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingItemController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let MissingItemController = class MissingItemController {
    constructor(missingItemRepository) {
        this.missingItemRepository = missingItemRepository;
    }
    async create(missingItem) {
        return this.missingItemRepository.create(missingItem);
    }
    async count(where) {
        return this.missingItemRepository.count(where);
    }
    async find(filter) {
        return this.missingItemRepository.find(filter);
    }
    async updateAll(missingItem, where) {
        return this.missingItemRepository.updateAll(missingItem, where);
    }
    async findById(id, filter) {
        return this.missingItemRepository.findById(id, filter);
    }
    async updateById(id, missingItem) {
        await this.missingItemRepository.updateById(id, missingItem);
    }
    async replaceById(id, missingItem) {
        await this.missingItemRepository.replaceById(id, missingItem);
    }
    async deleteById(id) {
        await this.missingItemRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/missing-items', {
        responses: {
            '200': {
                description: 'MissingItem model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.MissingItem) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.MissingItem, {
                    title: 'NewMissingItem',
                    exclude: ['uuid'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MissingItemController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/missing-items/count', {
        responses: {
            '200': {
                description: 'MissingItem model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.MissingItem)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MissingItemController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/missing-items', {
        responses: {
            '200': {
                description: 'Array of MissingItem model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.MissingItem, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.MissingItem)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MissingItemController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/missing-items', {
        responses: {
            '200': {
                description: 'MissingItem PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.MissingItem, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.MissingItem)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.MissingItem, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MissingItemController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/missing-items/{id}', {
        responses: {
            '200': {
                description: 'MissingItem model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.MissingItem, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.MissingItem, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MissingItemController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/missing-items/{id}', {
        responses: {
            '204': {
                description: 'MissingItem PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.MissingItem, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.MissingItem]),
    tslib_1.__metadata("design:returntype", Promise)
], MissingItemController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/missing-items/{id}', {
        responses: {
            '204': {
                description: 'MissingItem PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.MissingItem]),
    tslib_1.__metadata("design:returntype", Promise)
], MissingItemController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/missing-items/{id}', {
        responses: {
            '204': {
                description: 'MissingItem DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], MissingItemController.prototype, "deleteById", null);
MissingItemController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.MissingItemRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.MissingItemRepository])
], MissingItemController);
exports.MissingItemController = MissingItemController;
//# sourceMappingURL=missing-item.controller.js.map