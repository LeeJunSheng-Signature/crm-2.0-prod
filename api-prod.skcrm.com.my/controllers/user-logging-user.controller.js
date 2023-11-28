"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoggingUserController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let UserLoggingUserController = class UserLoggingUserController {
    constructor(userLoggingRepository) {
        this.userLoggingRepository = userLoggingRepository;
    }
    async getUser(id) {
        return this.userLoggingRepository.user(id);
    }
};
tslib_1.__decorate([
    rest_1.get('/user-loggings/{id}/user', {
        responses: {
            '200': {
                description: 'User belonging to UserLogging',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.User) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserLoggingUserController.prototype, "getUser", null);
UserLoggingUserController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.UserLoggingRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserLoggingRepository])
], UserLoggingUserController);
exports.UserLoggingUserController = UserLoggingUserController;
//# sourceMappingURL=user-logging-user.controller.js.map