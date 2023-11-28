"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let UserProfileController = class UserProfileController {
    constructor(userRepository, profileRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
    }
    async get(id, filter) {
        return this.userRepository.profile(id).get(filter);
    }
    async isUserSccodeExists(code) {
        const totalResult = await this.profileRepository.count({
            'sccode': code
        });
        return {
            exist: totalResult.count > 0
        };
    }
    async create(id, profile) {
        return this.userRepository.profile(id).create(profile);
    }
    async patch(id, profile, where) {
        return this.userRepository.profile(id).patch(profile, where);
    }
    async delete(id, where) {
        return this.userRepository.profile(id).delete(where);
    }
};
tslib_1.__decorate([
    rest_1.get('/users/{id}/profile', {
        responses: {
            '200': {
                description: 'User has one Profile',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Profile),
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
], UserProfileController.prototype, "get", null);
tslib_1.__decorate([
    rest_1.get('/users/sccode/{code}/exists', {
        responses: {
            '200': {
                description: 'User has one Profile',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Profile),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('code')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserProfileController.prototype, "isUserSccodeExists", null);
tslib_1.__decorate([
    rest_1.post('/users/{id}/profile', {
        responses: {
            '200': {
                description: 'User model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Profile) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Profile, {
                    title: 'NewProfileInUser',
                    exclude: ['uuid'],
                    optional: ['userId']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserProfileController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.patch('/users/{id}/profile', {
        responses: {
            '200': {
                description: 'User.Profile PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Profile, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Profile))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserProfileController.prototype, "patch", null);
tslib_1.__decorate([
    rest_1.del('/users/{id}/profile', {
        responses: {
            '200': {
                description: 'User.Profile DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Profile))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserProfileController.prototype, "delete", null);
UserProfileController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.UserRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.ProfileRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository,
        repositories_1.ProfileRepository])
], UserProfileController);
exports.UserProfileController = UserProfileController;
//# sourceMappingURL=user-profile.controller.js.map