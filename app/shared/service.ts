﻿import { ImageSource } from "image-source";
import locationModule = require("location");
import typesModule = require("utils/types");

import constantsModule = require("./constants");
import applicationSettingsModule = require("application-settings");
import { Observable, EventData } from "data/observable";

var everliveModule = require("everlive");

export var ReportTypeName = "Report";
export var ExpenseTypeName = "Expense";
export var CategoryTypeName = "ExpenseCategory";
export var NotificationMessageEvent = "notificationMessage";

export interface NotificationEventData extends EventData {
    message: string;
}

class Service extends Observable {
    private _categories: any[];

    public switchOfflineMode(offlineMode: boolean) {
    }

    public switchNotifications(notifications: boolean): Promise<any> {
        if (notifications) {
            return new Promise<any>((resolve, reject) => {
                everlive.push.register({
                    iOS: {
                        badge: true,
                        sound: true,
                        alert: true
                    },

                    notificationCallbackIOS: (data) => {
                        this.notify<NotificationEventData>({
                            object: this,
                            eventName: NotificationMessageEvent,
                            message: data.alert
                        })
                    },

                    android: {
                        projectNumber: constantsModule.projectNumber
                    },

                    notificationCallbackAndroid: (data) => {
                        this.notify<NotificationEventData>({
                            object: this,
                            eventName: NotificationMessageEvent,
                            message: data
                        })
                    }
                }, resolve, reject);
            });
        }
        else {
            return new Promise<any>((resolve, reject) => {
                everlive.push.unregister(resolve, reject);
            });
        }
    }

    public login(username: string, password: string): Promise<any> {
        return everlive.authentication.login(username, password)
    }

    public logout() {
    }

    public signUp(username: string, password: string, displayName: string, email: string) {
        return new Promise<any>((resolve, reject) => {
            everlive.Users.register(username, password, {
                DisplayName: displayName,
                Email: email
            }).then((result) => {
                this.login(username, password)
                    .then(resolve, reject);
            }, reject);
        });
    }

    public recoverPassword(usernameOrEmail: string) {
        return new Promise<any>((resolve, reject) => {
            everlive.Users.resetPassword({ Username: usernameOrEmail })
                .then((result) => {
                    resolve(result);
                }, reject);
        });
    }

    public getUrlFromFileId(fileId: any): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            everlive.Files.getDownloadUrlById(fileId).then(url => {
                resolve(url);
            }, reject);
        });
    }

    public uploadImage(imageSource: ImageSource): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var file = {
                "Filename": "Picture.jpg",
                "ContentType": "image/jpeg",
                "base64": imageSource.toBase64String("JPEG", 100)
            };

            everlive.Files.create(file,
                function (data) {
                    resolve(data.result.Id);
                }, reject);
        });
    }

    public isLoggedIn(): Promise<boolean> {
        return new Promise<any>((resolve, reject) => {
            this.getCurrentUser().then((user) => {
                resolve(!typesModule.isNullOrUndefined(user));
            }, reject);
        });
    }

    public getCurrentUser(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            everlive.Users.currentUser()
                .then((data) => {
                    resolve(data.result);
                }, reject);
        });
    }

    public updateUser(user: any): Promise<any> {
        return everlive.Users.updateSingle(user);
    }

    public changePassword(username: string, password: string, newPassword: string) {
        return everlive.Users.changePassword(username, password, newPassword, true);
    }

    public createReport(report: any): Promise<any> {
        return this.createItem(ReportTypeName, report);
    }

    public updateReport(report: any): Promise<any> {
        return this.updateItem(ReportTypeName, report);
    }

    public deleteReport(report: any): Promise<any> {
        return this.deleteItem(ReportTypeName, report);
    }

    public createExpense(expense: any): Promise<any> {
        return this.createItem(ExpenseTypeName, expense);
    }

    public updateExpense(expense: any): Promise<any> {
        return this.updateItem(ExpenseTypeName, expense);
    }

    public deleteExpense(expense: any): Promise<any> {
        return this.deleteItem(ExpenseTypeName, expense);
    }

    private getItems(typeName: string, filter: any): Promise<any[]> {
        return everlive.data(typeName).get(filter);
    }

    private createItem(typeName: string, item: any): Promise<any> {
        return everlive.data(typeName).create(item);
    }

    private updateItem(typeName: string, item: any): Promise<any> {
        return everlive.data(typeName).updateSingle(item);
    }

    private deleteItem(typeName: string, item: any): Promise<any> {
        return everlive.data(typeName).destroySingle({ Id: item.Id });
    }
}

export var everlive = new everliveModule({
    apiKey: constantsModule.everliveKey,
    scheme: "https",
    authentication: {
        persist: true,
        onAuthenticationRequired: function () {
            //navigation.login();
        }
    },
    //offlineStorage: {
    //    storage: {
    //        provider: everliveModule.Constants.StorageProvider.LocalStorage
    //    },

    //    encryption: {
    //        provider: everliveModule.Constants.EncryptionProvider.Default
    //    }
    //}
});

export var service = new Service();