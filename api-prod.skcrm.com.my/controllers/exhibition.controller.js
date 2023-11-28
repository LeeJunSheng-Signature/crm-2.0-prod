"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExhibitionController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ExhibitionController = class ExhibitionController {
    constructor(exhibitionRepository) {
        this.exhibitionRepository = exhibitionRepository;
    }
    async create(exhibition) {
        return this.exhibitionRepository.create(exhibition);
    }
    async count(where) {
        return this.exhibitionRepository.count(where);
    }
    async find(filter) {
        return this.exhibitionRepository.find(filter);
    }
    async updateAll(exhibition, where) {
        return this.exhibitionRepository.updateAll(exhibition, where);
    }
    async findById(id, filter) {
        return this.exhibitionRepository.findById(id, filter);
    }
    async isExhibitionExist(name) {
        const totalResult = await this.exhibitionRepository.count({
            'name': name
        });
        return {
            exist: totalResult.count > 0
        };
    }
    async updateById(id, exhibition) {
        await this.exhibitionRepository.updateById(id, exhibition);
    }
    async replaceById(id, exhibition) {
        await this.exhibitionRepository.replaceById(id, exhibition);
    }
    async deleteById(id) {
        await this.exhibitionRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/exhibitions', {
        responses: {
            '200': {
                description: 'Exhibition model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Exhibition) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Exhibition, {
                    title: 'NewExhibition',
                    exclude: ['uuid'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ExhibitionController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/exhibitions/count', {
        responses: {
            '200': {
                description: 'Exhibition model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Exhibition)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ExhibitionController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/exhibitions', {
        responses: {
            '200': {
                description: 'Array of Exhibition model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.Exhibition, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Exhibition)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ExhibitionController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/exhibitions', {
        responses: {
            '200': {
                description: 'Exhibition PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Exhibition, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Exhibition)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Exhibition, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ExhibitionController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/exhibitions/{id}', {
        responses: {
            '200': {
                description: 'Exhibition model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Exhibition, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Exhibition, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ExhibitionController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.get('/exhibition/{name}/exists', {
        responses: {
            '200': {
                description: 'Exhibition',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Exhibition),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('name')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ExhibitionController.prototype, "isExhibitionExist", null);
tslib_1.__decorate([
    rest_1.patch('/exhibitions/{id}', {
        responses: {
            '204': {
                description: 'Exhibition PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Exhibition, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Exhibition]),
    tslib_1.__metadata("design:returntype", Promise)
], ExhibitionController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/exhibitions/{id}', {
        responses: {
            '204': {
                description: 'Exhibition PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Exhibition]),
    tslib_1.__metadata("design:returntype", Promise)
], ExhibitionController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/exhibitions/{id}', {
        responses: {
            '204': {
                description: 'Exhibition DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ExhibitionController.prototype, "deleteById", null);
ExhibitionController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.ExhibitionRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ExhibitionRepository])
], ExhibitionController);
exports.ExhibitionController = ExhibitionController;
//# sourceMappingURL=exhibition.controller.js.map