"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignOtherItemDesignController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let DesignOtherItemDesignController = class DesignOtherItemDesignController {
    constructor(designOtherItemRepository) {
        this.designOtherItemRepository = designOtherItemRepository;
    }
    async getDesign(id) {
        return this.designOtherItemRepository.design(id);
    }
};
tslib_1.__decorate([
    rest_1.get('/design-other-items/{id}/design', {
        responses: {
            '200': {
                description: 'Design belonging to DesignOtherItem',
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
], DesignOtherItemDesignController.prototype, "getDesign", null);
DesignOtherItemDesignController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.DesignOtherItemRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.DesignOtherItemRepository])
], DesignOtherItemDesignController);
exports.DesignOtherItemDesignController = DesignOtherItemDesignController;
//# sourceMappingURL=design-other-item-design.controller.js.map