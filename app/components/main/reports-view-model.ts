﻿import observableModule = require("data/observable");

import viewModelBaseModule = require("../view-model-base");
import viewReportViewModelModule = require("../view-report/view-report-view-model");
import serviceModule = require("../../utils/service");

export class ReportsViewModel extends viewModelBaseModule.ViewModelBase {
    private _reports: viewReportViewModelModule.ViewReportViewModel[];
    constructor() {
        super();

        this.refresh();
    }

    get reports(): viewReportViewModelModule.ViewReportViewModel[] {
        return this._reports;
    }

    set reports(value: viewReportViewModelModule.ViewReportViewModel[]) {
        if (this._reports !== value) {
            this._reports = value;
            this.notifyPropertyChanged("reports", value);
        }
    }

    refresh() {
        this.beginLoading();
        serviceModule.service.getReports().then((data: any[]) => {
            console.log("ITEMS: " + data.length);
            var reports: viewReportViewModelModule.ViewReportViewModel[] = [];
            for (var i = 0; i < data.length; i++) {
                reports.push(new viewReportViewModelModule.ViewReportViewModel(data[i]));
            }

            this.reports = reports;
            this.endLoading();
        },(error: any) => {
                this.endLoading();
            });
    }
}