/// <reference types="express" />
import { UserService } from '@loopback/authentication';
import { Getter } from '@loopback/core';
import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Response } from '@loopback/rest';
import { UserProfile } from '@loopback/security';
import { BranchController } from '.';
import { JWTService } from '../components/jwt-authentication/services';
import { PasswordHasher } from '../components/jwt-authentication/services/hash.password.bcryptjs';
import { User } from '../models';
import { BranchRepository, CredentialRepository, PermissionRepository, ProfileRepository, RoleRepository, SessionRepository, SettingRepository, UserLoggingRepository, UserRepository } from '../repositories';
import { EmailService, Kujiale, OtpService, SmsTac, XmlToJsonService } from '../services';
import { ForgetPassword, OTPCredential, ResetPassword } from '../types';
import { Credentials } from '../types/credential.types';
export declare class UserController {
    userRepository: UserRepository;
    branchRepository: BranchRepository;
    credentialRepository: CredentialRepository;
    profileRepository: ProfileRepository;
    settingRepository: SettingRepository;
    permissionRepository: PermissionRepository;
    protected smsTacService: SmsTac;
    protected xmlToJsonService: XmlToJsonService;
    protected otpService: OtpService;
    protected emailService: EmailService;
    jwtService: JWTService;
    protected kujialeService: Kujiale;
    branchController: BranchController;
    userService: UserService<User, Credentials>;
    passwordHasher: PasswordHasher;
    getCurrentUser: Getter<UserProfile>;
    roleRepository: RoleRepository;
    sessionRepository: SessionRepository;
    loggingRepository: UserLoggingRepository;
    constructor(userRepository: UserRepository, branchRepository: BranchRepository, credentialRepository: CredentialRepository, profileRepository: ProfileRepository, settingRepository: SettingRepository, permissionRepository: PermissionRepository, smsTacService: SmsTac, xmlToJsonService: XmlToJsonService, otpService: OtpService, emailService: EmailService, jwtService: JWTService, kujialeService: Kujiale, branchController: BranchController, userService: UserService<User, Credentials>, passwordHasher: PasswordHasher, getCurrentUser: Getter<UserProfile>, roleRepository: RoleRepository, sessionRepository: SessionRepository, loggingRepository: UserLoggingRepository);
    create(credential: Credentials, response: Response): Promise<User>;
    createAdminRoot(credential: Credentials): Promise<User>;
    count(where?: Where<User>): Promise<Count>;
    isUserLoginIdExists(loginId: typeof User.prototype.loginId): Promise<{
        exist: Boolean;
    }>;
    isUserEmailExists(email: typeof User.prototype.email): Promise<{
        exist: Boolean;
    }>;
    isUserKujialeEmailExists(kujialeEmail: typeof User.prototype.kujialeEmail): Promise<{
        exist: Boolean;
    }>;
    isUserAppUIDExists(appUID: typeof User.prototype.appUID): Promise<{
        exist: Boolean;
    }>;
    isUserMobileExists(mobile: typeof User.prototype.mobile): Promise<{
        exist: Boolean;
    }>;
    find(filter?: Filter<User>): Promise<User[]>;
    updateAll(user: User, where?: Where<User>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<User>): Promise<User>;
    notifyAdminForgotPassword(loginId: string): Promise<void>;
    updateById(id: string, user: User): Promise<void>;
    updatePasswordById(id: string, reset: ResetPassword): Promise<void>;
    replaceById(id: string, user: User): Promise<void>;
    deleteById(id: string): Promise<void>;
    login(credential: Credentials): Promise<{
        token: string;
    }>;
    logout(): Promise<{
        result: string;
    }>;
    whoAmI(): Promise<UserProfile>;
    verifyOTPToken(otpCredential: OTPCredential): Promise<User>;
    forgetPasswordByEmail(userEmail: string): Promise<{
        result: Boolean;
        token: string;
    }>;
    forgetPasswordByMobile(mobile: string): Promise<{
        result: Boolean;
        token: string;
    }>;
    setNewPassword(forget: ForgetPassword): Promise<{
        result: Boolean;
    }>;
}
