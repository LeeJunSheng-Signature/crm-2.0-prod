export declare const ForgetPasswordSchema: {
    type: string;
    required: string[];
    properties: {
        token: {
            type: string;
        };
        password: {
            type: string;
            minLength: number;
        };
    };
};
