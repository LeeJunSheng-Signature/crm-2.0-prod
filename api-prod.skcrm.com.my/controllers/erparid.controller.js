"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErparidController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ErparidController = class ErparidController {
    constructor(erparidRepository) {
        this.erparidRepository = erparidRepository;
    }
    async create(erparid) {
        return this.erparidRepository.create(erparid);
    }
    async count(where) {
        return this.erparidRepository.count(where);
    }
    async find(filter) {
        return this.erparidRepository.find(filter);
    }
    async updateAll(erparid, where) {
        return this.erparidRepository.updateAll(erparid, where);
    }
    async findById(crmarid, filter) {
        // return this.erparidRepository.findById(crmarid, filter);
        const order = await this.erparidRepository.findOne({ where: { crmarid: crmarid } });
        return order;
    }
    async updateById(id, erparid) {
        await this.erparidRepository.updateById(id, erparid);
    }
    async replaceById(id, erparid) {
        await this.erparidRepository.replaceById(id, erparid);
    }
    async deleteById(id) {
        await this.erparidRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/erparids', {
        responses: {
            '200': {
                description: 'Erparid model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Erparid) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Erparid, {
                    title: 'NewErparid',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ErparidController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/erparids/count', {
        responses: {
            '200': {
                description: 'Erparid model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Erparid)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ErparidController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/erparids', {
        responses: {
            '200': {
                description: 'Array of Erparid model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.Erparid, { includeRelations: false }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Erparid)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ErparidController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/erparids', {
        responses: {
            '200': {
                description: 'Erparid PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Erparid, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Erparid)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Erparid, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ErparidController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/erparids/{crmarid}', {
        responses: {
            '200': {
                description: 'Erparid model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Erparid, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('crmarid')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Erparid, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ErparidController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/erparids/{id}', {
        responses: {
            '204': {
                description: 'Erparid PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Erparid, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Erparid]),
    tslib_1.__metadata("design:returntype", Promise)
], ErparidController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/erparids/{id}', {
        responses: {
            '204': {
                description: 'Erparid PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Erparid]),
    tslib_1.__metadata("design:returntype", Promise)
], ErparidController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/erparids/{id}', {
        responses: {
            '204': {
                description: 'Erparid DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ErparidController.prototype, "deleteById", null);
ErparidController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.ErparidRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ErparidRepository])
], ErparidController);
exports.ErparidController = ErparidController;
//# sourceMappingURL=erparid.controller.js.map