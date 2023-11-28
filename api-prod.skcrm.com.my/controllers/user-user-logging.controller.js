"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUserLoggingController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let UserUserLoggingController = class UserUserLoggingController {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async find(id, filter) {
        return this.userRepository.userLoggings(id).find(filter);
    }
    async create(id, userLogging) {
        return this.userRepository.userLoggings(id).create(userLogging);
    }
    async patch(id, userLogging, where) {
        return this.userRepository.userLoggings(id).patch(userLogging, where);
    }
    async delete(id, where) {
        return this.userRepository.userLoggings(id).delete(where);
    }
};
tslib_1.__decorate([
    rest_1.get('/users/{id}/user-loggings', {
        responses: {
            '200': {
                description: 'Array of User has many UserLogging',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.UserLogging) },
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
], UserUserLoggingController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.post('/users/{id}/user-loggings', {
        responses: {
            '200': {
                description: 'User model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.UserLogging) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.UserLogging, {
                    title: 'NewUserLoggingInUser',
                    exclude: ['uuid'],
                    optional: ['userId']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserUserLoggingController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.patch('/users/{id}/user-loggings', {
        responses: {
            '200': {
                description: 'User.UserLogging PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
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
    tslib_1.__param(2, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.UserLogging))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserUserLoggingController.prototype, "patch", null);
tslib_1.__decorate([
    rest_1.del('/users/{id}/user-loggings', {
        responses: {
            '200': {
                description: 'User.UserLogging DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.UserLogging))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserUserLoggingController.prototype, "delete", null);
UserUserLoggingController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.UserRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository])
], UserUserLoggingController);
exports.UserUserLoggingController = UserUserLoggingController;
//# sourceMappingURL=user-user-logging.controller.js.map