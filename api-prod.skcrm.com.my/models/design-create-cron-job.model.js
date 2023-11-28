"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignCreateCronJob = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const _1 = require(".");
const design_model_1 = require("./design.model");
let DesignCreateCronJob = class DesignCreateCronJob extends _1.BaseEntity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        id: true,
        useDefaultIdType: false,
        defaultFn: 'uuidv4',
    }),
    tslib_1.__metadata("design:type", String)
], DesignCreateCronJob.prototype, "uuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], DesignCreateCronJob.prototype, "createType", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], DesignCreateCronJob.prototype, "orderId", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], DesignCreateCronJob.prototype, "createDone", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'date',
    }),
    tslib_1.__metadata("design:type", Date)
], DesignCreateCronJob.prototype, "createDoneDate", void 0);
tslib_1.__decorate([
    repository_1.belongsTo(() => design_model_1.Design, { name: 'design' }),
    tslib_1.__metadata("design:type", String)
], DesignCreateCronJob.prototype, "designId", void 0);
DesignCreateCronJob = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], DesignCreateCronJob);
exports.DesignCreateCronJob = DesignCreateCronJob;
//# sourceMappingURL=design-create-cron-job.model.js.map