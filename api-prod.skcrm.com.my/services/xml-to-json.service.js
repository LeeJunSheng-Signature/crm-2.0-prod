"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmlToJsonService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const xml2js_1 = require("xml2js");
let XmlToJsonService = class XmlToJsonService {
    constructor() { }
    async parseString(text) {
        return xml2js_1.parseStringPromise(text, { explicitArray: false });
    }
};
XmlToJsonService = tslib_1.__decorate([
    core_1.bind({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__metadata("design:paramtypes", [])
], XmlToJsonService);
exports.XmlToJsonService = XmlToJsonService;
//# sourceMappingURL=xml-to-json.service.js.map