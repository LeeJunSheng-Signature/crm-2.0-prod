"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinalConfirmationOrderController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const services_1 = require("../services");
const order_state_enum_1 = require("../types/order-state.enum");
let FinalConfirmationOrderController = class FinalConfirmationOrderController {
    constructor(finalConfirmationOrderRepository, roleRepository, branchRepository, designCreateCronJobRepository, emailService) {
        this.finalConfirmationOrderRepository = finalConfirmationOrderRepository;
        this.roleRepository = roleRepository;
        this.branchRepository = branchRepository;
        this.designCreateCronJobRepository = designCreateCronJobRepository;
        this.emailService = emailService;
    }
    async create(finalConfirmationOrder) {
        return this.finalConfirmationOrderRepository.create(finalConfirmationOrder);
    }
    async createCronJob(designCreateCronJob) {
        return this.designCreateCronJobRepository.create(designCreateCronJob);
    }
    async count(where) {
        return this.finalConfirmationOrderRepository.count(where);
    }
    async find(filter) {
        // return this.finalConfirmationOrderRepository.find(filter);
        return this.finalConfirmationOrderRepository.find({ include: [{ relation: 'designs' }, { relation: 'paymentAttachments' }] });
    }
    async updateAll(finalConfirmationOrder, where) {
        return this.finalConfirmationOrderRepository.updateAll(finalConfirmationOrder, where);
    }
    async findById(id, filter) {
        return this.finalConfirmationOrderRepository.findById(id, filter);
    }
    async updateById(id, finalConfirmationOrder) {
        const fco = await this.finalConfirmationOrderRepository.findById(id);
        await this.finalConfirmationOrderRepository.updateById(id, finalConfirmationOrder);
        if (fco.state !== order_state_enum_1.OrderState.FinalConfirmationOrder)
            return;
        if (!finalConfirmationOrder.status)
            return;
        if (fco.status === finalConfirmationOrder.status)
            return;
        // if(fco.cancelReason === finalConfirmationOrder.cancelReason) return
        // if(fco.cancelRemark === finalConfirmationOrder.cancelRemark) return
        if (finalConfirmationOrder.status === order_state_enum_1.FCOStatus.Submitted) {
            return this.notifyFinalConfirmationOrderToRole('hQAccountant', id);
        }
        if (finalConfirmationOrder.status === order_state_enum_1.FCOStatus.PendingDetailer) {
            return this.notifyFinalConfirmationOrderToRole('detailer', id);
        }
    }
    async replaceById(id, finalConfirmationOrder) {
        await this.finalConfirmationOrderRepository.replaceById(id, finalConfirmationOrder);
    }
    async deleteById(id) {
        await this.finalConfirmationOrderRepository.deleteById(id);
    }
    async notifyFinalConfirmationOrderToRole(roleName, orderId) {
        const role = await this
            .roleRepository
            .findOne({ where: { name: roleName } });
        const fcoLead = await this.finalConfirmationOrderRepository.lead(orderId);
        const fcoLeadBranch = await this.branchRepository.findById(fcoLead.branchId);
        const users = await this
            .roleRepository
            .users(role.uuid)
            .find();
        const fcoDesigns = await this
            .finalConfirmationOrderRepository
            .designs(orderId)
            .find();
        const totalAmount = parseFloat(fcoDesigns.reduce((acc, design) => acc + design.totalPrice, 0).toFixed(2));
        for (const user of users) {
            const email = new models_1.Email({
                to: user.email,
                subject: 'A new Final Confirmation Order has been produced',
                content: `
            Customer Name: ${fcoLead.name} <br>
            Order Amount: RM ${totalAmount} <br>
            Branch: ${fcoLeadBranch.name}
            <br>
            Date produced: ${(new Date()).toDateString()}
            `
            });
            await this.emailService.sendMail(email);
        }
    }
};
tslib_1.__decorate([
    rest_1.post('/final-confirmation-orders', {
        responses: {
            '200': {
                description: 'FinalConfirmationOrder model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.FinalConfirmationOrder) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.FinalConfirmationOrder, {
                    title: 'NewFinalConfirmationOrder',
                    exclude: ['uuid'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FinalConfirmationOrderController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.post('/final-confirmation-orders/create-cron-job', {
        responses: {
            '200': {
                description: 'DesignCreateCronJob model instance',
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.DesignCreateCronJob, {
                    title: 'NewDesignCreateCronJob',
                    exclude: ['uuid'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FinalConfirmationOrderController.prototype, "createCronJob", null);
tslib_1.__decorate([
    rest_1.get('/final-confirmation-orders/count', {
        responses: {
            '200': {
                description: 'FinalConfirmationOrder model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.FinalConfirmationOrder)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FinalConfirmationOrderController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/final-confirmation-orders', {
        responses: {
            '200': {
                description: 'Array of FinalConfirmationOrder model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.FinalConfirmationOrder, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.FinalConfirmationOrder)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FinalConfirmationOrderController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/final-confirmation-orders', {
        responses: {
            '200': {
                description: 'FinalConfirmationOrder PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.FinalConfirmationOrder, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.FinalConfirmationOrder)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.FinalConfirmationOrder, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FinalConfirmationOrderController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/final-confirmation-orders/{id}', {
        responses: {
            '200': {
                description: 'FinalConfirmationOrder model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.FinalConfirmationOrder, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.FinalConfirmationOrder, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FinalConfirmationOrderController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/final-confirmation-orders/{id}', {
        responses: {
            '204': {
                description: 'FinalConfirmationOrder PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.FinalConfirmationOrder, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.FinalConfirmationOrder]),
    tslib_1.__metadata("design:returntype", Promise)
], FinalConfirmationOrderController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/final-confirmation-orders/{id}', {
        responses: {
            '204': {
                description: 'FinalConfirmationOrder PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.FinalConfirmationOrder]),
    tslib_1.__metadata("design:returntype", Promise)
], FinalConfirmationOrderController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/final-confirmation-orders/{id}', {
        responses: {
            '204': {
                description: 'FinalConfirmationOrder DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], FinalConfirmationOrderController.prototype, "deleteById", null);
FinalConfirmationOrderController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.FinalConfirmationOrderRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.RoleRepository)),
    tslib_1.__param(2, repository_1.repository(repositories_1.BranchRepository)),
    tslib_1.__param(3, repository_1.repository(repositories_1.DesignCreateCronJobRepository)),
    tslib_1.__param(4, core_1.inject('services.EmailService')),
    tslib_1.__metadata("design:paramtypes", [repositories_1.FinalConfirmationOrderRepository,
        repositories_1.RoleRepository,
        repositories_1.BranchRepository,
        repositories_1.DesignCreateCronJobRepository,
        services_1.EmailService])
], FinalConfirmationOrderController);
exports.FinalConfirmationOrderController = FinalConfirmationOrderController;
//# sourceMappingURL=final-confirmation-order.controller.js.map