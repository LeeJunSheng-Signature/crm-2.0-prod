"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignFinalConfirmationOrderController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let DesignFinalConfirmationOrderController = class DesignFinalConfirmationOrderController {
    constructor(designRepository) {
        this.designRepository = designRepository;
    }
    async getFinalConfirmationOrder(id) {
        return this.designRepository.finalConfirmationOrder(id);
    }
};
tslib_1.__decorate([
    rest_1.get('/designs/{id}/final-confirmation-order', {
        responses: {
            '200': {
                description: 'FinalConfirmationOrder belonging to Design',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.FinalConfirmationOrder) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignFinalConfirmationOrderController.prototype, "getFinalConfirmationOrder", null);
DesignFinalConfirmationOrderController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.DesignRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.DesignRepository])
], DesignFinalConfirmationOrderController);
exports.DesignFinalConfirmationOrderController = DesignFinalConfirmationOrderController;
//# sourceMappingURL=design-final-confirmation-order.controller.js.map