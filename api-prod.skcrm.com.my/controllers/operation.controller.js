"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let OperationController = class OperationController {
    constructor(operationRepository) {
        this.operationRepository = operationRepository;
    }
    async create(operation) {
        return this.operationRepository.create(operation);
    }
    async count(where) {
        return this.operationRepository.count(where);
    }
    async find(filter) {
        return this.operationRepository.find(filter);
    }
    async updateAll(operation, where) {
        return this.operationRepository.updateAll(operation, where);
    }
    async findById(id, filter) {
        return this.operationRepository.findById(id, filter);
    }
    async updateById(id, operation) {
        await this.operationRepository.updateById(id, operation);
    }
    async replaceById(id, operation) {
        await this.operationRepository.replaceById(id, operation);
    }
    async deleteById(id) {
        await this.operationRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/operation', {
        responses: {
            '200': {
                description: 'Operation model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Operation) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Operation, {
                    title: 'NewOperation',
                    exclude: ['uuid', 'createdAt', 'updatedAt', 'deletedAt'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OperationController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/operation/count', {
        responses: {
            '200': {
                description: 'Operation model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Operation)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OperationController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/operation', {
        responses: {
            '200': {
                description: 'Array of Operation model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.Operation, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Operation)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OperationController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/operation', {
        responses: {
            '200': {
                description: 'Operation PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Operation, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Operation)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Operation, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OperationController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/operation/{id}', {
        responses: {
            '200': {
                description: 'Operation model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Operation, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Operation, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OperationController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/operation/{id}', {
        responses: {
            '204': {
                description: 'Operation PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Operation, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Operation]),
    tslib_1.__metadata("design:returntype", Promise)
], OperationController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/operation/{id}', {
        responses: {
            '204': {
                description: 'Operation PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Operation]),
    tslib_1.__metadata("design:returntype", Promise)
], OperationController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/operation/{id}', {
        responses: {
            '204': {
                description: 'Operation DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], OperationController.prototype, "deleteById", null);
OperationController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.OperationRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.OperationRepository])
], OperationController);
exports.OperationController = OperationController;
//# sourceMappingURL=operation.controller.js.map