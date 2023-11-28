"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSessionController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let UserSessionController = class UserSessionController {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async find(id, filter) {
        return this.userRepository.sessions(id).find(filter);
    }
    async create(id, session) {
        return this.userRepository.sessions(id).create(session);
    }
    async patch(id, session, where) {
        return this.userRepository.sessions(id).patch(session, where);
    }
    async delete(id, where) {
        return this.userRepository.sessions(id).delete(where);
    }
};
tslib_1.__decorate([
    rest_1.get('/users/{id}/sessions', {
        responses: {
            '200': {
                description: 'Array of User has many Session',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.Session) },
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
], UserSessionController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.post('/users/{id}/sessions', {
        responses: {
            '200': {
                description: 'User model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Session) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Session, {
                    title: 'NewSessionInUser',
                    exclude: ['uuid'],
                    optional: ['userUuid']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserSessionController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.patch('/users/{id}/sessions', {
        responses: {
            '200': {
                description: 'User.Session PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Session, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Session))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserSessionController.prototype, "patch", null);
tslib_1.__decorate([
    rest_1.del('/users/{id}/sessions', {
        responses: {
            '200': {
                description: 'User.Session DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Session))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserSessionController.prototype, "delete", null);
UserSessionController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.UserRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository])
], UserSessionController);
exports.UserSessionController = UserSessionController;
//# sourceMappingURL=user-session.controller.js.map