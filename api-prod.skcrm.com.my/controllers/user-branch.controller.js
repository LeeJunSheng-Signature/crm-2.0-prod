"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBranchController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let UserBranchController = class UserBranchController {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getBranch(id) {
        return this.userRepository.branch(id);
    }
};
tslib_1.__decorate([
    rest_1.get('/users/{id}/branch', {
        responses: {
            '200': {
                description: 'Branch belonging to User',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.Branch) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserBranchController.prototype, "getBranch", null);
UserBranchController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.UserRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository])
], UserBranchController);
exports.UserBranchController = UserBranchController;
//# sourceMappingURL=user-branch.controller.js.map