"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotationDetailsDesignController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let QuotationDetailsDesignController = class QuotationDetailsDesignController {
    constructor(quotationDetailsRepository) {
        this.quotationDetailsRepository = quotationDetailsRepository;
    }
    async getDesign(id) {
        return this.quotationDetailsRepository.design(id);
    }
};
tslib_1.__decorate([
    rest_1.get('/quotation-details/{id}/design', {
        responses: {
            '200': {
                description: 'Design belonging to QuotationDetails',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.Design) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], QuotationDetailsDesignController.prototype, "getDesign", null);
QuotationDetailsDesignController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.QuotationDetailsRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.QuotationDetailsRepository])
], QuotationDetailsDesignController);
exports.QuotationDetailsDesignController = QuotationDetailsDesignController;
//# sourceMappingURL=quotation-details-design.controller.js.map