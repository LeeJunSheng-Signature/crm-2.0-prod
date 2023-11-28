"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrate = void 0;
const application_1 = require("./application");
async function migrate(args) {
    const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
    console.log('Migrating schemas (%s existing schema)', existingSchema);
    const app = new application_1.BalJsApplication();
    await app.boot();
    await app.migrateSchema({
        existingSchema,
        models: [
            'Branch',
            'BrandGoods',
            'CalculationLog',
            'Company',
            'Credential',
            'Design',
            'DesignOtherItem',
            'DesignAdditionalItem',
            'DesignAdditionalLooseItem',
            'DesignCreateCronJob',
            'Email',
            'EmailTemplate',
            'Erparid',
            'Exhibition',
            'FinalConfirmationOrder',
            'Item',
            'ItemList',
            'Lead',
            'Material',
            'MissingItem',
            'Module',
            'ModulePermission',
            'Operation',
            'OperationPermission',
            'OrderInfo',
            'PaymentAttachment',
            'PaymentOptions',
            'Permission',
            'Process',
            'Profile',
            'QuotationDetails',
            'RejectionReason',
            'Role',
            'Rolepermission',
            'Session',
            'TradingItem',
            'User',
            'UserPermission',
            'UserLogging',
            'UserRole',
            'Zone',
            'ServiceReport',
            'ServiceReportItem',
            'ServiceReportMaterial',
            'ServiceOrderItem',
            'ServiceOrderItemCustom',
            'LooseItem'
        ],
    });
    // Connectors usually keep a pool of opened connections,
    // this keeps the process running even after all work is done.
    // We need to exit explicitly.
    process.exit(0);
}
exports.migrate = migrate;
migrate(process.argv).catch(err => {
    console.error('Cannot migrate database schema', err);
    process.exit(1);
});
//# sourceMappingURL=migrate.js.map