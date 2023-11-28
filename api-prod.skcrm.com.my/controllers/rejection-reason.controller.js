"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RejectionReasonController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let RejectionReasonController = class RejectionReasonController {
    constructor(rejectionReasonRepository) {
        this.rejectionReasonRepository = rejectionReasonRepository;
    }
    async create(rejectionReason) {
        return this.rejectionReasonRepository.create(rejectionReason);
    }
    async count(where) {
        return this.rejectionReasonRepository.count(where);
    }
    async find(filter) {
        return this.rejectionReasonRepository.find(filter);
    }
    async updateAll(rejectionReason, where) {
        return this.rejectionReasonRepository.updateAll(rejectionReason, where);
    }
    async findById(id, filter) {
        return this.rejectionReasonRepository.findById(id, filter);
    }
    async updateById(id, rejectionReason) {
        await this.rejectionReasonRepository.updateById(id, rejectionReason);
    }
    async replaceById(id, rejectionReason) {
        await this.rejectionReasonRepository.replaceById(id, rejectionReason);
    }
    async deleteById(id) {
        await this.rejectionReasonRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/rejection-reasons', {
        responses: {
            "200": {
                description: 'RejectionReason model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.RejectionReason) } },
            }
        }
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.RejectionReason, {
                    title: 'NewRejectionReason',
                    exclude: ['uuid'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RejectionReasonController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/rejection-reasons/count', {
        responses: {
            "200": {
                description: 'RejectionReason model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            }
        }
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.RejectionReason)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RejectionReasonController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/rejection-reasons', {
        responses: {
            "200": {
                description: 'Array of RejectionReason model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.RejectionReason, { includeRelations: true }),
                        },
                    },
                },
            }
        }
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.RejectionReason)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RejectionReasonController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/rejection-reasons', {
        responses: {
            "200": {
                description: 'RejectionReason PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            }
        }
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.RejectionReason, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.RejectionReason)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.RejectionReason, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RejectionReasonController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/rejection-reasons/{id}', {
        responses: {
            "200": {
                description: 'RejectionReason model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.RejectionReason, { includeRelations: true }),
                    },
                },
            }
        }
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.RejectionReason, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RejectionReasonController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/rejection-reasons/{id}', {
        responses: {
            "204": {
                description: 'RejectionReason PATCH success',
            }
        }
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.RejectionReason, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.RejectionReason]),
    tslib_1.__metadata("design:returntype", Promise)
], RejectionReasonController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/rejection-reasons/{id}', {
        responses: {
            "204": {
                description: 'RejectionReason PUT success',
            }
        }
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.RejectionReason]),
    tslib_1.__metadata("design:returntype", Promise)
], RejectionReasonController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/rejection-reasons/{id}', {
        responses: {
            "204": {
                description: 'RejectionReason DELETE success',
            }
        }
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], RejectionReasonController.prototype, "deleteById", null);
RejectionReasonController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.RejectionReasonRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.RejectionReasonRepository])
], RejectionReasonController);
exports.RejectionReasonController = RejectionReasonController;
//# sourceMappingURL=rejection-reason.controller.js.map