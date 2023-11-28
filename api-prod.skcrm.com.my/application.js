"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalJsApplication = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const boot_1 = require("@loopback/boot");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const rest_explorer_1 = require("@loopback/rest-explorer");
const service_proxy_1 = require("@loopback/service-proxy");
const dotenv = tslib_1.__importStar(require("dotenv"));
const path_1 = tslib_1.__importDefault(require("path"));
const jwt_authentication_1 = require("./components/jwt-authentication");
const services_1 = require("./components/jwt-authentication/services");
const sequence_1 = require("./sequence");
class BalJsApplication extends boot_1.BootMixin(service_proxy_1.ServiceMixin(repository_1.RepositoryMixin(rest_1.RestApplication))) {
    constructor(options = {}) {
        super(options);
        dotenv.config({ path: '.env' });
        // Set up the custom sequence
        this.sequence(sequence_1.MySequence);
        // Set up default home page
        this.static('/', path_1.default.join(__dirname, '../public'));
        this.addSecuritySpec();
        // Customize @loopback/rest-explorer configuration here
        this.configure(rest_explorer_1.RestExplorerBindings.COMPONENT).to({
            path: '/explorer',
        });
        this.component(rest_explorer_1.RestExplorerComponent);
        this.component(authentication_1.AuthenticationComponent);
        this.component(jwt_authentication_1.JWTAuthenticationComponent);
        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };
    }
    addSecuritySpec() {
        this.api({
            openapi: '3.0.0',
            info: {
                title: 'access-control-example',
                version: require('.././package.json').version,
            },
            paths: {},
            components: { securitySchemes: services_1.SECURITY_SCHEME_SPEC },
            security: [
                {
                    jwt: [],
                },
            ],
            servers: [{ url: '/' }],
        });
    }
}
exports.BalJsApplication = BalJsApplication;
//# sourceMappingURL=application.js.map