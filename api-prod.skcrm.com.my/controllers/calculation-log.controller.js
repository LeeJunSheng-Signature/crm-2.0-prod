"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculationLogController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let CalculationLogController = class CalculationLogController {
    constructor(calculationLogRepository) {
        this.calculationLogRepository = calculationLogRepository;
    }
    async find(filter) {
        return this.calculationLogRepository.find(filter);
    }
};
tslib_1.__decorate([
    rest_1.get('/calculation-logs', {
        responses: {
            '200': {
                description: 'Array of CalculationLog model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.CalculationLog, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.CalculationLog)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CalculationLogController.prototype, "find", null);
CalculationLogController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.CalculationLogRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.CalculationLogRepository])
], CalculationLogController);
exports.CalculationLogController = CalculationLogController;
//# sourceMappingURL=calculation-log.controller.js.map