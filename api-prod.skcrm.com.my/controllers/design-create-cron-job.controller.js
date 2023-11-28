"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignCreateCronJobController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let DesignCreateCronJobController = class DesignCreateCronJobController {
    constructor(designCreateCronJobRepository) {
        this.designCreateCronJobRepository = designCreateCronJobRepository;
    }
    async create(designCreateCronJob) {
        return this.designCreateCronJobRepository.create(designCreateCronJob);
    }
    async count(where) {
        return this.designCreateCronJobRepository.count(where);
    }
    async find(filter) {
        return this.designCreateCronJobRepository.find(filter);
    }
    async updateAll(designCreateCronJob, where) {
        return this.designCreateCronJobRepository.updateAll(designCreateCronJob, where);
    }
    async findById(id, filter) {
        return this.designCreateCronJobRepository.findById(id, filter);
    }
    async updateById(id, designCreateCronJob) {
        await this.designCreateCronJobRepository.updateById(id, designCreateCronJob);
    }
    async replaceById(id, designCreateCronJob) {
        await this.designCreateCronJobRepository.replaceById(id, designCreateCronJob);
    }
    async deleteById(id) {
        await this.designCreateCronJobRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/design-create-cron-jobs', {
        responses: {
            '200': {
                description: 'DesignCreateCronJob model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.DesignCreateCronJob) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.DesignCreateCronJob, {
                    title: 'NewDesignCreateCronJob',
                    exclude: ['uuid'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignCreateCronJobController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/design-create-cron-jobs/count', {
        responses: {
            '200': {
                description: 'DesignCreateCronJob model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.DesignCreateCronJob)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignCreateCronJobController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/design-create-cron-jobs/exist', {
        responses: {
            '200': {
                description: 'Array of DesignCreateCronJob model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.DesignCreateCronJob, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.DesignCreateCronJob)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignCreateCronJobController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/design-create-cron-jobs', {
        responses: {
            '200': {
                description: 'DesignCreateCronJob PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.DesignCreateCronJob, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.DesignCreateCronJob)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.DesignCreateCronJob, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignCreateCronJobController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/design-create-cron-jobs/{id}', {
        responses: {
            '200': {
                description: 'DesignCreateCronJob model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.DesignCreateCronJob, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.DesignCreateCronJob, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignCreateCronJobController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/design-create-cron-jobs/{id}', {
        responses: {
            '204': {
                description: 'DesignCreateCronJob PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.DesignCreateCronJob, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.DesignCreateCronJob]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignCreateCronJobController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/design-create-cron-jobs/{id}', {
        responses: {
            '204': {
                description: 'DesignCreateCronJob PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.DesignCreateCronJob]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignCreateCronJobController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/design-create-cron-jobs/{id}', {
        responses: {
            '204': {
                description: 'DesignCreateCronJob DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignCreateCronJobController.prototype, "deleteById", null);
DesignCreateCronJobController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.DesignCreateCronJobRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.DesignCreateCronJobRepository])
], DesignCreateCronJobController);
exports.DesignCreateCronJobController = DesignCreateCronJobController;
//# sourceMappingURL=design-create-cron-job.controller.js.map