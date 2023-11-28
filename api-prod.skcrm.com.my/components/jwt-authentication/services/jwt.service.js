"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-access-control-migration
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const security_1 = require("@loopback/security");
const util_1 = require("util");
const keys_1 = require("../keys");
const jwt = require('jsonwebtoken');
const signAsync = util_1.promisify(jwt.sign);
const verifyAsync = util_1.promisify(jwt.verify);
let JWTService = class JWTService {
    constructor(jwtSecret, jwtExpiresIn) {
        this.jwtSecret = jwtSecret;
        this.jwtExpiresIn = jwtExpiresIn;
    }
    async verifyToken(token) {
        if (!token) {
            throw new rest_1.HttpErrors.Unauthorized(`Error verifying token : 'token' is null`);
        }
        let userProfile;
        try {
            // decode user profile from token
            const decodedToken = await verifyAsync(token, this.jwtSecret);
            // don't copy over  token field 'iat' and 'exp', nor 'email' to user profile
            console.log(decodedToken);
            userProfile = Object.assign({ [security_1.securityId]: '', name: '' }, {
                [security_1.securityId]: decodedToken.session,
                name: decodedToken.name,
                id: decodedToken.uuid,
                loginId: decodedToken.loginid,
                email: decodedToken.email,
                mobile: decodedToken.mobile,
                roles: decodedToken.roles,
                permissions: decodedToken.permissions,
                session: decodedToken.session,
                user: decodedToken.user,
                branch: decodedToken.branch,
                kujialeEmail: decodedToken.kujialeEmail,
                appUID: decodedToken.appUID,
            });
        }
        catch (error) {
            throw new rest_1.HttpErrors.Unauthorized(`Error verifying token : ${error.message}`);
        }
        return userProfile;
    }
    async generateToken(userProfile) {
        if (!userProfile) {
            throw new rest_1.HttpErrors.Unauthorized('Error generating token : userProfile is null');
        }
        const userInfoForToken = {
            id: userProfile[security_1.securityId],
            loginid: userProfile.loginId,
            mobile: userProfile.mobile,
            name: userProfile.name,
            email: userProfile.email,
            roles: userProfile.roles,
            permissions: userProfile.permissions,
            session: userProfile.session,
            user: userProfile.user,
            branch: userProfile.branch,
            kujialeEmail: userProfile.kujialeEmail,
            appUID: userProfile.appUID,
        };
        // Generate a JSON Web Token
        let token;
        try {
            token = await signAsync(userInfoForToken, this.jwtSecret, {
                expiresIn: Number(this.jwtExpiresIn),
            });
        }
        catch (error) {
            throw new rest_1.HttpErrors.Unauthorized(`Error encoding token : ${error}`);
        }
        return token;
    }
    async generateResetPasswordToken(user) {
        if (!user) {
            throw new rest_1.HttpErrors.NotFound('Error generating token : user is not found');
        }
        const userInfoForToken = {
            id: user.uuid,
            user: user.uuid,
        };
        let token;
        try {
            token = await signAsync(userInfoForToken, this.jwtSecret, {
                expiresIn: 60000 * 60,
            });
        }
        catch (error) {
            throw new rest_1.HttpErrors.Unauthorized(`Error encoding token : ${error}`);
        }
        return token;
    }
    async decodeResetPasswordToken(token) {
        let userId = '';
        try {
            const decodedToken = await verifyAsync(token, this.jwtSecret);
            userId = decodedToken.user;
        }
        catch (error) {
            throw new rest_1.HttpErrors.Unauthorized(`Error verifying token : ${error.message}`);
        }
        if (!userId) {
            throw new rest_1.HttpErrors.Unauthorized(`Invalid reset token`);
        }
        return userId;
    }
};
JWTService = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject(keys_1.TokenServiceBindings.TOKEN_SECRET)),
    tslib_1.__param(1, core_1.inject(keys_1.TokenServiceBindings.TOKEN_EXPIRES_IN)),
    tslib_1.__metadata("design:paramtypes", [String, String])
], JWTService);
exports.JWTService = JWTService;
//# sourceMappingURL=jwt.service.js.map