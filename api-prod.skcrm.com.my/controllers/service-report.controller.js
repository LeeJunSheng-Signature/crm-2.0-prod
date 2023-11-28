"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceReportController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const service_report_calculate_schema_1 = require("../schema/service-report-calculate-schema");
const services_1 = require("../services");
const service_report_state_enum_1 = require("../types/service-report-state.enum");
const service_report_types_enum_1 = require("../types/service-report-types.enum");
let ServiceReportController = class ServiceReportController {
    constructor(serviceReportRepository, leadRepository, userRepository, roleRepository, serviceReportItemRepository, serviceReportMaterialRepository, getCurrentUser, emailService) {
        this.serviceReportRepository = serviceReportRepository;
        this.leadRepository = leadRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.serviceReportItemRepository = serviceReportItemRepository;
        this.serviceReportMaterialRepository = serviceReportMaterialRepository;
        this.getCurrentUser = getCurrentUser;
        this.emailService = emailService;
    }
    async create(serviceReport) {
        const currentUser = await this.getCurrentUser();
        serviceReport.userId = currentUser.user;
        serviceReport.state = service_report_state_enum_1.ServiceReportState.New;
        if (serviceReport.type === service_report_types_enum_1.ServiceReportType.ServiceReport) {
            const { count } = await this.serviceReportRepository.count({
                and: [
                    { type: service_report_types_enum_1.ServiceReportType.ServiceReport },
                    { jobNumber: serviceReport.jobNumber },
                ]
            });
            serviceReport.count = count + 1;
            if (serviceReport.count === 1) {
                const { count } = await this.serviceReportRepository.count({
                    and: [
                        { type: service_report_types_enum_1.ServiceReportType.ServiceReport },
                        { count: 1 },
                    ]
                });
                serviceReport.LogNumber = (count + 1).toString();
            }
            else {
                const SR = await this.serviceReportRepository.find({
                    where: {
                        and: [
                            { type: service_report_types_enum_1.ServiceReportType.ServiceReport },
                            { jobNumber: serviceReport.jobNumber },
                        ]
                    }
                });
                serviceReport.LogNumber = SR[0].LogNumber;
            }
        }
        if (serviceReport.type === service_report_types_enum_1.ServiceReportType.MaintenanceReport) {
            const { count } = await this.serviceReportRepository.count({
                type: service_report_types_enum_1.ServiceReportType.MaintenanceReport
            });
            serviceReport.maintenanceReportJobNumber = (60000 + count).toString();
            if (count === 0) {
                const { count } = await this.serviceReportRepository.count({
                    and: [
                        { type: service_report_types_enum_1.ServiceReportType.MaintenanceReport },
                        { count: 1 },
                    ]
                });
                serviceReport.LogNumber = (count + 1).toString();
            }
            else {
                const SR = await this.serviceReportRepository.find({
                    where: {
                        and: [
                            { type: service_report_types_enum_1.ServiceReportType.MaintenanceReport },
                            { jobNumber: serviceReport.jobNumber },
                        ]
                    }
                });
                serviceReport.LogNumber = SR[0].LogNumber;
            }
        }
        const sr = await this.serviceReportRepository.create(serviceReport);
        await this.notifyNewServiceOrMaintenanceReport(sr);
        return sr;
    }
    async calculate(id, itemsData) {
        var _a;
        await this.serviceReportRepository.items(id).delete();
        await this.serviceReportRepository.customItems(id).delete();
        const { items, customItems } = itemsData;
        for (const item of items) {
            const serviceReportItem = await this
                .serviceReportItemRepository
                .findById(item.serviceReportItemId);
            const width = parseFloat(item.width.split('/')[0]);
            const height = parseFloat(item.height.split('/')[0]);
            if (serviceReportItem.isCategory('Customised Furniture')
                && !serviceReportItem.isSubcategoryIn(['Sliding door', 'carcass'])) {
                const material = await this
                    .serviceReportMaterialRepository
                    .findById(item.serviceReportMaterialId);
                item.unitPrice =
                    (width / 1000) * (height / 1000) * material.price * serviceReportItem.markuprate;
            }
            else if (serviceReportItem.isCategory('Fitting and Accessories')
                && serviceReportItem.isSubcategoryIn(['Sliding Track', 'Recess Rail', 'LCU Channel', 'Alu Plinth'])) {
                item.unitPrice = (width / 1000) * serviceReportItem.stdcost * serviceReportItem.markuprate;
            }
            else {
                item.unitPrice = serviceReportItem.stdcost * serviceReportItem.markuprate;
            }
            const { unitPrice, quantity } = item;
            item.amount = unitPrice * quantity;
            item.SMPrice = item.amount * ((_a = serviceReportItem.SMPrice) !== null && _a !== void 0 ? _a : 0);
            await this.serviceReportRepository.items(id).create(item);
        }
        for (const customItem of customItems) {
            customItem.amount = customItem.unitPrice * customItem.quantity;
            await this.serviceReportRepository.customItems(id).create(customItem);
        }
        return this.serviceReportRepository.findById(id);
    }
    async count(where) {
        return this.serviceReportRepository.count(where);
    }
    async find(filter) {
        return this.serviceReportRepository.find(filter);
    }
    async updateAll(serviceReport, where) {
        return this.serviceReportRepository.updateAll(serviceReport, where);
    }
    async findById(id, filter) {
        return this.serviceReportRepository.findById(id, filter);
    }
    async updateById(id, serviceReport) {
        if ([
            service_report_state_enum_1.ServiceReportState.Logistic,
            service_report_state_enum_1.ServiceReportState.Purchaser,
            service_report_state_enum_1.ServiceReportState.Production,
            service_report_state_enum_1.ServiceReportState.Closed,
        ].includes(serviceReport.state)) {
            serviceReport.processedAt = new Date();
        }
        if (serviceReport.state === service_report_state_enum_1.ServiceReportState.Detailer && !serviceReport.submittedAt) {
            serviceReport.submittedAt = new Date();
        }
        const sr = await this.serviceReportRepository.findById(id);
        await this.serviceReportRepository.updateById(id, serviceReport);
        if (!serviceReport.state)
            return;
        if (sr.state === serviceReport.state)
            return;
        if ([
            service_report_state_enum_1.ServiceReportState.Logistic,
            service_report_state_enum_1.ServiceReportState.Purchaser,
            service_report_state_enum_1.ServiceReportState.Production,
        ].includes(serviceReport.state)) {
            const stateToRoleName = (state) => {
                if (state === service_report_state_enum_1.ServiceReportState.Purchaser)
                    return 'purchaser';
                if (state === service_report_state_enum_1.ServiceReportState.Logistic)
                    return 'logistic';
                else
                    return 'factory';
            };
            const roleName = stateToRoleName(serviceReport.state);
            await this.notifyServiceOrMaintenanceReportToRole(roleName, sr);
        }
    }
    async replaceById(id, serviceReport) {
        await this.serviceReportRepository.replaceById(id, serviceReport);
    }
    async deleteById(id) {
        await this.serviceReportRepository.deleteById(id);
    }
    async notifyServiceOrMaintenanceReportToRole(roleName, report) {
        const subjectReportType = report.type === service_report_types_enum_1.ServiceReportType.ServiceReport
            ? 'Service Report'
            : 'Maintenance Report';
        const role = await this
            .roleRepository
            .findOne({ where: { name: roleName } });
        const users = await this
            .roleRepository
            .users(role.uuid)
            .find();
        const reportLead = report.leadId ?
            await this.leadRepository.findById(report.leadId)
            : report.leadManualInput;
        for (const user of users) {
            const email = new models_1.Email({
                to: user.email,
                subject: `A new ${subjectReportType} has been produced`,
                content: `
            Customer Name: ${reportLead.name} <br>
            Job Number: ${report.jobNumber} <br>
            <br>
            Date produced: ${(new Date()).toDateString()}
            `
            });
            await this.emailService.sendMail(email);
        }
    }
    async notifyNewServiceOrMaintenanceReport(report) {
        const salesConsultant = await this.userRepository.findById(report.userId);
        const subjectReportType = report.type === service_report_types_enum_1.ServiceReportType.ServiceReport
            ? 'Service Report'
            : 'Maintenance Report';
        const role = await this
            .roleRepository
            .findOne({ where: { name: 'detailer' } });
        const detailers = await this
            .roleRepository
            .users(role.uuid)
            .find();
        const reportLead = report.leadId ?
            await this.leadRepository.findById(report.leadId)
            : report.leadManualInput;
        for (const detailer of detailers) {
            const email = new models_1.Email({
                to: detailer.email,
                subject: `A new ${subjectReportType} has been produced`,
                content: `
            Customer Name: ${reportLead.name} <br>
            Sales Consultant: ${salesConsultant.name} <br>
            <br>
            Date produced: ${(new Date()).toDateString()}
            `
            });
            await this.emailService.sendMail(email);
        }
    }
};
tslib_1.__decorate([
    rest_1.post('/service-reports', {
        responses: {
            '200': {
                description: 'ServiceReport model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.ServiceReport) } },
            }
        }
    }),
    authentication_1.authenticate('jwt'),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.ServiceReport, {
                    title: 'NewServiceReport',
                    exclude: ['uuid'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceReportController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.post('/service-reports/{id}/calculate', {
        responses: {
            '200': {
                description: 'ServiceReport model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.ServiceReport) } },
            }
        }
    }),
    authentication_1.authenticate('jwt'),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: service_report_calculate_schema_1.ServiceReportCalculateSchema,
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceReportController.prototype, "calculate", null);
tslib_1.__decorate([
    rest_1.get('/service-reports/count', {
        responses: {
            '200': {
                description: 'ServiceReport model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            }
        }
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.ServiceReport)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceReportController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/service-reports', {
        responses: {
            '200': {
                description: 'Array of ServiceReport model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.ServiceReport, { includeRelations: true }),
                        },
                    },
                },
            }
        }
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.ServiceReport)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceReportController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/service-reports', {
        responses: {
            '200': {
                description: 'ServiceReport PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            }
        }
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.ServiceReport, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.ServiceReport)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.ServiceReport, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceReportController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/service-reports/{id}', {
        responses: {
            '200': {
                description: 'ServiceReport model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.ServiceReport, { includeRelations: true }),
                    },
                },
            }
        }
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.ServiceReport, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceReportController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/service-reports/{id}', {
        responses: {
            '204': {
                description: 'ServiceReport PATCH success',
            }
        }
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.ServiceReport, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.ServiceReport]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceReportController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/service-reports/{id}', {
        responses: {
            '204': {
                description: 'ServiceReport PUT success',
            }
        }
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.ServiceReport]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceReportController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/service-reports/{id}', {
        responses: {
            '204': {
                description: 'ServiceReport DELETE success',
            }
        }
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceReportController.prototype, "deleteById", null);
ServiceReportController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.ServiceReportRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.LeadRepository)),
    tslib_1.__param(2, repository_1.repository(repositories_1.UserRepository)),
    tslib_1.__param(3, repository_1.repository(repositories_1.RoleRepository)),
    tslib_1.__param(4, repository_1.repository(repositories_1.ServiceReportItemRepository)),
    tslib_1.__param(5, repository_1.repository(repositories_1.ServiceReportMaterialRepository)),
    tslib_1.__param(6, core_1.inject.getter(authentication_1.AuthenticationBindings.CURRENT_USER)),
    tslib_1.__param(7, core_1.inject('services.EmailService')),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ServiceReportRepository,
        repositories_1.LeadRepository,
        repositories_1.UserRepository,
        repositories_1.RoleRepository,
        repositories_1.ServiceReportItemRepository,
        repositories_1.ServiceReportMaterialRepository, Function, services_1.EmailService])
], ServiceReportController);
exports.ServiceReportController = ServiceReportController;
//# sourceMappingURL=service-report.controller.js.map