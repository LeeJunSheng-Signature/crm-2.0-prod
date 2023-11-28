"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ProcessController = class ProcessController {
    constructor(processRepository) {
        this.processRepository = processRepository;
    }
    async create(process) {
        return this.processRepository.create(process);
    }
    async count(where) {
        return this.processRepository.count(where);
    }
    async find(filter) {
        return this.processRepository.find(filter);
    }
    async updateAll(process, where) {
        return this.processRepository.updateAll(process, where);
    }
    async findById(id, filter) {
        return this.processRepository.findById(id, filter);
    }
    async updateById(id, process) {
        await this.processRepository.updateById(id, process);
    }
    async replaceById(id, process) {
        await this.processRepository.replaceById(id, process);
    }
    async deleteById(id) {
        await this.processRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/processes', {
        responses: {
            '200': {
                description: 'Process model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Process) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Process, {
                    title: 'NewProcess',
                    exclude: ['uuid'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProcessController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/processes/count', {
        responses: {
            '200': {
                description: 'Process model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Process)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProcessController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/processes', {
        responses: {
            '200': {
                description: 'Array of Process model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.Process, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Process)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProcessController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/processes', {
        responses: {
            '200': {
                description: 'Process PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Process, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Process)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Process, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProcessController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/processes/{id}', {
        responses: {
            '200': {
                description: 'Process model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Process, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Process, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProcessController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/processes/{id}', {
        responses: {
            '204': {
                description: 'Process PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Process, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Process]),
    tslib_1.__metadata("design:returntype", Promise)
], ProcessController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/processes/{id}', {
        responses: {
            '204': {
                description: 'Process PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Process]),
    tslib_1.__metadata("design:returntype", Promise)
], ProcessController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/processes/{id}', {
        responses: {
            '204': {
                description: 'Process DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ProcessController.prototype, "deleteById", null);
ProcessController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.ProcessRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ProcessRepository])
], ProcessController);
exports.ProcessController = ProcessController;
//# sourceMappingURL=process.controller.js.map