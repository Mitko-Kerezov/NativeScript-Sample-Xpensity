﻿import viewModelBaseModule = require("../view-model-base");
import navigationModule = require("../../utils/navigation");

export class DatePickerViewModel extends viewModelBaseModule.ViewModelBase {
    private _day: number;
    private _month: number;
    private _year: number;
    private _selectedCallback: (selectedDate: Date) => void;

    constructor(selectedDate: Date, selectedCallback: (selectedDate: Date) => void) {
        super();

        this.day = selectedDate.getDate();
        this.month = selectedDate.getMonth();
        this.year = selectedDate.getFullYear();

        this._selectedCallback = selectedCallback;
    }

    get day(): number {
        return this._day;
    }

    set day(value: number) {
        if (this._day !== value) {
            this._day = value;
            this.notifyPropertyChanged("day", value);
        }
    }

    get month(): number {
        return this._month;
    }

    set month(value: number) {
        if (this._month !== value) {
            this._month = value;
            this.notifyPropertyChanged("month", value);
        }
    }

    get year(): number {
        return this._year;
    }

    set year(value: number) {
        if (this._year !== value) {
            this._year = value;
            this.notifyPropertyChanged("year", value);
        }
    }

    done() {
        this._selectedCallback(new Date(this.year, this.month, this.day));
        navigationModule.goBack();
    }
}