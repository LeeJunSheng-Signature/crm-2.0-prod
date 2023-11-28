"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoggingController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let UserLoggingController = class UserLoggingController {
    constructor(userLoggingRepository) {
        this.userLoggingRepository = userLoggingRepository;
    }
    async create(userLogging) {
        return this.userLoggingRepository.create(userLogging);
    }
    async count(where) {
        return this.userLoggingRepository.count(where);
    }
    async find(filter) {
        return this.userLoggingRepository.find(filter);
    }
    async updateAll(userLogging, where) {
        return this.userLoggingRepository.updateAll(userLogging, where);
    }
    async findById(id, filter) {
        return this.userLoggingRepository.findById(id, filter);
    }
    async updateById(id, userLogging) {
        await this.userLoggingRepository.updateById(id, userLogging);
    }
    async replaceById(id, userLogging) {
        await this.userLoggingRepository.replaceById(id, userLogging);
    }
    async deleteById(id) {
        await this.userLoggingRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/user-loggings', {
        responses: {
            '200': {
                description: 'UserLogging model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.UserLogging) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.UserLogging, {
                    title: 'NewUserLogging',
                    exclude: ['uuid'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserLoggingController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/user-loggings/count', {
        responses: {
            '200': {
                description: 'UserLogging model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.UserLogging)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserLoggingController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/user-loggings', {
        responses: {
            '200': {
                description: 'Array of UserLogging model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.UserLogging, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.UserLogging)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserLoggingController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/user-loggings', {
        responses: {
            '200': {
                description: 'UserLogging PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.UserLogging, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.UserLogging)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.UserLogging, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserLoggingController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/user-loggings/{id}', {
        responses: {
            '200': {
                description: 'UserLogging model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.UserLogging, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.UserLogging, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserLoggingController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/user-loggings/{id}', {
        responses: {
            '204': {
                description: 'UserLogging PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.UserLogging, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.UserLogging]),
    tslib_1.__metadata("design:returntype", Promise)
], UserLoggingController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/user-loggings/{id}', {
        responses: {
            '204': {
                description: 'UserLogging PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.UserLogging]),
    tslib_1.__metadata("design:returntype", Promise)
], UserLoggingController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/user-loggings/{id}', {
        responses: {
            '204': {
                description: 'UserLogging DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserLoggingController.prototype, "deleteById", null);
UserLoggingController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.UserLoggingRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserLoggingRepository])
], UserLoggingController);
exports.UserLoggingController = UserLoggingController;
//# sourceMappingURL=user-logging.controller.js.map