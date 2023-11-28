"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingObserver = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const repositories_1 = require("../repositories");
const models_1 = require("./../models");
const kvs = tslib_1.__importStar(require("./../server/kv.json"));
/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
let SettingObserver = class SettingObserver {
    constructor(settingRepository) {
        this.settingRepository = settingRepository;
    }
    /**
     * This method will be invoked when the application starts
     */
    async start() {
        const kvLoaded = await this.settingRepository.get('sk_rr_kv_loaded');
        if (kvLoaded && kvLoaded['value'] === 'true')
            return;
        kvs.data.forEach(kv => {
            this.settingRepository.set(kv.key, new models_1.Setting(kv));
        });
    }
    /**
     * This method will be invoked when the application stops
     */
    async stop() {
        // Add your logic for stop
    }
};
SettingObserver = tslib_1.__decorate([
    core_1.lifeCycleObserver('Seeder'),
    tslib_1.__param(0, repository_1.repository(repositories_1.SettingRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.SettingRepository])
], SettingObserver);
exports.SettingObserver = SettingObserver;
//# sourceMappingURL=setting.observer.js.map