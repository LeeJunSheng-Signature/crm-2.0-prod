"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignDesignOtherItemController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let DesignDesignOtherItemController = class DesignDesignOtherItemController {
    constructor(designRepository) {
        this.designRepository = designRepository;
    }
    async find(id, filter) {
        return this.designRepository.designOtherItems(id).find(filter);
    }
    async create(id, designOtherItem) {
        return this.designRepository.designOtherItems(id).create(designOtherItem);
    }
    async patch(id, designOtherItem, where) {
        return this.designRepository.designOtherItems(id).patch(designOtherItem, where);
    }
    async delete(id, where) {
        return this.designRepository.designOtherItems(id).delete(where);
    }
};
tslib_1.__decorate([
    rest_1.get('/designs/{id}/design-other-items', {
        responses: {
            '200': {
                description: 'Array of Design has many DesignOtherItem',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.DesignOtherItem) },
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
], DesignDesignOtherItemController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.post('/designs/{id}/design-other-items', {
        responses: {
            '200': {
                description: 'Design model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.DesignOtherItem) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.DesignOtherItem, {
                    title: 'NewDesignOtherItemInDesign',
                    exclude: ['uuid'],
                    optional: ['designId']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignDesignOtherItemController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.patch('/designs/{id}/design-other-items', {
        responses: {
            '200': {
                description: 'Design.DesignOtherItem PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.DesignOtherItem, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.DesignOtherItem))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignDesignOtherItemController.prototype, "patch", null);
tslib_1.__decorate([
    rest_1.del('/designs/{id}/design-other-items', {
        responses: {
            '200': {
                description: 'Design.DesignOtherItem DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.DesignOtherItem))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignDesignOtherItemController.prototype, "delete", null);
DesignDesignOtherItemController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.DesignRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.DesignRepository])
], DesignDesignOtherItemController);
exports.DesignDesignOtherItemController = DesignDesignOtherItemController;
//# sourceMappingURL=design-design-other-item.controller.js.map