"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordHasherBindings = exports.UserServiceBindings = exports.TokenServiceBindings = exports.TokenServiceConstants = void 0;
const core_1 = require("@loopback/core");
var TokenServiceConstants;
(function (TokenServiceConstants) {
    var _a, _b;
    TokenServiceConstants.TOKEN_SECRET_VALUE = (_a = process.env.TOKEN_SECRET) !== null && _a !== void 0 ? _a : 'baljs';
    TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE = (_b = process.env.TOKEN_EXPIRY) !== null && _b !== void 0 ? _b : '21600';
})(TokenServiceConstants = exports.TokenServiceConstants || (exports.TokenServiceConstants = {}));
var TokenServiceBindings;
(function (TokenServiceBindings) {
    TokenServiceBindings.TOKEN_SECRET = core_1.BindingKey.create('authentication.jwt.secret');
    TokenServiceBindings.TOKEN_EXPIRES_IN = core_1.BindingKey.create('authentication.jwt.expires.in.seconds');
    TokenServiceBindings.TOKEN_SERVICE = core_1.BindingKey.create('services.authentication.jwt.tokenservice');
})(TokenServiceBindings = exports.TokenServiceBindings || (exports.TokenServiceBindings = {}));
var UserServiceBindings;
(function (UserServiceBindings) {
    UserServiceBindings.USER_SERVICE = core_1.BindingKey.create('services.user.service');
})(UserServiceBindings = exports.UserServiceBindings || (exports.UserServiceBindings = {}));
var PasswordHasherBindings;
(function (PasswordHasherBindings) {
    PasswordHasherBindings.PASSWORD_HASHER = core_1.BindingKey.create('services.hasher');
    PasswordHasherBindings.ROUNDS = core_1.BindingKey.create('services.hasher.round');
})(PasswordHasherBindings = exports.PasswordHasherBindings || (exports.PasswordHasherBindings = {}));
//# sourceMappingURL=keys.js.map