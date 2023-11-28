"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinalConfirmationOrderDesignController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let FinalConfirmationOrderDesignController = class FinalConfirmationOrderDesignController {
    constructor(finalConfirmationOrderRepository) {
        this.finalConfirmationOrderRepository = finalConfirmationOrderRepository;
    }
    async find(id, filter) {
        return this.finalConfirmationOrderRepository.designs(id).find(filter);
    }
    async create(id, design) {
        return this.finalConfirmationOrderRepository.designs(id).create(design);
    }
    async patch(id, design, where) {
        return this.finalConfirmationOrderRepository.designs(id).patch(design, where);
    }
    async delete(id, where) {
        return this.finalConfirmationOrderRepository.designs(id).delete(where);
    }
};
tslib_1.__decorate([
    rest_1.get('/final-confirmation-orders/{id}/designs', {
        responses: {
            '200': {
                description: 'Array of FinalConfirmationOrder has many Design',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.Design) },
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
], FinalConfirmationOrderDesignController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.post('/final-confirmation-orders/{id}/designs', {
        responses: {
            '200': {
                description: 'FinalConfirmationOrder model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Design) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Design, {
                    title: 'NewDesignInFinalConfirmationOrder',
                    exclude: ['uuid'],
                    optional: ['finalConfirmationOrderId']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FinalConfirmationOrderDesignController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.patch('/final-confirmation-orders/{id}/designs', {
        responses: {
            '200': {
                description: 'FinalConfirmationOrder.Design PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Design, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Design))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FinalConfirmationOrderDesignController.prototype, "patch", null);
tslib_1.__decorate([
    rest_1.del('/final-confirmation-orders/{id}/designs', {
        responses: {
            '200': {
                description: 'FinalConfirmationOrder.Design DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Design))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FinalConfirmationOrderDesignController.prototype, "delete", null);
FinalConfirmationOrderDesignController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.FinalConfirmationOrderRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.FinalConfirmationOrderRepository])
], FinalConfirmationOrderDesignController);
exports.FinalConfirmationOrderDesignController = FinalConfirmationOrderDesignController;
//# sourceMappingURL=final-confirmation-order-design.controller.js.map