"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionUserController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let SessionUserController = class SessionUserController {
    constructor(sessionRepository) {
        this.sessionRepository = sessionRepository;
    }
    async getUser(id) {
        return this.sessionRepository.user(id);
    }
};
tslib_1.__decorate([
    rest_1.get('/sessions/{id}/user', {
        responses: {
            '200': {
                description: 'User belonging to Session',
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
], SessionUserController.prototype, "getUser", null);
SessionUserController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.SessionRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.SessionRepository])
], SessionUserController);
exports.SessionUserController = SessionUserController;
//# sourceMappingURL=session-user.controller.js.map