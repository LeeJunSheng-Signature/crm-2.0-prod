"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const services_1 = require("../services");
let CredentialController = class CredentialController {
    constructor(credentialRepository, otpService, getCurrentUser) {
        this.credentialRepository = credentialRepository;
        this.otpService = otpService;
        this.getCurrentUser = getCurrentUser;
    }
    async create(credential) {
        return this.credentialRepository.create(credential);
    }
    async count(where) {
        return this.credentialRepository.count(where);
    }
    async find(filter) {
        return this.credentialRepository.find(filter);
    }
    async updateAll(credential, where) {
        return this.credentialRepository.updateAll(credential, where);
    }
    async findById(id, filter) {
        return this.credentialRepository.findById(id, filter);
    }
    async updateById(id, credential) {
        await this.credentialRepository.updateById(id, credential);
    }
    async replaceById(id, credential) {
        await this.credentialRepository.replaceById(id, credential);
    }
    async deleteById(id) {
        await this.credentialRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/credential', {
        responses: {
            '200': {
                description: 'Credential model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Credential) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Credential, {
                    title: 'NewCredential',
                    exclude: ['uuid'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CredentialController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/credential/count', {
        responses: {
            '200': {
                description: 'Credential model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Credential)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CredentialController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/credential', {
        responses: {
            '200': {
                description: 'Array of Credential model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.Credential, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Credential)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CredentialController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/credential', {
        responses: {
            '200': {
                description: 'Credential PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Credential, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Credential)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Credential, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CredentialController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/credential/{id}', {
        responses: {
            '200': {
                description: 'Credential model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Credential, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Credential, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CredentialController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/credential/{id}', {
        responses: {
            '204': {
                description: 'Credential PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Credential, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Credential]),
    tslib_1.__metadata("design:returntype", Promise)
], CredentialController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/credential/{id}', {
        responses: {
            '204': {
                description: 'Credential PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Credential]),
    tslib_1.__metadata("design:returntype", Promise)
], CredentialController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/credential/{id}', {
        responses: {
            '204': {
                description: 'Credential DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], CredentialController.prototype, "deleteById", null);
CredentialController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.CredentialRepository)),
    tslib_1.__param(1, core_1.inject('services.OtpService')),
    tslib_1.__param(2, core_1.inject.getter(authentication_1.AuthenticationBindings.CURRENT_USER)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.CredentialRepository,
        services_1.OtpService, Function])
], CredentialController);
exports.CredentialController = CredentialController;
//# sourceMappingURL=credential.controller.js.map