"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const keys_1 = require("../keys");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const services_1 = require("../services");
const core_1 = require("@loopback/core");
let BranchController = class BranchController {
    constructor(branchRepository, userRepository, settingRepository, roleRepository, leadRepository, emailService) {
        this.branchRepository = branchRepository;
        this.userRepository = userRepository;
        this.settingRepository = settingRepository;
        this.roleRepository = roleRepository;
        this.leadRepository = leadRepository;
        this.emailService = emailService;
    }
    async create(branch) {
        const branchExisted = await this.branchRepository.findOne({
            where: { code: branch.code }
        });
        if (!branchExisted) {
            return this.branchRepository.create(branch);
        }
        else {
            throw new rest_1.HttpErrors.BadRequest('This branch code already exists');
        }
    }
    async count(where) {
        return this.branchRepository.count(where);
    }
    async isBranchCodeExists(branchcode) {
        const totalResult = await this.branchRepository.count({
            'code': branchcode
        });
        return {
            exist: totalResult.count > 0
        };
    }
    async isBranchFaxExists(fax) {
        const totalResult = await this.branchRepository.count({
            'faxno': fax
        });
        return {
            exist: totalResult.count > 0
        };
    }
    async isBranchEmailExists(email) {
        const totalResult = await this.branchRepository.count({
            'email': email
        });
        return {
            exist: totalResult.count > 0
        };
    }
    async isBranchTelNoExists(telno) {
        const totalResult = await this.branchRepository.count({
            'telno': telno
        });
        return {
            exist: totalResult.count > 0
        };
    }
    async find(filter) {
        return this.branchRepository.find(filter);
    }
    async updateAll(branch, where) {
        return this.branchRepository.updateAll(branch, where);
    }
    async findById(id, filter) {
        return this.branchRepository.findById(id, filter);
    }
    async updateById(id, branch) {
        await this.branchRepository.updateById(id, branch);
    }
    // Separate endpoint that FE calls only to patch priority / multiplier / leadcapacity
    // so we can reset branch rotation queue
    async updateRotationById(id, branch) {
        console.log('BranchController::updateRotationById');
        await this.branchRepository.updateById(id, branch);
        await this.settingRepository.set(keys_1.KV.SkRRQueue, new models_1.Setting({ key: keys_1.KV.SkRRQueue, value: "" }));
        await this.settingRepository.set(keys_1.KV.SkRRLastInsertedPosition, new models_1.Setting({ key: keys_1.KV.SkRRLastInsertedPosition, value: String(0) }));
        const dbgSuggestedBranch = await this.settingRepository.get(keys_1.KV.SkRRLastSuggestedBranch);
        const dbgInsertedPosition = await this.settingRepository.get(keys_1.KV.SkRRLastInsertedPosition);
        console.log(JSON.stringify({ dbgInsertedPosition, dbgSuggestedBranch }));
    }
    async replaceById(id, branch) {
        await this.branchRepository.replaceById(id, branch);
    }
    async deleteById(id) {
        await this.branchRepository.deleteById(id);
        await this.settingRepository.set(keys_1.KV.SkRRQueue, new models_1.Setting({ key: keys_1.KV.SkRRQueue, value: "" }));
    }
    async GetManager(branchcode, data, filter) {
        return this.notifyQualifiedLeadInBranchManager(branchcode, data.lead, data.userid);
        // return this.branchRepository.findById(branchcode, filter);
    }
    async notifyQualifiedLeadInBranchManager(branchcode, lead, userid) {
        // return lead;
        const salesConsultant = await this.userRepository.findById(userid);
        const roleBranchManager = await this.roleRepository.find({
            where: {
                name: "branchManager"
            }
        });
        const branchManager = await this.roleRepository.users(roleBranchManager[0].uuid).find({
            where: { branchId: branchcode }
        });
        // 
        for (const bm of branchManager) {
            const email = new models_1.Email({
                to: bm.email,
                subject: "Approval for Qualified Lead",
                content: `
        Customer Name: ${lead === null || lead === void 0 ? void 0 : lead.name} <br>
        Customer Contact No.: ${lead === null || lead === void 0 ? void 0 : lead.phone} <br>
        Customer Email: ${lead === null || lead === void 0 ? void 0 : lead.email} <br>
        Date Submitted: ${(new Date()).toDateString()} <br>
        Submitted By : ${salesConsultant === null || salesConsultant === void 0 ? void 0 : salesConsultant.name}  <br><br><br>
       
       ${salesConsultant === null || salesConsultant === void 0 ? void 0 : salesConsultant.name} (${salesConsultant === null || salesConsultant === void 0 ? void 0 : salesConsultant.email}) Seeking approval for this qualified lead. <br>
        `
            });
            await this.emailService.sendMail(email);
        }
        return lead;
    }
};
tslib_1.__decorate([
    rest_1.post('/branches', {
        responses: {
            '200': {
                description: 'Branch model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Branch) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Branch, {
                    title: 'NewBranch',
                    exclude: ['uuid'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BranchController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/branches/count', {
        responses: {
            '200': {
                description: 'Branch model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Branch)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BranchController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/branch/{branchcode}/exists', {
        responses: {
            '200': {
                description: 'Branch',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Branch),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('branchcode')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BranchController.prototype, "isBranchCodeExists", null);
tslib_1.__decorate([
    rest_1.get('/branch/fax/{fax}/exists', {
        responses: {
            '200': {
                description: 'Branch',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Branch),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('fax')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BranchController.prototype, "isBranchFaxExists", null);
tslib_1.__decorate([
    rest_1.get('/branch/email/{email}/exists', {
        responses: {
            '200': {
                description: 'Branch',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Branch),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('email')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BranchController.prototype, "isBranchEmailExists", null);
tslib_1.__decorate([
    rest_1.get('/branch/telno/{telno}/exists', {
        responses: {
            '200': {
                description: 'Branch',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Branch),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('telno')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BranchController.prototype, "isBranchTelNoExists", null);
tslib_1.__decorate([
    rest_1.get('/branches', {
        responses: {
            '200': {
                description: 'Array of Branch model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.Branch, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Branch)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BranchController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/branches', {
        responses: {
            '200': {
                description: 'Branch PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Branch, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Branch)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Branch, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BranchController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/branches/{id}', {
        responses: {
            '200': {
                description: 'Branch model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Branch, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Branch, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BranchController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/branches/{id}', {
        responses: {
            '204': {
                description: 'Branch PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Branch, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Branch]),
    tslib_1.__metadata("design:returntype", Promise)
], BranchController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.patch('/branches/{id}/rotation', {
        responses: {
            '204': {
                description: 'Branch PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Branch, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Branch]),
    tslib_1.__metadata("design:returntype", Promise)
], BranchController.prototype, "updateRotationById", null);
tslib_1.__decorate([
    rest_1.put('/branches/{id}', {
        responses: {
            '204': {
                description: 'Branch PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Branch]),
    tslib_1.__metadata("design:returntype", Promise)
], BranchController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/branches/{id}', {
        responses: {
            '204': {
                description: 'Branch DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], BranchController.prototype, "deleteById", null);
tslib_1.__decorate([
    rest_1.post('/branch/{branchcode}/getmanager', {
        responses: {
            '200': {
                description: 'Branch',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Branch),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('branchcode')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__param(2, rest_1.param.filter(models_1.Branch, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BranchController.prototype, "GetManager", null);
BranchController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.BranchRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.UserRepository)),
    tslib_1.__param(2, repository_1.repository(repositories_1.SettingRepository)),
    tslib_1.__param(3, repository_1.repository(repositories_1.RoleRepository)),
    tslib_1.__param(4, repository_1.repository(repositories_1.LeadRepository)),
    tslib_1.__param(5, core_1.inject('services.EmailService')),
    tslib_1.__metadata("design:paramtypes", [repositories_1.BranchRepository,
        repositories_1.UserRepository,
        repositories_1.SettingRepository,
        repositories_1.RoleRepository,
        repositories_1.LeadRepository,
        services_1.EmailService])
], BranchController);
exports.BranchController = BranchController;
//# sourceMappingURL=branch.controller.js.map