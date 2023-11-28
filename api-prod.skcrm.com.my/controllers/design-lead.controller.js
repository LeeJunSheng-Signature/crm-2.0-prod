"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignLeadController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let DesignLeadController = class DesignLeadController {
    constructor(designRepository) {
        this.designRepository = designRepository;
    }
    async getLead(id) {
        return this.designRepository.lead(id);
    }
};
tslib_1.__decorate([
    rest_1.get('/designs/{id}/lead', {
        responses: {
            '200': {
                description: 'Lead belonging to Design',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.Lead) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DesignLeadController.prototype, "getLead", null);
DesignLeadController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.DesignRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.DesignRepository])
], DesignLeadController);
exports.DesignLeadController = DesignLeadController;
//# sourceMappingURL=design-lead.controller.js.map