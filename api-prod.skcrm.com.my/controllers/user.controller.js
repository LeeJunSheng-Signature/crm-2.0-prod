"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const crypto = tslib_1.__importStar(require("crypto-js"));
const _1 = require(".");
const keys_1 = require("../components/jwt-authentication/keys");
const services_1 = require("../components/jwt-authentication/services");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const schema_1 = require("../schema");
const forget_password_schema_1 = require("../schema/forget-password.schema");
const services_2 = require("../services");
const jwt_authentication_1 = require("./../components/jwt-authentication");
// ACL
const RESOURCE_NAME = 'user';
const ACL_PROJECT = {
    view: {
        resource: `${RESOURCE_NAME}*`,
        scopes: ['view'],
        allowedRoles: ['admin'],
    },
};
// END ACL
let UserController = class UserController {
    constructor(userRepository, branchRepository, credentialRepository, profileRepository, settingRepository, permissionRepository, smsTacService, xmlToJsonService, otpService, emailService, jwtService, kujialeService, branchController, userService, passwordHasher, getCurrentUser, roleRepository, sessionRepository, loggingRepository) {
        this.userRepository = userRepository;
        this.branchRepository = branchRepository;
        this.credentialRepository = credentialRepository;
        this.profileRepository = profileRepository;
        this.settingRepository = settingRepository;
        this.permissionRepository = permissionRepository;
        this.smsTacService = smsTacService;
        this.xmlToJsonService = xmlToJsonService;
        this.otpService = otpService;
        this.emailService = emailService;
        this.jwtService = jwtService;
        this.kujialeService = kujialeService;
        this.branchController = branchController;
        this.userService = userService;
        this.passwordHasher = passwordHasher;
        this.getCurrentUser = getCurrentUser;
        this.roleRepository = roleRepository;
        this.sessionRepository = sessionRepository;
        this.loggingRepository = loggingRepository;
    }
    async create(credential, response) {
        var _a, _b;
        const userExisted = await this.userRepository.findOne({
            where: { mobile: credential.mobile },
        });
        if (!userExisted) {
            const userBranch = await this.branchRepository.findOne({
                where: { uuid: credential.branchId },
            });
            if (!userBranch) {
                throw new rest_1.HttpErrors.BadRequest('Invalid branch.');
            }
            const userCreated = await this.userRepository.create({
                mobile: credential.mobile,
                email: credential.email,
                loginId: credential.loginId,
                name: credential.name,
                branchId: userBranch.uuid,
                kujialeEmail: credential.kujialeEmail,
                appUID: credential.appUID,
            });
            if (process.env.OTP_ENABLE === '1') {
                const token = this.otpService.getOTPCode();
                const validity = (_a = process.env.OTP_VALIDITY) !== null && _a !== void 0 ? _a : '0';
                await this.smsTacService.sendSms(credential.mobile, `Your verification token is ${token}. Only valid for ${parseInt(validity) / 60000} minute.`, `${token}`);
            }
            await this.credentialRepository.create({
                password: await this.passwordHasher.hashPassword(credential.password),
                userId: userCreated.uuid,
            });
            await this.profileRepository.create({
                userId: userCreated.uuid,
                sccode: credential.sccode,
            });
            const roleUser = await this.roleRepository.findOne({
                where: { uuid: credential.role },
            });
            if (!roleUser) {
                throw new rest_1.HttpErrors.BadRequest('Invalid role data. Please reseed role with default value');
            }
            await this.userRepository.roles(userCreated.uuid).link(roleUser.uuid);
            if (process.env.KUJIALE_ENABLE === '1') {
                const timestamp = new Date().getTime();
                const sign = process.env.KUJIALE_APPSECRET +
                    process.env.KUJIALE_APPKEY +
                    userCreated.appUID +
                    timestamp;
                await this.kujialeService.register(userCreated.appUID, userCreated.name, userCreated.kujialeEmail, credential.password, timestamp, crypto.MD5(sign).toString());
            }
            const email = new models_1.Email({
                to: credential.email,
                subject: 'Login Credentials',
                content: `
          Your account has been created successfully. <br>
          <br>
          Login ID: ${credential.loginId} <br>
          Role: ${roleUser.name} <br>
          Branch: ${userBranch.name} <br>
          Date Created: ${(_b = userCreated.createdAt) === null || _b === void 0 ? void 0 : _b.toDateString()} <br>
          <br>
          *Please request password from one of the system admins*
        `,
            });
            await this.userRepository.userLoggings(userCreated.uuid).create({
                moduleName: 'User',
                actionType: 'Add New User',
                actionDescription: userCreated.uuid + ' user is created',
                userId: userCreated.uuid
            });
            await this.emailService.sendMail(email);
            return userCreated;
        }
        else {
            throw new rest_1.HttpErrors.BadRequest('This mobile already exists');
        }
    }
    async createAdminRoot(credential) {
        if ((await this.userRepository.count()).count) {
            throw new rest_1.HttpErrors.BadRequest('Root admin can only be created when there no other user record');
        }
        const roleAdmin = await this.roleRepository.findOne({
            where: { name: 'sysadmin' },
        });
        if (!roleAdmin) {
            throw new rest_1.HttpErrors.BadRequest('Invalid role data. Please reseed role with default value');
        }
        const branchHQ = await this.branchRepository.findOne({
            where: { name: 'HQ' },
        });
        if (!branchHQ) {
            throw new rest_1.HttpErrors.BadRequest('Invalid branch data. Please reseed branch with default value');
        }
        const userCreated = await this.userRepository.create({
            mobile: credential.mobile,
            email: credential.email,
            name: credential.name,
            branchId: branchHQ.uuid,
        });
        await this.credentialRepository.create({
            password: await this.passwordHasher.hashPassword(credential.password),
            userId: userCreated.uuid,
        });
        await this.userRepository.roles(userCreated.uuid).link(roleAdmin.uuid);
        const permissionAllAccess = await this.permissionRepository.findOne({
            where: { name: 'SKAllPermissions' },
        });
        if (!permissionAllAccess) {
            throw new rest_1.HttpErrors.BadRequest('Invalid permission data. Please reseed permission with default value');
        }
        await this.userRepository
            .permissions(userCreated.uuid)
            .link(permissionAllAccess.uuid);
        if (process.env.KUJIALE_ENABLE === '1') {
            const timestamp = new Date().getTime();
            const sign = process.env.KUJIALE_APPSECRET +
                process.env.KUJIALE_APPKEY +
                userCreated.uuid +
                timestamp;
            await this.kujialeService.register(userCreated.uuid, userCreated.name, userCreated.email, credential.password, timestamp, crypto.MD5(sign).toString());
        }
        return userCreated;
    }
    async count(where) {
        return this.userRepository.count(where);
    }
    async isUserLoginIdExists(loginId) {
        const { count } = await this.userRepository.count({
            loginId,
        });
        return { exist: count > 0 };
    }
    async isUserEmailExists(email) {
        const totalResult = await this.userRepository.count({
            email: email,
        });
        return {
            exist: totalResult.count > 0,
        };
    }
    async isUserKujialeEmailExists(kujialeEmail) {
        const totalResult = await this.userRepository.count({
            kujialeEmail: kujialeEmail,
        });
        return {
            exist: totalResult.count > 0,
        };
    }
    async isUserAppUIDExists(appUID) {
        const totalResult = await this.userRepository.count({
            appUID: appUID,
        });
        return {
            exist: totalResult.count > 0,
        };
    }
    async isUserMobileExists(mobile) {
        const totalResult = await this.userRepository.count({
            mobile: mobile,
        });
        return {
            exist: totalResult.count > 0,
        };
    }
    async find(filter) {
        return this.userRepository.find(filter);
    }
    async updateAll(user, where) {
        const result = this.userRepository.updateAll(user, where);
        return result;
    }
    async findById(id, filter) {
        return this.userRepository.findById(id, filter);
    }
    async notifyAdminForgotPassword(loginId) {
        const user = await this.userRepository.findOne({ where: { loginId } });
        if (!user)
            throw new rest_1.HttpErrors[400](`No user found with login id ${loginId}`);
        const roleSysadmin = await this.roleRepository.findOne({
            where: { name: 'sysadmin' },
        });
        const sysadmins = await this.roleRepository
            .users(roleSysadmin.uuid)
            .find();
        for (const sysadmin of sysadmins) {
            const email = new models_1.Email({
                to: sysadmin.email,
                subject: 'A user has forgotten their password',
                content: `
        User Login Id: ${loginId} <br>
        `,
            });
            await this.emailService.sendMail(email);
        }
    }
    async updateById(id, user) {
        await this.userRepository.updateById(id, user);
    }
    async updatePasswordById(id, reset) {
        const passId = await this.credentialRepository.findOne({
            where: {
                userId: id,
            },
        });
        await this.credentialRepository.updateById(passId === null || passId === void 0 ? void 0 : passId.uuid, {
            password: await this.passwordHasher.hashPassword(reset.password),
            userId: id,
        });
    }
    async replaceById(id, user) {
        await this.userRepository.replaceById(id, user);
    }
    async deleteById(id) {
        await this.userRepository.profile(id).delete();
        await this.userRepository.deleteById(id);
    }
    async login(credential) {
        const user = await this.userService.verifyCredentials(credential);
        console.log(user);
        const session = await this.userRepository.sessions(user.uuid).create({});
        if (!session) {
            throw new rest_1.HttpErrors.InternalServerError('Error in creating user session.');
        }
        console.log(session);
        const userProfile = this.userService.convertToUserProfile(user);
        userProfile.session = session.uuid;
        console.log(userProfile);
        // TODO: Inclusionresolver in HasManyThrough is not implemented in loopback
        const roles = await this.userRepository.roles(user.uuid).find({
            fields: {
                name: true,
                permissions: true,
                createdAt: false,
                updatedAt: false,
                deletedAt: false,
            },
        });
        userProfile.roles = [];
        roles.forEach(role => {
            userProfile.roles.push(role.name);
        });
        const permissions = await this.userRepository.permissions(user.uuid).find({
            fields: {
                name: true,
                createdAt: false,
                updatedAt: false,
                deletedAt: false,
            },
        });
        userProfile.permissions = [];
        for (const permission of permissions) {
            if (!userProfile.permissions.includes(permission.name))
                userProfile.permissions.push(permission.name);
        }
        await this.userRepository.userLoggings(user.uuid).create({
            moduleName: 'Authentication',
            actionType: 'Login',
            actionDescription: user.uuid + ' login to the system',
            userId: user.uuid
        });
        // END TODO
        const token = await this.jwtService.generateToken(userProfile);
        return { token: token };
    }
    async logout() {
        const userProfile = await this.getCurrentUser();
        await this.userRepository.userLoggings(userProfile.user).create({
            moduleName: 'Authentication',
            actionType: 'Logout',
            actionDescription: userProfile.user + ' logout of the system',
            userId: userProfile.user
        });
        await this.sessionRepository.deleteById(userProfile.session);
        return { result: 'success' };
    }
    async whoAmI() {
        return this.getCurrentUser();
    }
    async verifyOTPToken(otpCredential) {
        let bRetCode = false;
        const user = await this.getCurrentUser();
        const userCred = await this.userRepository.findCredentials(user.user);
        if (userCred === null || userCred === void 0 ? void 0 : userCred.tokenCreatedAt) {
            bRetCode = this.otpService.verifyOTP(otpCredential.otp, userCred.tokenCreatedAt);
        }
        if (!bRetCode) {
            throw new rest_1.HttpErrors.BadRequest('Invalid credentials');
        }
        return this.userRepository.findById(user.user);
    }
    // @post('/user/otp/refresh', {
    //   responses: {
    //     '200': {
    //       description: 'User model instance',
    //     },
    //   },
    // })
    // @authenticate('jwt')
    // async refreshOtp(): Promise<{refresh: Boolean}> {
    //   const bRetCode = true;
    //   const token = this.otpService.getOTPCode();
    //   await this.credentialRepository.updateById(user.user, {
    //     password: await this.passwordHasher.hashPassword(credential.password),
    //     token: token,
    //     userId: userCreated.uuid,
    //   });
    //   return {refresh: bRetCode};
    // }
    async forgetPasswordByEmail(userEmail) {
        let bRetCode = false;
        const userExisted = await this.userRepository.findOne({
            where: { email: userEmail },
        });
        if (!userExisted) {
            throw new rest_1.HttpErrors.Unauthorized('No valid users');
        }
        else {
            bRetCode = true;
        }
        const token = await this.jwtService.generateResetPasswordToken(userExisted);
        const email = new models_1.Email({
            to: userExisted.email,
            subject: 'Forget Password',
            content: token,
        });
        await this.emailService.sendMail(email);
        return { result: bRetCode, token: token };
    }
    async forgetPasswordByMobile(mobile) {
        let bRetCode = false;
        const userExisted = await this.userRepository.findOne({
            where: { mobile: mobile },
        });
        if (!userExisted) {
            throw new rest_1.HttpErrors.Unauthorized('No valid users');
        }
        else {
            bRetCode = true;
        }
        const token = await this.jwtService.generateResetPasswordToken(userExisted);
        const email = new models_1.Email({
            to: userExisted.email,
            subject: 'Forget Password',
            content: token,
        });
        await this.emailService.sendMail(email);
        return { result: bRetCode, token: token };
    }
    async setNewPassword(forget) {
        const userId = await this.jwtService.decodeResetPasswordToken(forget.token);
        const credential = await this.userRepository.findCredentials(userId);
        if (!credential) {
            throw new rest_1.HttpErrors.Unauthorized('Invalid forget password token');
        }
        else {
            credential.password = await this.passwordHasher.hashPassword(forget.password);
            credential.resetToken = '';
            await this.credentialRepository.update(credential);
        }
        return { result: true };
    }
};
tslib_1.__decorate([
    rest_1.post('/user', {
        responses: {
            '200': {
                description: 'User model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.User) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        required: true,
        content: {
            'application/x-www-form-urlencoded': { schema: schema_1.SignUpSchema },
        },
    })),
    tslib_1.__param(1, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.post('/user/admin/root', {
        responses: {
            '200': {
                description: 'User model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.User) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        required: true,
        content: {
            'application/x-www-form-urlencoded': { schema: schema_1.SignUpSchema },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "createAdminRoot", null);
tslib_1.__decorate([
    rest_1.get('/user/count', {
        responses: {
            '200': {
                description: 'User model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.User)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/users/loginId/{loginId}/exists', {
        responses: {
            '200': {
                description: 'User has one loginId',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.User),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('loginId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "isUserLoginIdExists", null);
tslib_1.__decorate([
    rest_1.get('/users/email/{email}/exists', {
        responses: {
            '200': {
                description: 'User has one email',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.User),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('email')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "isUserEmailExists", null);
tslib_1.__decorate([
    rest_1.get('/users/kujialeEmail/{kujialeEmail}/exists', {
        responses: {
            '200': {
                description: 'User has one Kujiale email',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.User),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('kujialeEmail')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "isUserKujialeEmailExists", null);
tslib_1.__decorate([
    rest_1.get('/users/appUID/{appUID}/exists', {
        responses: {
            '200': {
                description: 'User has one App UID',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.User),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('appUID')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "isUserAppUIDExists", null);
tslib_1.__decorate([
    rest_1.get('/users/mobile/{mobile}/exists', {
        responses: {
            '200': {
                description: 'User has one mobile number',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.User),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('mobile')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "isUserMobileExists", null);
tslib_1.__decorate([
    rest_1.get('/user', {
        security: jwt_authentication_1.OPERATION_SECURITY_SPEC,
        responses: {
            '200': {
                description: 'Array of User model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.User, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    authorization_1.authorize(ACL_PROJECT.view),
    tslib_1.__param(0, rest_1.param.filter(models_1.User)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/user', {
        responses: {
            '200': {
                description: 'User PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.User, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.User)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.User, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/user/{id}', {
        responses: {
            '200': {
                description: 'User model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.User, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.User, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.post('/user/{loginId}/notify-admin-forgot-password'),
    tslib_1.__param(0, rest_1.param.path.string('loginId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "notifyAdminForgotPassword", null);
tslib_1.__decorate([
    rest_1.patch('/user/{id}', {
        responses: {
            '204': {
                description: 'User PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.User, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.User]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.patch('/user/{id}/reset-password', {
        responses: {
            '204': {
                description: 'User PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: schema_1.ResetPasswordSchema,
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "updatePasswordById", null);
tslib_1.__decorate([
    rest_1.put('/user/{id}', {
        responses: {
            '204': {
                description: 'User PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.User]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/user/{id}', {
        responses: {
            '204': {
                description: 'User DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "deleteById", null);
tslib_1.__decorate([
    rest_1.post('/user/login', {
        responses: {
            '200': {
                description: 'Token',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                token: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        required: true,
        content: {
            'application/x-www-form-urlencoded': { schema: schema_1.CredentialSchema },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
tslib_1.__decorate([
    rest_1.post('/user/logout', {
        security: jwt_authentication_1.OPERATION_SECURITY_SPEC,
        responses: {
            '200': {
                description: 'User logging out from the system',
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
tslib_1.__decorate([
    rest_1.get('/me', {
        security: jwt_authentication_1.OPERATION_SECURITY_SPEC,
        responses: {
            '200': {
                description: 'User model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.User, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "whoAmI", null);
tslib_1.__decorate([
    rest_1.post('/user/verify', {
        responses: {
            '200': {
                description: 'User model instance',
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    tslib_1.__param(0, rest_1.requestBody({
        required: true,
        content: {
            'application/x-www-form-urlencoded': { schema: schema_1.OTPCredentialSchema },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "verifyOTPToken", null);
tslib_1.__decorate([
    rest_1.get('/user/forget/email/{email}', {
        responses: {
            '200': {
                description: 'Forget password',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('email')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "forgetPasswordByEmail", null);
tslib_1.__decorate([
    rest_1.get('/user/forget/mobile/{mobile}', {
        responses: {
            '200': {
                description: 'Forget password',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('mobile')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "forgetPasswordByMobile", null);
tslib_1.__decorate([
    rest_1.post('/user/forget', {
        responses: {
            '200': {
                description: 'Forget password',
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        required: true,
        content: {
            'application/x-www-form-urlencoded': { schema: forget_password_schema_1.ForgetPasswordSchema },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "setNewPassword", null);
UserController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.UserRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.BranchRepository)),
    tslib_1.__param(2, repository_1.repository(repositories_1.CredentialRepository)),
    tslib_1.__param(3, repository_1.repository(repositories_1.ProfileRepository)),
    tslib_1.__param(4, repository_1.repository(repositories_1.SettingRepository)),
    tslib_1.__param(5, repository_1.repository(repositories_1.PermissionRepository)),
    tslib_1.__param(6, core_1.inject('services.SmsTac')),
    tslib_1.__param(7, core_1.inject('services.XmlToJsonService')),
    tslib_1.__param(8, core_1.inject('services.OtpService')),
    tslib_1.__param(9, core_1.inject('services.EmailService')),
    tslib_1.__param(10, core_1.inject(keys_1.TokenServiceBindings.TOKEN_SERVICE)),
    tslib_1.__param(11, core_1.inject('services.Kujiale')),
    tslib_1.__param(12, core_1.inject('controllers.BranchController')),
    tslib_1.__param(13, core_1.inject(keys_1.UserServiceBindings.USER_SERVICE)),
    tslib_1.__param(14, core_1.inject(keys_1.PasswordHasherBindings.PASSWORD_HASHER)),
    tslib_1.__param(15, core_1.inject.getter(authentication_1.AuthenticationBindings.CURRENT_USER)),
    tslib_1.__param(16, repository_1.repository(repositories_1.RoleRepository)),
    tslib_1.__param(17, repository_1.repository(repositories_1.SessionRepository)),
    tslib_1.__param(18, repository_1.repository(repositories_1.UserLoggingRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository,
        repositories_1.BranchRepository,
        repositories_1.CredentialRepository,
        repositories_1.ProfileRepository,
        repositories_1.SettingRepository,
        repositories_1.PermissionRepository, Object, services_2.XmlToJsonService,
        services_2.OtpService,
        services_2.EmailService,
        services_1.JWTService, Object, _1.BranchController, Object, Object, Function, repositories_1.RoleRepository,
        repositories_1.SessionRepository,
        repositories_1.UserLoggingRepository])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map