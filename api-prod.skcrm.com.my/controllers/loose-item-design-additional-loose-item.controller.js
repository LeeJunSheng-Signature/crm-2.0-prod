"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LooseItemDesignAdditionalLooseItemController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let LooseItemDesignAdditionalLooseItemController = class LooseItemDesignAdditionalLooseItemController {
    constructor(looseItemRepository) {
        this.looseItemRepository = looseItemRepository;
    }
    async find(id, filter) {
        return this.looseItemRepository.designAdditionalLooseItems(id).find(filter);
    }
    async create(id, designAdditionalLooseItem) {
        return this.looseItemRepository.designAdditionalLooseItems(id).create(designAdditionalLooseItem);
    }
    async patch(id, designAdditionalLooseItem, where) {
        return this.looseItemRepository.designAdditionalLooseItems(id).patch(designAdditionalLooseItem, where);
    }
    async delete(id, where) {
        return this.looseItemRepository.designAdditionalLooseItems(id).delete(where);
    }
};
tslib_1.__decorate([
    rest_1.get('/loose-items/{id}/design-additional-loose-items', {
        responses: {
            '200': {
                description: 'Array of LooseItem has many DesignAdditionalLooseItem',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.DesignAdditionalLooseItem) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('filter')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LooseItemDesignAdditionalLooseItemController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.post('/loose-items/{id}/design-additional-loose-items', {
        responses: {
            '200': {
                description: 'LooseItem model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.DesignAdditionalLooseItem) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.DesignAdditionalLooseItem, {
                    title: 'NewDesignAdditionalLooseItemInLooseItem',
                    exclude: ['uuid'],
                    optional: ['looseItemId']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LooseItemDesignAdditionalLooseItemController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.patch('/loose-items/{id}/design-additional-loose-items', {
        responses: {
            '200': {
                description: 'LooseItem.DesignAdditionalLooseItem PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
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
    tslib_1.__param(2, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.DesignAdditionalLooseItem))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LooseItemDesignAdditionalLooseItemController.prototype, "patch", null);
tslib_1.__decorate([
    rest_1.del('/loose-items/{id}/design-additional-loose-items', {
        responses: {
            '200': {
                description: 'LooseItem.DesignAdditionalLooseItem DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.DesignAdditionalLooseItem))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LooseItemDesignAdditionalLooseItemController.prototype, "delete", null);
LooseItemDesignAdditionalLooseItemController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.LooseItemRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.LooseItemRepository])
], LooseItemDesignAdditionalLooseItemController);
exports.LooseItemDesignAdditionalLooseItemController = LooseItemDesignAdditionalLooseItemController;
//# sourceMappingURL=loose-item-design-additional-loose-item.controller.js.map