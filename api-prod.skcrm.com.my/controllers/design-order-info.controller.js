"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignOrderInfoController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let DesignOrderInfoController = class DesignOrderInfoController {
    constructor(designRepository) {
        this.designRepository = designRepository;
    }
    async get(id, filter) {
        return this.designRepository.orderInfo(id).get(filter);
    }
    async create(id, orderInfo) {
        return this.designRepository.orderInfo(id).create(orderInfo);
    }
    async patch(id, orderInfo, where) {
        return this.designRepository.orderInfo(id).patch(orderInfo, where);
    }
    async delete(id, where) {
        return this.designRepository.orderInfo(id).delete(where);
    }
};
tslib_1.__decorate([
    rest_1.get('/designs/{id}/order-info', {
        responses: {
            '200': {
                description: 'Design has one OrderInfo',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.OrderInfo),
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
], DesignOrderInfoController.prototype, "get", null);
tslib_1.__decorate([
    rest_1.post('/designs/{id}/order-info', {
        responses: {
            '200': {
                description: 'Design model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.OrderInfo) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.OrderInfo, {
                    title: 'NewOrderInfoInDesign',
                    exclude: ['uuid'],
                    optional: ['designId']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignOrderInfoController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.patch('/designs/{id}/order-info', {
        responses: {
            '200': {
                description: 'Design.OrderInfo PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.OrderInfo, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.OrderInfo))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignOrderInfoController.prototype, "patch", null);
tslib_1.__decorate([
    rest_1.del('/designs/{id}/order-info', {
        responses: {
            '200': {
                description: 'Design.OrderInfo DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.OrderInfo))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignOrderInfoController.prototype, "delete", null);
DesignOrderInfoController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.DesignRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.DesignRepository])
], DesignOrderInfoController);
exports.DesignOrderInfoController = DesignOrderInfoController;
//# sourceMappingURL=design-order-info.controller.js.map