export declare class OtpService {
    constructor();
    private secret;
    getOTPCode(): string;
    verifyOTP(token: string, createdAt: Date): boolean;
}
