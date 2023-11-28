"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const _1 = require(".");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const services_1 = require("../services");
const keys_1 = require("./../keys");
let LeadController = class LeadController {
    constructor(leadRepository, branchRepository, settingRepository, roleRepository, userRoleRepository, userRepository, designRepository, branchController, fileService, emailService, request, response) {
        this.leadRepository = leadRepository;
        this.branchRepository = branchRepository;
        this.settingRepository = settingRepository;
        this.roleRepository = roleRepository;
        this.userRoleRepository = userRoleRepository;
        this.userRepository = userRepository;
        this.designRepository = designRepository;
        this.branchController = branchController;
        this.fileService = fileService;
        this.emailService = emailService;
        this.request = request;
        this.response = response;
    }
    //return this.LeadRepository.branch(id);
    async create(lead) {
        return this.leadRepository.create(lead);
    }
    async createOnlineLead(lead) {
        lead.state = 'OL';
        lead.status = 'raw';
        return this.leadRepository.create(lead);
    }
    async findById(id, filter) {
        return this.leadRepository.findById(id, filter);
    }
    async count(where) {
        return this.leadRepository.count(where);
    }
    async find(filter) {
        // return this.leadRepository.find(filter!);
        return this.leadRepository.find({ include: [{ relation: 'designs' }, { relation: 'finalConfirmationOrders' }] }); // hasMany Relation
        // return this.leadRepository.find({include: [{relation: 'finalConfirmationOrders',scope: {include: [{relation:'designs'}]}}]});    // hasMany Nested Relation
    }
    async disqualifyLeadsAfterOneMonth() {
        /* Automatically disqualify leads if their last updatedAt date is 1 month ago from today
        Following criterion:
        - Lead state in both Qualified Leads and Online Leads
        - Updated at was more than 1 month ago
        - Lead status that are 'New'
    
        ^^ Reasoning: new leads that are both OL and QL, which were last touched 1 month ago are considered as not useful anymore, hence disqualifying
        */
        const cutOffDate = new Date();
        cutOffDate.setMonth(cutOffDate.getMonth() - 1);
        const disqualifyFilter = { where: { updatedAt: { lt: cutOffDate }, state: { inq: ['QL', 'OL'] }, status: { inq: ['New'] } } };
        // Pending Decision, Assigned, Pending Visit
        // TODO: Ask which status of the lead should be disqualified automatically? currently it is only for new leads not processed
        const disqualifyLeads = await this.leadRepository.find(disqualifyFilter);
        for (const disqualifyLead of disqualifyLeads) {
            disqualifyLead.status = 'disqualify';
            await this.leadRepository.updateById(disqualifyLead.uuid, disqualifyLead);
        }
        return disqualifyLeads; // CRON JOB: Server has a cronjob to call this endpoint once every day
        /*
          Simple cronjob script for calling this endpoint every day, to be attached in `crontab -e`
          =====================
          0 0 * * * /usr/bin/curl --silent http://localhost:3000/leads/disqualify/expired
        */
    }
    async updateAll(lead, where) {
        return this.leadRepository.updateAll(lead, where);
    }
    async isLeadPhoneExists(phone) {
        const totalResult = await this.leadRepository.count({
            'phone': phone
        });
        return {
            exist: totalResult.count > 0
        };
    }
    async isLeadEmailExists(email) {
        const totalResult = await this.leadRepository.count({
            'email': email
        });
        return {
            exist: totalResult.count > 0
        };
    }
    async getBranchSuggestion() {
        const kvRRQueue = await this.settingRepository.get(keys_1.KV.SkRRQueue);
        // Parse json from redis if queue in redis has value,
        // else get all branches with leadcapacity not 0 and sort
        // by priority
        const rrBranches = kvRRQueue.value ?
            JSON.parse(kvRRQueue.value)
            : await this.branchRepository.find({
                where: {
                    and: [
                        { leadcapacity: { neq: 0 } }
                    ]
                },
                order: ['priority ASC']
            });
        if (!rrBranches.length) {
            throw new rest_1.HttpErrors.BadRequest('Invalid suggestion algorithm. Please add branch to suggestion engine.');
        }
        const kvRRLastInsertedBranch = await this.settingRepository.get(keys_1.KV.SkRRLastInsertedBranch);
        const kvRRLastInsertedPosition = await this.settingRepository.get(keys_1.KV.SkRRLastInsertedPosition);
        if (!kvRRLastInsertedBranch.value.length) {
            const suggestedBranch = rrBranches[0];
            await this.settingRepository.set(keys_1.KV.SkRRLastSuggestedBranch, new models_1.Setting({ key: keys_1.KV.SkRRLastSuggestedBranch, value: suggestedBranch.uuid }));
            return { branch: suggestedBranch.uuid };
        }
        const lastInsertedPosition = Number(kvRRLastInsertedPosition.value);
        let index = rrBranches.findIndex((branch) => branch.uuid === kvRRLastInsertedBranch.value);
        if (lastInsertedPosition >= rrBranches[index].leadcapacity) {
            index = index + 1 === rrBranches.length ? 0 : ++index;
        }
        const suggestedBranch = rrBranches[index];
        await this.settingRepository.set(keys_1.KV.SkRRLastSuggestedBranch, new models_1.Setting({ key: keys_1.KV.SkRRLastSuggestedBranch, value: suggestedBranch.uuid }));
        return { branch: suggestedBranch.uuid };
    }
    async assignToBranch(id, lead) {
        console.log('LeadController::assignToBranch');
        console.log(lead);
        const kvRRLastSuggestedBranch = await this.settingRepository.get(keys_1.KV.SkRRLastSuggestedBranch);
        const kvRRLastInsertedPosition = await this.settingRepository.get(keys_1.KV.SkRRLastInsertedPosition);
        console.log(JSON.stringify({ kvRRLastSuggestedBranch, kvRRLastInsertedPosition }));
        if (kvRRLastSuggestedBranch.value !== lead.branchId) {
            console.log('Not inserting in suggested branch...');
            // If we are not inserting in suggested branch, next suggest will be the
            // branch we're inserting into.
            await this.settingRepository.set(keys_1.KV.SkRRLastInsertedBranch, new models_1.Setting({ key: keys_1.KV.SkRRLastInsertedBranch, value: lead.branchId }));
            // Here we set the inserted position to 1 because we already have
            // inserted into the branch.
            await this.settingRepository.set(keys_1.KV.SkRRLastInsertedPosition, new models_1.Setting({ key: keys_1.KV.SkRRLastInsertedPosition, value: String(1) }));
            await this.leadRepository.updateById(id, lead);
            await this.notifyNewQualifiedLeadInBranch(id);
            return;
        }
        console.log('Inserting in suggested branch...');
        const lastSuggestedBranch = await this
            .branchRepository
            .findById(kvRRLastSuggestedBranch.value);
        const insertingPos = Number(kvRRLastInsertedPosition.value) + 1;
        await this.settingRepository.set(keys_1.KV.SkRRLastInsertedPosition, new models_1.Setting({ key: keys_1.KV.SkRRLastInsertedPosition, value: String(insertingPos) }));
        // If we are inserting at the maximum, next suggest will be the next branch.
        if (insertingPos >= lastSuggestedBranch.leadcapacity) {
            const kvRRQueue = await this
                .settingRepository
                .get(keys_1.KV.SkRRQueue);
            // Parse json from redis if queue in redis has value,
            // else get all branches with leadcapacity not 0 and sort
            // by priority
            const rrQueue = kvRRQueue.value ?
                JSON.parse(kvRRQueue.value)
                : await this.branchRepository.find({
                    where: {
                        and: [
                            { leadcapacity: { neq: 0 } }
                        ]
                    },
                    order: ['priority ASC']
                });
            console.log(JSON.stringify({ rrQueue }));
            let index = rrQueue
                .findIndex((branch) => branch.uuid === kvRRLastSuggestedBranch.value);
            const nextIndex = index + 1 === rrQueue.length ? 0 : ++index;
            const nextBranch = rrQueue[nextIndex];
            console.log(JSON.stringify({ nextBranch }));
            await this.settingRepository.set(keys_1.KV.SkRRLastInsertedBranch, new models_1.Setting({ key: keys_1.KV.SkRRLastInsertedBranch, value: nextBranch.uuid }));
            // Here we set inserted position to 0 because we have not inserted
            // into the next branch yet.
            await this.settingRepository.set(keys_1.KV.SkRRLastInsertedPosition, new models_1.Setting({ key: keys_1.KV.SkRRLastInsertedPosition, value: String(0) }));
        }
        const dbgSuggestedBranch = await this
            .settingRepository
            .get(keys_1.KV.SkRRLastSuggestedBranch);
        const dbgInsertedPosition = await this
            .settingRepository
            .get(keys_1.KV.SkRRLastInsertedPosition);
        console.log(JSON.stringify({ dbgInsertedPosition, dbgSuggestedBranch }));
        await this.leadRepository.updateById(id, lead);
        await this.notifyNewQualifiedLeadInBranch(id);
    }
    async updateById(id, lead) {
        console.log('done here');
        return this.leadRepository.updateById(id, lead);
    }
    async replaceById(id, lead) {
        await this.leadRepository.replaceById(id, lead);
    }
    async deleteById(id) {
        await this.leadRepository.deleteById(id);
    }
    async delete() {
        const leadIds = await this.leadRepository.find();
        for (const lead of leadIds) {
            await this.leadRepository.deleteById(lead.uuid);
        }
    }
    async notifyNewQualifiedLeadInBranch(id) {
        const lead = await this.leadRepository.findById(id);
        const roleBranchManager = await this.roleRepository.find({
            where: {
                name: "branchManager"
            }
        });
        const OL = await this.leadRepository.findOne({
            where: {
                uuid: id
            }
        });
        const branchManager = await this.roleRepository.users(roleBranchManager[0].uuid).find({
            where: { branchId: lead.branchId }
        });
        for (const bm of branchManager) {
            const email = new models_1.Email({
                to: bm.email,
                subject: "New Qualified Lead",
                content: `
        A new lead has been assigned to your branch. <br>
        <br>
        Customer Name: ${OL === null || OL === void 0 ? void 0 : OL.name} <br>
        Customer Contact No.: ${OL === null || OL === void 0 ? void 0 : OL.phone} <br>
        Customer Email: ${OL === null || OL === void 0 ? void 0 : OL.email} <br>
        Date Assigned: ${(new Date()).toDateString()}
        <br>
        Remarks: ${OL === null || OL === void 0 ? void 0 : OL.noteToBranch} <br>
        `
            });
            await this.emailService.sendMail(email);
        }
        const leadUser = await this.leadRepository.findOne({
            where: { uuid: id }
        });
        const sc = await this.userRepository.findOne({
            where: {
                uuid: lead.userId
            }
        });
        if (leadUser) {
            if (lead.userId && sc) {
                const email = new models_1.Email({
                    to: sc.email,
                    subject: 'New Qualified Lead',
                    // content: "You have received a new qualified lead" +
                    // "<br>Name: " + OL?.name +
                    // "<br> Tel. No: " + OL?.phone
                    content: `
          A new qualified lead has been assigned to you. <br>
          <br>
          Customer Name: ${OL === null || OL === void 0 ? void 0 : OL.name} <br>
          Customer Contact No.: ${OL === null || OL === void 0 ? void 0 : OL.phone} <br>
          Customer Email: ${OL === null || OL === void 0 ? void 0 : OL.email} <br>
          Date Assigned: ${(new Date()).toDateString()}
          <br>
          Remarks: ${OL === null || OL === void 0 ? void 0 : OL.noteToBranch} <br>
          `
                });
                await this.emailService.sendMail(email);
            }
        }
    }
    async ChangeCampaign(data) {
        return this.RequestCampaignChange(data.data, data.userid);
    }
    async RequestCampaignChange(data, userid) {
        // return data.user.uuid;
        const val = data.data;
        const lead = await this.leadRepository.findById(data.user.uuid);
        const salesConsultant = await this.userRepository.findById(userid);
        const roleBranchManager = await this.roleRepository.find({
            where: {
                name: "branchManager"
            }
        });
        const OL = await this.leadRepository.findOne({
            where: {
                uuid: data.user.uuid
            }
        });
        const branchManager = await this.roleRepository.users(roleBranchManager[0].uuid).find({
            where: { branchId: lead.branchId }
        });
        // return branchManager;
        for (const bm of branchManager) {
            const email = new models_1.Email({
                to: bm.email,
                subject: "Campaign Change for Qualified Lead",
                content: `
        Customer Name: ${lead === null || lead === void 0 ? void 0 : lead.name} <br>
        Customer Contact No.: ${lead === null || lead === void 0 ? void 0 : lead.phone} <br>
        Customer Email: ${lead === null || lead === void 0 ? void 0 : lead.email} <br>
        Previous Campaign: ${lead === null || lead === void 0 ? void 0 : lead.campaign} <br>
        Requested Campaign: ${val === null || val === void 0 ? void 0 : val.campaign} <br>
        Date Submitted: ${(new Date()).toDateString()} <br>
        Submitted By : ${salesConsultant === null || salesConsultant === void 0 ? void 0 : salesConsultant.name}  <br><br><br>

       ${salesConsultant === null || salesConsultant === void 0 ? void 0 : salesConsultant.name} (${salesConsultant === null || salesConsultant === void 0 ? void 0 : salesConsultant.email}) Request to change campaign for this qualified lead. <br>
        `
            });
            await this.emailService.sendMail(email);
        }
        return data;
    }
};
tslib_1.__decorate([
    rest_1.post('/leads', {
        responses: {
            '200': {
                description: 'Lead model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Lead) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Lead, {
                    title: 'NewLead',
                    exclude: ['uuid'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.post('/leads/online', {
        responses: {
            '200': {
                description: 'Lead model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Lead) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Lead, {
                    title: 'NewLead',
                    exclude: ['uuid'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "createOnlineLead", null);
tslib_1.__decorate([
    rest_1.get('/leads/{id}', {
        responses: {
            '200': {
                description: 'Lead model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Lead, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Lead, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.get('/leads/count', {
        responses: {
            '200': {
                description: 'Lead model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Lead)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/leads', {
        responses: {
            '200': {
                description: 'Array of Lead model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.Lead, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Lead)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.get('/leads/disqualify/expired', {
        responses: {
            '200': {
                description: 'Endpoint for disqualifying expired leads (last updated at was 30 days or more)',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.Lead, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "disqualifyLeadsAfterOneMonth", null);
tslib_1.__decorate([
    rest_1.patch('/leads', {
        responses: {
            '200': {
                description: 'Lead PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Lead, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Lead)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Lead, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/leads/phone/{phone}/exists', {
        responses: {
            '200': {
                description: 'Lead',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Lead),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('phone')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "isLeadPhoneExists", null);
tslib_1.__decorate([
    rest_1.get('/leads/email/{email}/exists', {
        responses: {
            '200': {
                description: 'Lead',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Lead),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('email')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "isLeadEmailExists", null);
tslib_1.__decorate([
    rest_1.get('/leads/branch-suggestion', {
        responses: {
            '200': {
                description: 'Lead model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Lead, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "getBranchSuggestion", null);
tslib_1.__decorate([
    rest_1.post('leads/{id}/assign-to-branch', {
        responses: {
            '204': {
                description: 'Lead assign to branch success',
            }
        }
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Lead, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Lead]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "assignToBranch", null);
tslib_1.__decorate([
    rest_1.patch('/leads/{id}', {
        responses: {
            '204': {
                description: 'Lead PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Lead, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Lead]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/leads/{id}', {
        responses: {
            '204': {
                description: 'Lead PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Lead]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/leads/{id}', {
        responses: {
            '204': {
                description: 'Lead DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "deleteById", null);
tslib_1.__decorate([
    rest_1.del('/leads', {
        responses: {
            '204': {
                description: 'Lead DELETE success',
            },
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "delete", null);
tslib_1.__decorate([
    rest_1.post('/lead/changecampaign', {
        responses: {
            '200': {
                description: 'Lead Campaign Change Request Success'
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LeadController.prototype, "ChangeCampaign", null);
LeadController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.LeadRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.BranchRepository)),
    tslib_1.__param(2, repository_1.repository(repositories_1.SettingRepository)),
    tslib_1.__param(3, repository_1.repository(repositories_1.RoleRepository)),
    tslib_1.__param(4, repository_1.repository(repositories_1.UserRoleRepository)),
    tslib_1.__param(5, repository_1.repository(repositories_1.UserRepository)),
    tslib_1.__param(6, repository_1.repository(repositories_1.DesignRepository)),
    tslib_1.__param(7, core_1.inject('controllers.BranchController')),
    tslib_1.__param(8, core_1.inject('services.FileService')),
    tslib_1.__param(9, core_1.inject('services.EmailService')),
    tslib_1.__param(10, core_1.inject(rest_1.RestBindings.Http.REQUEST)),
    tslib_1.__param(11, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.LeadRepository,
        repositories_1.BranchRepository,
        repositories_1.SettingRepository,
        repositories_1.RoleRepository,
        repositories_1.UserRoleRepository,
        repositories_1.UserRepository,
        repositories_1.DesignRepository,
        _1.BranchController, Object, services_1.EmailService, Object, Object])
], LeadController);
exports.LeadController = LeadController;
//# sourceMappingURL=lead.controller.js.map