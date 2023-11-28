/// <reference types="express" />
import { AuthenticationStrategy, TokenService } from '@loopback/authentication';
import { Request } from '@loopback/rest';
import { UserProfile } from '@loopback/security';
import { SessionRepository } from '../../../repositories';
export declare class JWTAuthenticationStrategy implements AuthenticationStrategy {
    tokenService: TokenService;
    private sessionRepository;
    name: string;
    constructor(tokenService: TokenService, sessionRepository: SessionRepository);
    authenticate(request: Request): Promise<UserProfile | undefined>;
    extractCredentials(request: Request): string;
    verifySession(sessionId: string): Promise<boolean>;
}
