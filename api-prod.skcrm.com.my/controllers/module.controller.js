"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ModuleController = class ModuleController {
    constructor(moduleRepository) {
        this.moduleRepository = moduleRepository;
    }
    async create(module) {
        return this.moduleRepository.create(module);
    }
    async count(where) {
        return this.moduleRepository.count(where);
    }
    async find(filter) {
        return this.moduleRepository.find(filter);
    }
    async updateAll(module, where) {
        return this.moduleRepository.updateAll(module, where);
    }
    async findById(id, filter) {
        return this.moduleRepository.findById(id, filter);
    }
    async updateById(id, module) {
        await this.moduleRepository.updateById(id, module);
    }
    async replaceById(id, module) {
        await this.moduleRepository.replaceById(id, module);
    }
    async deleteById(id) {
        await this.moduleRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/module', {
        responses: {
            '200': {
                description: 'Module model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Module) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Module, {
                    title: 'NewModule',
                    exclude: ['uuid', 'createdAt', 'updatedAt', 'deletedAt'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ModuleController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/module/count', {
        responses: {
            '200': {
                description: 'Module model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Module)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ModuleController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/module', {
        responses: {
            '200': {
                description: 'Array of Module model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.Module, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Module)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ModuleController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/module', {
        responses: {
            '200': {
                description: 'Module PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Module, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Module)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Module, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ModuleController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/module/{id}', {
        responses: {
            '200': {
                description: 'Module model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Module, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Module, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ModuleController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/module/{id}', {
        responses: {
            '204': {
                description: 'Module PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Module, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Module]),
    tslib_1.__metadata("design:returntype", Promise)
], ModuleController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/module/{id}', {
        responses: {
            '204': {
                description: 'Module PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Module]),
    tslib_1.__metadata("design:returntype", Promise)
], ModuleController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/module/{id}', {
        responses: {
            '204': {
                description: 'Module DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ModuleController.prototype, "deleteById", null);
ModuleController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.ModuleRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ModuleRepository])
], ModuleController);
exports.ModuleController = ModuleController;
//# sourceMappingURL=module.controller.js.map