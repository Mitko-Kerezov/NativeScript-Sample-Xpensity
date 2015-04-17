﻿import applicationModule = require("application");

import viewsModule = require("./utils/views");

applicationModule.mainModule = viewsModule.Views.main;

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
applicationModule.resources = {
    formatDate: function (date: Date): string {
        return (date.getDate()) + " " + months[date.getMonth()] + ", " + date.getFullYear();
    },

    formatCurrency: function (currency: number) {
        return "$" + (Math.round(currency * 100) / 100).toFixed(2);
    },

    getExpenseCategoryColor: function (expense: any): string {
        return "#0000FF";
    }
}

applicationModule.start();
