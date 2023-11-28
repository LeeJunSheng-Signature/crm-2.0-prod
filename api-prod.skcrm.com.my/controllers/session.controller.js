"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const authentication_1 = require("@loopback/authentication");
let SessionController = class SessionController {
    constructor(sessionRepository) {
        this.sessionRepository = sessionRepository;
    }
    async create(session) {
        return this.sessionRepository.create(session);
    }
    async count(where) {
        return this.sessionRepository.count(where);
    }
    async find(filter) {
        return this.sessionRepository.find(filter);
    }
    async updateAll(session, where) {
        return this.sessionRepository.updateAll(session, where);
    }
    async findById(id, filter) {
        return this.sessionRepository.findById(id, filter);
    }
    async updateById(id, session) {
        await this.sessionRepository.updateById(id, session);
    }
    async replaceById(id, session) {
        await this.sessionRepository.replaceById(id, session);
    }
    async deleteById(id) {
        await this.sessionRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/session', {
        responses: {
            '200': {
                description: 'Session model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Session) } },
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Session, {
                    title: 'NewSession',
                    exclude: ['uuid'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SessionController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/session/count', {
        responses: {
            '200': {
                description: 'Session model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    tslib_1.__param(0, rest_1.param.where(models_1.Session)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SessionController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/session', {
        responses: {
            '200': {
                description: 'Array of Session model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.Session, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    tslib_1.__param(0, rest_1.param.filter(models_1.Session)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SessionController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/session', {
        responses: {
            '200': {
                description: 'Session PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Session, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Session)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Session, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SessionController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/session/{id}', {
        responses: {
            '200': {
                description: 'Session model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Session, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Session, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SessionController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/session/{id}', {
        responses: {
            '204': {
                description: 'Session PATCH success',
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Session, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Session]),
    tslib_1.__metadata("design:returntype", Promise)
], SessionController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/session/{id}', {
        responses: {
            '204': {
                description: 'Session PUT success',
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Session]),
    tslib_1.__metadata("design:returntype", Promise)
], SessionController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/session/{id}', {
        responses: {
            '204': {
                description: 'Session DELETE success',
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], SessionController.prototype, "deleteById", null);
SessionController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.SessionRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.SessionRepository])
], SessionController);
exports.SessionController = SessionController;
//# sourceMappingURL=session.controller.js.map