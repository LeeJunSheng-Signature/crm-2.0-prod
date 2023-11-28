import { ApplicationConfig } from '@loopback/core';
import { RestApplication } from '@loopback/rest';
export { ApplicationConfig };
declare const BalJsApplication_base;
export declare class BalJsApplication extends BalJsApplication_base {
    constructor(options?: ApplicationConfig);
    addSecuritySpec(): void;
}
