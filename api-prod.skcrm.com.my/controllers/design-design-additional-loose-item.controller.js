"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignDesignAdditionalLooseItemController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let DesignDesignAdditionalLooseItemController = class DesignDesignAdditionalLooseItemController {
    constructor(designRepository) {
        this.designRepository = designRepository;
    }
    async find(id, filter) {
        return this.designRepository.designAdditionalLooseItems(id).find(filter);
    }
    async create(id, designAdditionalLooseItem) {
        return this.designRepository.designAdditionalLooseItems(id).create(designAdditionalLooseItem);
    }
    async patch(id, designAdditionalLooseItem, where) {
        return this.designRepository.designAdditionalLooseItems(id).patch(designAdditionalLooseItem, where);
    }
    async delete(id, where) {
        return this.designRepository.designAdditionalLooseItems(id).delete(where);
    }
};
tslib_1.__decorate([
    rest_1.get('/designs/{id}/design-additional-loose-items', {
        responses: {
            '200': {
                description: 'Array of Design has many DesignAdditionalLooseItem',
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
], DesignDesignAdditionalLooseItemController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.post('/designs/{id}/design-additional-loose-items', {
        responses: {
            '200': {
                description: 'Design model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.DesignAdditionalLooseItem) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.DesignAdditionalLooseItem, {
                    title: 'NewDesignAdditionalLooseItemInDesign',
                    exclude: ['uuid'],
                    optional: ['designId']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignDesignAdditionalLooseItemController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.patch('/designs/{id}/design-additional-loose-items', {
        responses: {
            '200': {
                description: 'Design.DesignAdditionalLooseItem PATCH success count',
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
], DesignDesignAdditionalLooseItemController.prototype, "patch", null);
tslib_1.__decorate([
    rest_1.del('/designs/{id}/design-additional-loose-items', {
        responses: {
            '200': {
                description: 'Design.DesignAdditionalLooseItem DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.DesignAdditionalLooseItem))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignDesignAdditionalLooseItemController.prototype, "delete", null);
DesignDesignAdditionalLooseItemController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.DesignRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.DesignRepository])
], DesignDesignAdditionalLooseItemController);
exports.DesignDesignAdditionalLooseItemController = DesignDesignAdditionalLooseItemController;
//# sourceMappingURL=design-design-additional-loose-item.controller.js.map