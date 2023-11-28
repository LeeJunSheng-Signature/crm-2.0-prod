"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentOptionsController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let PaymentOptionsController = class PaymentOptionsController {
    constructor(paymentOptionsRepository) {
        this.paymentOptionsRepository = paymentOptionsRepository;
    }
    async create(paymentOptions) {
        return this.paymentOptionsRepository.create(paymentOptions);
    }
    async count(where) {
        return this.paymentOptionsRepository.count(where);
    }
    async find(filter) {
        return this.paymentOptionsRepository.find(filter);
    }
    async updateAll(paymentOptions, where) {
        return this.paymentOptionsRepository.updateAll(paymentOptions, where);
    }
    async findById(id, filter) {
        return this.paymentOptionsRepository.findById(id, filter);
    }
    async updateById(id, paymentOptions) {
        await this.paymentOptionsRepository.updateById(id, paymentOptions);
    }
    async replaceById(id, paymentOptions) {
        await this.paymentOptionsRepository.replaceById(id, paymentOptions);
    }
    async deleteById(id) {
        await this.paymentOptionsRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/payment-options', {
        responses: {
            '200': {
                description: 'PaymentOptions model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.PaymentOptions) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.PaymentOptions, {
                    title: 'NewPaymentOptions',
                    exclude: ['uuid'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentOptionsController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/payment-options/count', {
        responses: {
            '200': {
                description: 'PaymentOptions model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.PaymentOptions)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentOptionsController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/payment-options', {
        responses: {
            '200': {
                description: 'Array of PaymentOptions model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.PaymentOptions, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.PaymentOptions)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentOptionsController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/payment-options', {
        responses: {
            '200': {
                description: 'PaymentOptions PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.PaymentOptions, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.PaymentOptions)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.PaymentOptions, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentOptionsController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/payment-options/{id}', {
        responses: {
            '200': {
                description: 'PaymentOptions model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.PaymentOptions, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.PaymentOptions, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentOptionsController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/payment-options/{id}', {
        responses: {
            '204': {
                description: 'PaymentOptions PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.PaymentOptions, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.PaymentOptions]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentOptionsController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/payment-options/{id}', {
        responses: {
            '204': {
                description: 'PaymentOptions PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.PaymentOptions]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentOptionsController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/payment-options/{id}', {
        responses: {
            '204': {
                description: 'PaymentOptions DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentOptionsController.prototype, "deleteById", null);
PaymentOptionsController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.PaymentOptionsRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.PaymentOptionsRepository])
], PaymentOptionsController);
exports.PaymentOptionsController = PaymentOptionsController;
//# sourceMappingURL=payment-options.controller.js.map