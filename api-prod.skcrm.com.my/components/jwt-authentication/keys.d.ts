import { TokenService, UserService } from '@loopback/authentication';
import { BindingKey } from '@loopback/core';
import { User } from '../../models/user.model';
import { Credentials } from './../../types/credential.types';
import { PasswordHasher } from './services/hash.password.bcryptjs';
export declare namespace TokenServiceConstants {
    const TOKEN_SECRET_VALUE: string;
    const TOKEN_EXPIRES_IN_VALUE: string;
}
export declare namespace TokenServiceBindings {
    const TOKEN_SECRET: BindingKey<string>;
    const TOKEN_EXPIRES_IN: BindingKey<string>;
    const TOKEN_SERVICE: BindingKey<TokenService>;
}
export declare namespace UserServiceBindings {
    const USER_SERVICE: BindingKey<UserService<User, Credentials>>;
}
export declare namespace PasswordHasherBindings {
    const PASSWORD_HASHER: BindingKey<PasswordHasher<string>>;
    const ROUNDS: BindingKey<number>;
}
