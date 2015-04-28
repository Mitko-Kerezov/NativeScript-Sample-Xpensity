﻿import observableModule = require("data/observable");

export class Page1ViewModel extends observableModule.Observable {
    private _item: any;

    constructor() {
        super();

        this.item = { Title: "Alabala" };
    }

    get item(): any {
        return this._item;
    }

    set item(value: any) {
        if (this._item !== value) {
            this._item = value;
            this.notifyPropertyChanged("item", value);
        }
    }

    notifyPropertyChanged(propertyName: string, value: any) {
        this.notify({ object: this, eventName: observableModule.knownEvents.propertyChange, propertyName: propertyName, value: value });
    }
}