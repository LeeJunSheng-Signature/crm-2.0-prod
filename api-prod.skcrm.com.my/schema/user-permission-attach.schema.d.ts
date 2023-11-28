export declare const UserPermissionAttachSchema: {
    type: string;
    properties: {
        permissionIds: {
            type: string;
            items: {
                type: string;
            };
        };
        rolesIds: {
            type: string;
            items: {
                type: string;
            };
        };
    };
};
