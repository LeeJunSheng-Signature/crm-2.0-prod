"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let EmailController = class EmailController {
    constructor(emailRepository) {
        this.emailRepository = emailRepository;
    }
    async create(email) {
        return this.emailRepository.create(email);
    }
    async count(where) {
        return this.emailRepository.count(where);
    }
    async find(filter) {
        return this.emailRepository.find(filter);
    }
    async updateAll(email, where) {
        return this.emailRepository.updateAll(email, where);
    }
    async findById(id, filter) {
        return this.emailRepository.findById(id, filter);
    }
    async updateById(id, email) {
        await this.emailRepository.updateById(id, email);
    }
    async replaceById(id, email) {
        await this.emailRepository.replaceById(id, email);
    }
    async deleteById(id) {
        await this.emailRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/emails', {
        responses: {
            '200': {
                description: 'Email model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Email) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Email, {
                    title: 'NewEmail',
                    exclude: ['uuid'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EmailController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/emails/count', {
        responses: {
            '200': {
                description: 'Email model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Email)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EmailController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/emails', {
        responses: {
            '200': {
                description: 'Array of Email model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.Email, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Email)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EmailController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/emails', {
        responses: {
            '200': {
                description: 'Email PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Email, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Email)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Email, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EmailController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/emails/{id}', {
        responses: {
            '200': {
                description: 'Email model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Email, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Email, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EmailController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/emails/{id}', {
        responses: {
            '204': {
                description: 'Email PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Email, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Email]),
    tslib_1.__metadata("design:returntype", Promise)
], EmailController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/emails/{id}', {
        responses: {
            '204': {
                description: 'Email PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Email]),
    tslib_1.__metadata("design:returntype", Promise)
], EmailController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/emails/{id}', {
        responses: {
            '204': {
                description: 'Email DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], EmailController.prototype, "deleteById", null);
EmailController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.EmailRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.EmailRepository])
], EmailController);
exports.EmailController = EmailController;
//# sourceMappingURL=email.controller.js.map