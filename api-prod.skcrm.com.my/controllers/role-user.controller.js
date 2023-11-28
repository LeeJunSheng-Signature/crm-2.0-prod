"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleUserController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let RoleUserController = class RoleUserController {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async find(id, filter) {
        return this.roleRepository.users(id).find(filter);
    }
    async create(id, user) {
        return this.roleRepository.users(id).create(user);
    }
    async patch(id, user, where) {
        return this.roleRepository.users(id).patch(user, where);
    }
    async delete(id, where) {
        return this.roleRepository.users(id).delete(where);
    }
};
tslib_1.__decorate([
    rest_1.get('/roles/{id}/users', {
        responses: {
            '200': {
                description: 'Array of Role has many User through UserRole',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.User) },
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
], RoleUserController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.post('/roles/{id}/users', {
        responses: {
            '200': {
                description: 'create a User model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.User) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.User, {
                    title: 'NewUserInRole',
                    exclude: ['uuid'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RoleUserController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.patch('/roles/{id}/users', {
        responses: {
            '200': {
                description: 'Role.User PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.User, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.User))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RoleUserController.prototype, "patch", null);
tslib_1.__decorate([
    rest_1.del('/roles/{id}/users', {
        responses: {
            '200': {
                description: 'Role.User DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.User))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RoleUserController.prototype, "delete", null);
RoleUserController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.RoleRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.RoleRepository])
], RoleUserController);
exports.RoleUserController = RoleUserController;
//# sourceMappingURL=role-user.controller.js.map