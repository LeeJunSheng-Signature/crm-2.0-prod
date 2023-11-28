"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MulterFileService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const multer_1 = tslib_1.__importDefault(require("multer"));
let MulterFileService = class MulterFileService {
    constructor() { }
    async getFiles(request, response) {
        const storage = multer_1.default.memoryStorage();
        var maxSize = 314572800;
        const upload = multer_1.default({
            storage: storage,
            limits: { fileSize: maxSize }
        }).single('file');
        return new Promise((resolve, reject) => {
            upload(request, response, (err) => {
                if (err)
                    reject(err);
                else {
                    resolve({
                        file: request.file,
                        files: request.files,
                        fields: request.fields,
                    });
                }
            });
        });
    }
};
MulterFileService = tslib_1.__decorate([
    core_1.bind({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__metadata("design:paramtypes", [])
], MulterFileService);
exports.MulterFileService = MulterFileService;
//# sourceMappingURL=multer-file.service.js.map