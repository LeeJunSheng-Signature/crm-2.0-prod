"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignDesignCreateCronJobController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let DesignDesignCreateCronJobController = class DesignDesignCreateCronJobController {
    constructor(designRepository, designCreateCronJobRepository) {
        this.designRepository = designRepository;
        this.designCreateCronJobRepository = designCreateCronJobRepository;
    }
    async get(id, filter) {
        return this.designRepository.designCreateCronJob(id).get(filter);
    }
    async create(id, designCreateCronJob) {
        return this.designRepository.designCreateCronJob(id).create(designCreateCronJob);
    }
    async patch(id, designCreateCronJob, where) {
        return this.designRepository.designCreateCronJob(id).patch(designCreateCronJob, where);
    }
    async delete(id, where) {
        return this.designRepository.designCreateCronJob(id).delete(where);
    }
};
tslib_1.__decorate([
    rest_1.get('/designs/{id}/design-create-cron-job', {
        responses: {
            '200': {
                description: 'Design has one DesignCreateCronJob',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.DesignCreateCronJob),
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
], DesignDesignCreateCronJobController.prototype, "get", null);
tslib_1.__decorate([
    rest_1.post('/designs/{id}/design-create-cron-job', {
        responses: {
            '200': {
                description: 'Design model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.DesignCreateCronJob) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.DesignCreateCronJob, {
                    title: 'NewDesignCreateCronJobInDesign',
                    exclude: ['uuid'],
                    optional: ['orderId']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignDesignCreateCronJobController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.patch('/designs/{id}/design-create-cron-job', {
        responses: {
            '200': {
                description: 'Design.DesignCreateCronJob PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
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
    tslib_1.__param(2, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.DesignCreateCronJob))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignDesignCreateCronJobController.prototype, "patch", null);
tslib_1.__decorate([
    rest_1.del('/designs/{id}/design-create-cron-job', {
        responses: {
            '200': {
                description: 'Design.DesignCreateCronJob DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.DesignCreateCronJob))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignDesignCreateCronJobController.prototype, "delete", null);
DesignDesignCreateCronJobController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.DesignRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.DesignCreateCronJobRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.DesignRepository,
        repositories_1.DesignCreateCronJobRepository])
], DesignDesignCreateCronJobController);
exports.DesignDesignCreateCronJobController = DesignDesignCreateCronJobController;
//# sourceMappingURL=design-design-create-cron-job.controller.js.map