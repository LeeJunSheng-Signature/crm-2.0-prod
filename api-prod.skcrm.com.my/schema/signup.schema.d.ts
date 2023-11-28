export declare const SignUpSchema: {
    type: string;
    required: string[];
    properties: {
        name: {
            type: string;
        };
        loginId: {
            type: string;
        };
        mobile: {
            type: string;
        };
        email: {
            type: string;
            format: string;
        };
        role: {
            type: string;
        };
        branchId: {
            type: string;
        };
        password: {
            type: string;
            minLength: number;
        };
        sccode: {
            type: string;
        };
    };
};
