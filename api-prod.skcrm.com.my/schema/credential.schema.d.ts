export declare const CredentialSchema: {
    type: string;
    required: string[];
    properties: {
        loginId: {
            type: string;
        };
        password: {
            type: string;
            minLength: number;
        };
    };
};
