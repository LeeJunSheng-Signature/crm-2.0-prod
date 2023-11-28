"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoleController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const schema_1 = require("./../schema");
let UserRoleController = class UserRoleController {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async find(id) {
        return this.userRepository.roles(id).find();
    }
    async create(id, role) {
        await this.userRepository.roles(id).link(role.roleId);
        return this.userRepository.findById(id);
    }
    async unassignRole(id, role) {
        await this.userRepository.roles(id).unlink(role.roleId);
        return this.userRepository.findById(id);
    }
};
tslib_1.__decorate([
    rest_1.get('/users/{id}/roles', {
        responses: {
            '200': {
                description: 'Array of User has many Role through UserRole',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.Role) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserRoleController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.post('/users/{id}/roles', {
        responses: {
            '200': {
                description: 'create a Role model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Role) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: schema_1.UserRoleSchema
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserRoleController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.post('/users/{id}/roles/unassign', {
        responses: {
            '200': {
                description: 'unassign a Role from user',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Role) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: schema_1.UserRoleSchema
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserRoleController.prototype, "unassignRole", null);
UserRoleController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.UserRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository])
], UserRoleController);
exports.UserRoleController = UserRoleController;
//# sourceMappingURL=user-role.controller.js.map