"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTemplateController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let EmailTemplateController = class EmailTemplateController {
    constructor(emailTemplateRepository) {
        this.emailTemplateRepository = emailTemplateRepository;
    }
    async create(emailTemplate) {
        return this.emailTemplateRepository.create(emailTemplate);
    }
    async count(where) {
        return this.emailTemplateRepository.count(where);
    }
    async find(filter) {
        return this.emailTemplateRepository.find(filter);
    }
    async updateAll(emailTemplate, where) {
        return this.emailTemplateRepository.updateAll(emailTemplate, where);
    }
    async findById(id, filter) {
        return this.emailTemplateRepository.findById(id, filter);
    }
    async updateById(id, emailTemplate) {
        await this.emailTemplateRepository.updateById(id, emailTemplate);
    }
    async replaceById(id, emailTemplate) {
        await this.emailTemplateRepository.replaceById(id, emailTemplate);
    }
    async deleteById(id) {
        await this.emailTemplateRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/email-templates', {
        responses: {
            '200': {
                description: 'EmailTemplate model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.EmailTemplate) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.EmailTemplate, {
                    title: 'NewEmailTemplate',
                    exclude: ['uuid'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EmailTemplateController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/email-templates/count', {
        responses: {
            '200': {
                description: 'EmailTemplate model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.EmailTemplate)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EmailTemplateController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/email-templates', {
        responses: {
            '200': {
                description: 'Array of EmailTemplate model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.EmailTemplate, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.EmailTemplate)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EmailTemplateController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/email-templates', {
        responses: {
            '200': {
                description: 'EmailTemplate PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.EmailTemplate, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.EmailTemplate)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.EmailTemplate, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EmailTemplateController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/email-templates/{id}', {
        responses: {
            '200': {
                description: 'EmailTemplate model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.EmailTemplate, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.EmailTemplate, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EmailTemplateController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/email-templates/{id}', {
        responses: {
            '204': {
                description: 'EmailTemplate PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.EmailTemplate, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.EmailTemplate]),
    tslib_1.__metadata("design:returntype", Promise)
], EmailTemplateController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/email-templates/{id}', {
        responses: {
            '204': {
                description: 'EmailTemplate PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.EmailTemplate]),
    tslib_1.__metadata("design:returntype", Promise)
], EmailTemplateController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/email-templates/{id}', {
        responses: {
            '204': {
                description: 'EmailTemplate DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], EmailTemplateController.prototype, "deleteById", null);
EmailTemplateController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.EmailTemplateRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.EmailTemplateRepository])
], EmailTemplateController);
exports.EmailTemplateController = EmailTemplateController;
//# sourceMappingURL=email-template.controller.js.map