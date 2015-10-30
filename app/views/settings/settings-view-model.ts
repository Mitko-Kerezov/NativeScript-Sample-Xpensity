﻿import { ViewModelBase } from "view-model-base";

import { service } from "../../shared/service";
import navigationModule = require("navigation");
import applicationSettingsModule = require("application-settings");

var OFFLINE_MODE = "offlineMode";
var NOTIFICATIONS = "notifications";
export class SettingsViewModel extends ViewModelBase {
    private _name: string;

    constructor() {
        super();

        this.notifications = applicationSettingsModule.getBoolean(NOTIFICATIONS, true);
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        if (this._name !== value) {
            this._name = value;
            this.notifyPropertyChange("name", value);
        }
    }

    public get offlineMode(): boolean {
        return applicationSettingsModule.getBoolean(OFFLINE_MODE, false);
    }

    public set offlineMode(value: boolean) {
        applicationSettingsModule.setBoolean(OFFLINE_MODE, value);
        service.switchOfflineMode(value);
        this.notifyPropertyChange("offlineMode", value);
    }

    public get notifications(): boolean {
        return applicationSettingsModule.getBoolean(NOTIFICATIONS, true);
    }

    public set notifications(value: boolean) {
        this.execute(service.switchNotifications(value)).then(() => {
            this.setNotifications(value);
        }, (error) => {
            this.setNotifications(!value);
        });
    }

    private setNotifications(value: boolean) {
        applicationSettingsModule.setBoolean(NOTIFICATIONS, value);
        this.notifyPropertyChange("notifications", value);
    }

    public logout() {
        this.execute(service.logout()).then(() => {
            navigationModule.login();
        });
    }

    public refresh() {
        if (service.currentUser) {
            this.name = service.currentUser.DisplayName;
        }
    }
}