﻿import platformModule = require("platform");
import observableModule = require("data/observable");
import enumsModule = require("ui/enums");
import dialogsModule = require("ui/dialogs");

export class ViewModelBase extends observableModule.Observable {
    private _loadingCount: number;
    private _isLoading: boolean;

    constructor() {
        super();

        this._loadingCount = 0;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    set isLoading(value: boolean) {
        if (this._isLoading != value) {
            this._isLoading = value;
            this.notifyPropertyChanged("isLoading", value);
        }
    }

    get androidVisibility(): string {
        if (platformModule.device.os === platformModule.platformNames.android) {
            return enumsModule.Visibility.visible;
        }

        return enumsModule.Visibility.collapsed;
    }

    get iosVisibility(): string {
        if (platformModule.device.os === platformModule.platformNames.ios) {
            return enumsModule.Visibility.visible;
        }

        return enumsModule.Visibility.collapsed;
    }

    beginLoading() {
        if (!this._loadingCount) {
            this.isLoading = true;
        }

        this._loadingCount++;
    }

    endLoading() {
        if (this._loadingCount > 0) {
            this._loadingCount--;
            if (!this._loadingCount) {
                this.isLoading = false;
            }
        }
    }

    notifyOnError(error: string) {
        dialogsModule.alert({ title: "Error", message: error, okButtonText: "Close" });
    }

    notifyPropertyChanged(propertyName: string, value: any) {
        this.notify({ object: this, eventName: observableModule.knownEvents.propertyChange, propertyName: propertyName, value: value });
    }
}