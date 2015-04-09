﻿import observableModule = require("data/observable");

import viewModelBaseModule = require("../view-model-base");
import navigationModule = require("../../utils/navigation");
import serviceModule = require("../../utils/service");

export class ListPickerViewModel extends viewModelBaseModule.ViewModelBase{
    private _items: any[];
    private _selectedItem: ListItem;
    private _selectedCallback: (selectedItem: any) => void;

    constructor(getItemsFunction: () => Promise<any[]>, selectedItem: any, selectedCallback: (selectedItem: any) => void) {
        super();

        this.beginLoading();
        serviceModule.service.getExpenseCategories().then((items) => {
            var listItems = new Array<ListItem>();
            for (var i = 0; i < items.length; i++) {
                var listItem = new ListItem(items[i]);
                if (items[i] === selectedItem) {
                    this.selectItem(listItem);
                }

                listItems.push(listItem);
            }

            console.log("ITEMS: " + JSON.stringify(listItems));

            this.items = [new ListItem({ Title: "Alabala" }), new ListItem({ Title: "Item2" })];
            this.endLoading();
        },(error) => {
                this.endLoading();
            });

        this._selectedCallback = selectedCallback;
        this.items = [];
    }

    get items(): ListItem[] {
        return this._items;
    }

    set items(value: ListItem[]) {
        if (this._items !== value) {
            this._items = value;
            this.notifyPropertyChanged("items", value);
        }
    }

    selectItem(item: ListItem) {
        if (this._selectedItem) {
            this._selectedItem.isSelected = false;
        }

        this._selectedItem = item;
        if (this._selectedItem) {
            this._selectedItem.isSelected = true;
        }
    }

    done() {
        this._selectedCallback(this._selectedItem.data);
        navigationModule.goBack();
    }
}

export class ListItem extends observableModule.Observable {
    private _isSelected: boolean;
    private _data: any;

    constructor(data: any) {
        super();

        this.data = data;
        this.isSelected = false;
    }

    get isSelected(): boolean {
        return this._isSelected;
    }

    set isSelected(value: boolean) {
        if (this._isSelected !== value) {
            this._isSelected = value;
            this.notifyPropertyChanged("isSelected", value);
        }
    }

    get data(): boolean {
        return this._data;
    }

    set data(value: boolean) {
        if (this._data !== value) {
            this._data = value;
            this.notifyPropertyChanged("data", value);
        }
    }

    notifyPropertyChanged(propertyName: string, value: any) {
        this.notify({ object: this, eventName: observableModule.knownEvents.propertyChange, propertyName: propertyName, value: value });
    }
}