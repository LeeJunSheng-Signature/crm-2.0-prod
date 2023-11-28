"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignAdditionalLooseItemDesignController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let DesignAdditionalLooseItemDesignController = class DesignAdditionalLooseItemDesignController {
    constructor(designAdditionalLooseItemRepository) {
        this.designAdditionalLooseItemRepository = designAdditionalLooseItemRepository;
    }
    async getDesign(id) {
        return this.designAdditionalLooseItemRepository.design(id);
    }
};
tslib_1.__decorate([
    rest_1.get('/design-additional-loose-items/{id}/design', {
        responses: {
            '200': {
                description: 'Design belonging to DesignAdditionalLooseItem',
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
], DesignAdditionalLooseItemDesignController.prototype, "getDesign", null);
DesignAdditionalLooseItemDesignController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.DesignAdditionalLooseItemRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.DesignAdditionalLooseItemRepository])
], DesignAdditionalLooseItemDesignController);
exports.DesignAdditionalLooseItemDesignController = DesignAdditionalLooseItemDesignController;
//# sourceMappingURL=design-additional-loose-item-design.controller.js.map