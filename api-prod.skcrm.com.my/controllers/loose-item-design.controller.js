"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LooseItemDesignController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let LooseItemDesignController = class LooseItemDesignController {
    constructor(looseItemRepository) {
        this.looseItemRepository = looseItemRepository;
    }
    async getDesign(id) {
        return this.looseItemRepository.design(id);
    }
};
tslib_1.__decorate([
    rest_1.get('/loose-items/{id}/design', {
        responses: {
            '200': {
                description: 'Design belonging to LooseItem',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.Design) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LooseItemDesignController.prototype, "getDesign", null);
LooseItemDesignController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.LooseItemRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.LooseItemRepository])
], LooseItemDesignController);
exports.LooseItemDesignController = LooseItemDesignController;
//# sourceMappingURL=loose-item-design.controller.js.map