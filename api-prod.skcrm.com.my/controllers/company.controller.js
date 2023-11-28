"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let CompanyController = class CompanyController {
    constructor(companyRepository) {
        this.companyRepository = companyRepository;
    }
    async create(company) {
        return this.companyRepository.create(company);
    }
    async count(where) {
        return this.companyRepository.count(where);
    }
    async find(filter) {
        return this.companyRepository.find(filter);
    }
    async updateAll(company, where) {
        return this.companyRepository.updateAll(company, where);
    }
    async findById(id, filter) {
        return this.companyRepository.findById(id, filter);
    }
    async updateById(id, company) {
        await this.companyRepository.updateById(id, company);
    }
    async replaceById(id, company) {
        await this.companyRepository.replaceById(id, company);
    }
    async deleteById(id) {
        await this.companyRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/company', {
        responses: {
            '200': {
                description: 'Company model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Company) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Company, {
                    title: 'NewCompany',
                    exclude: ['uuid'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CompanyController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/company/count', {
        responses: {
            '200': {
                description: 'Company model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Company)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CompanyController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/company', {
        responses: {
            '200': {
                description: 'Array of Company model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.Company, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Company)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CompanyController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/company', {
        responses: {
            '200': {
                description: 'Company PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Company, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Company)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Company, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CompanyController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/company/{id}', {
        responses: {
            '200': {
                description: 'Company model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Company, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Company, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CompanyController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/company/{id}', {
        responses: {
            '204': {
                description: 'Company PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Company, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Company]),
    tslib_1.__metadata("design:returntype", Promise)
], CompanyController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/company/{id}', {
        responses: {
            '204': {
                description: 'Company PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Company]),
    tslib_1.__metadata("design:returntype", Promise)
], CompanyController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/company/{id}', {
        responses: {
            '204': {
                description: 'Company DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], CompanyController.prototype, "deleteById", null);
CompanyController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.CompanyRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.CompanyRepository])
], CompanyController);
exports.CompanyController = CompanyController;
//# sourceMappingURL=company.controller.js.map