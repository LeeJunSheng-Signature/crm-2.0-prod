export declare const NotificationSchema: {
    type: string;
    required: string[];
    properties: {
        playerIds: {
            type: string;
            items: {
                type: string;
            };
        };
        externalUserIds: {
            type: string;
            items: {
                type: string;
            };
        };
        segments: {
            type: string;
            items: {
                type: string;
            };
        };
        title: {
            type: string;
        };
        message: {
            type: string;
        };
    };
};
