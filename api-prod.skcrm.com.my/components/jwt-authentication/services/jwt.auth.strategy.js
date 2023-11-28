"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-access-control-migration
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTAuthenticationStrategy = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const repositories_1 = require("../../../repositories");
const keys_1 = require("../keys");
let JWTAuthenticationStrategy = class JWTAuthenticationStrategy {
    constructor(tokenService, sessionRepository) {
        this.tokenService = tokenService;
        this.sessionRepository = sessionRepository;
        this.name = 'jwt';
    }
    async authenticate(request) {
        const token = this.extractCredentials(request);
        const userProfile = await this.tokenService.verifyToken(token);
        if (!(await this.verifySession(userProfile.session))) {
            throw new rest_1.HttpErrors.Unauthorized('Your session has expired');
        }
        return userProfile;
    }
    extractCredentials(request) {
        if (!request.headers.authorization) {
            throw new rest_1.HttpErrors.Unauthorized(`Authorization header not found.`);
        }
        // for example : Bearer xxx.yyy.zzz
        const authHeaderValue = request.headers.authorization;
        if (!authHeaderValue.startsWith('Bearer')) {
            throw new rest_1.HttpErrors.Unauthorized(`Authorization header is not of type 'Bearer'.`);
        }
        //split the string into 2 parts : 'Bearer ' and the `xxx.yyy.zzz`
        const parts = authHeaderValue.split(' ');
        if (parts.length !== 2)
            throw new rest_1.HttpErrors.Unauthorized(`Authorization header value has too many parts. It must follow the pattern: 'Bearer xx.yy.zz' where xx.yy.zz is a valid JWT token.`);
        const token = parts[1];
        return token;
    }
    async verifySession(sessionId) {
        try {
            await this.sessionRepository.findById(sessionId);
        }
        catch (err) {
            console.log(err);
            return false;
        }
        return true;
    }
};
JWTAuthenticationStrategy = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject(keys_1.TokenServiceBindings.TOKEN_SERVICE)),
    tslib_1.__param(1, repository_1.repository(repositories_1.SessionRepository)),
    tslib_1.__metadata("design:paramtypes", [Object, repositories_1.SessionRepository])
], JWTAuthenticationStrategy);
exports.JWTAuthenticationStrategy = JWTAuthenticationStrategy;
//# sourceMappingURL=jwt.auth.strategy.js.map