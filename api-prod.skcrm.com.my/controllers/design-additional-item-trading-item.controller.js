"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignAdditionalItemTradingItemController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let DesignAdditionalItemTradingItemController = class DesignAdditionalItemTradingItemController {
    constructor(designAdditionalItemRepository) {
        this.designAdditionalItemRepository = designAdditionalItemRepository;
    }
    async getTradingItem(id) {
        return this.designAdditionalItemRepository.tradingItem(id);
    }
};
tslib_1.__decorate([
    rest_1.get('/design-additional-items/{id}/trading-item', {
        responses: {
            '200': {
                description: 'TradingItem belonging to DesignAdditionalItem',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.TradingItem) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignAdditionalItemTradingItemController.prototype, "getTradingItem", null);
DesignAdditionalItemTradingItemController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.DesignAdditionalItemRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.DesignAdditionalItemRepository])
], DesignAdditionalItemTradingItemController);
exports.DesignAdditionalItemTradingItemController = DesignAdditionalItemTradingItemController;
//# sourceMappingURL=design-additional-item-trading-item.controller.js.map