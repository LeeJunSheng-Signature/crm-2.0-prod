"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const util_1 = require("util");
const models_1 = require("./../models");
let FileController = class FileController {
    constructor(fileService, request, response) {
        this.fileService = fileService;
        this.request = request;
        this.response = response;
    }
    async findFilesInContainer(filter) {
        const getFiles = util_1.promisify(this.fileService.getFiles);
        return getFiles(`${process.env.STORAGE_CONTAINER}`, {});
    }
    async findFileInContainer(fileName) {
        const getFile = util_1.promisify(this.fileService.getFile);
        return getFile(`${process.env.STORAGE_CONTAINER}`, fileName);
    }
    async deleteFileInContainer(fileName) {
        const removeFile = util_1.promisify(this.fileService.removeFile);
        return removeFile(`${process.env.STORAGE_CONTAINER}`, fileName);
    }
    async upload() {
        const upload = util_1.promisify(this.fileService.upload);
        return upload(`${process.env.STORAGE_CONTAINER}`, this.request, this.response, {});
    }
    async download(fileName) {
        const download = util_1.promisify(this.fileService.download);
        return download(`${process.env.STORAGE_CONTAINER}`, fileName, this.request, this.response);
    }
};
tslib_1.__decorate([
    rest_1.get(`/containers/files`, {
        responses: {
            '200': {
                description: 'Array of Files model instances belongs to container',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: { 'x-ts-type': models_1.File } },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Container))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FileController.prototype, "findFilesInContainer", null);
tslib_1.__decorate([
    rest_1.get('/containers/files/{fileName}', {
        responses: {
            '200': {
                description: 'File model instances belongs to container',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.File } } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('fileName')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], FileController.prototype, "findFileInContainer", null);
tslib_1.__decorate([
    rest_1.del('/containers/files/{fileName}', {
        responses: {
            '204': {
                description: 'File DELETE from Container success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('fileName')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], FileController.prototype, "deleteFileInContainer", null);
tslib_1.__decorate([
    rest_1.post(`/containers/upload`, {
        responses: {
            '200': {
                description: 'Upload a Files model instances into Container',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.File } } },
            },
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], FileController.prototype, "upload", null);
tslib_1.__decorate([
    rest_1.get('/containers//download/{fileName}', {
        responses: {
            '200': {
                description: 'Download a File within specified Container',
                content: { 'application/json': { schema: { 'x-ts-type': Object } } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('fileName')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], FileController.prototype, "download", null);
FileController = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('services.FileService')),
    tslib_1.__param(1, core_1.inject(rest_1.RestBindings.Http.REQUEST)),
    tslib_1.__param(2, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object])
], FileController);
exports.FileController = FileController;
//# sourceMappingURL=file.controller.js.map