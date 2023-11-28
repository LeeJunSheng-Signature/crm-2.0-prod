"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignTradingItemController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let DesignTradingItemController = class DesignTradingItemController {
    constructor(designRepository) {
        this.designRepository = designRepository;
    }
    async find(id, filter) {
        return this.designRepository.tradingItems(id).find(filter);
    }
    async create(id, tradingItem) {
        return this.designRepository.tradingItems(id).create(tradingItem);
    }
    async patch(id, tradingItem, where) {
        return this.designRepository.tradingItems(id).patch(tradingItem, where);
    }
    async delete(id, where) {
        return this.designRepository.tradingItems(id).delete(where);
    }
};
tslib_1.__decorate([
    rest_1.get('/designs/{id}/trading-items', {
        responses: {
            '200': {
                description: 'Array of Design has many TradingItem through DesignTradingItem',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.TradingItem) },
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
], DesignTradingItemController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.post('/designs/{id}/trading-items', {
        responses: {
            '200': {
                description: 'create a TradingItem model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.TradingItem) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.TradingItem, {
                    title: 'NewTradingItemInDesign',
                    exclude: ['uuid'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignTradingItemController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.patch('/designs/{id}/trading-items', {
        responses: {
            '200': {
                description: 'Design.TradingItem PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.TradingItem, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.TradingItem))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignTradingItemController.prototype, "patch", null);
tslib_1.__decorate([
    rest_1.del('/designs/{id}/trading-items', {
        responses: {
            '200': {
                description: 'Design.TradingItem DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.TradingItem))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignTradingItemController.prototype, "delete", null);
DesignTradingItemController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.DesignRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.DesignRepository])
], DesignTradingItemController);
exports.DesignTradingItemController = DesignTradingItemController;
//# sourceMappingURL=design-trading-item.controller.js.map