var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var enumsModule = require("ui/enums");
var viewModelBaseModule = require("./view-model-base");
var navigationModule = require("../utils/navigation");
var notificationsModule = require("../utils/notifications");
var EditViewModelBase = (function (_super) {
    __extends(EditViewModelBase, _super);
    function EditViewModelBase(item) {
        _super.call(this);
        if (item) {
            this._isAdd = false;
            this._originalItem = item;
            this.item = EditViewModelBase.clone(item);
        }
        else {
            this._isAdd = true;
            this.item = this.createItem();
        }
    }
    Object.defineProperty(EditViewModelBase.prototype, "item", {
        get: function () {
            return this._item;
        },
        set: function (value) {
            if (this._item !== value) {
                this._item = value;
                this.notifyPropertyChanged("item", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditViewModelBase.prototype, "addVisibility", {
        get: function () {
            if (this._isAdd) {
                return enumsModule.Visibility.visible;
            }
            return enumsModule.Visibility.collapsed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditViewModelBase.prototype, "editVisibility", {
        get: function () {
            if (this._isAdd) {
                return enumsModule.Visibility.collapsed;
            }
            return enumsModule.Visibility.visible;
        },
        enumerable: true,
        configurable: true
    });
    EditViewModelBase.prototype.createItem = function () {
        return {};
    };
    EditViewModelBase.prototype.save = function () {
        if (this.validate()) {
            this.beginLoading();
            if (this._isAdd) {
                this.add();
            }
            else {
                this.update();
            }
        }
    };
    EditViewModelBase.prototype.add = function () {
        var _this = this;
        this.addItem(this.item).then(function (data) {
            _this.item.Id = data.result.Id;
            _this.onItemAdded(_this.item);
            _this.endLoading();
        }, function (error) {
            _this.endLoading();
        });
    };
    EditViewModelBase.prototype.update = function () {
        var _this = this;
        this.updateItem(this.item).then(function (data) {
            EditViewModelBase.copy(_this.item, _this._originalItem);
            _this.endLoading();
            navigationModule.goBack();
        }, function (error) {
            _this.endLoading();
        });
    };
    EditViewModelBase.prototype.del = function () {
        var _this = this;
        notificationsModule.confirm("Delete Item", "Do you want to delete the item?").then(function (value) {
            if (value) {
                _this.beginLoading();
                _this.deleteItem(_this.item).then(function (data) {
                    _this.onItemDeleted(_this.item);
                    _this.endLoading();
                }, function (error) {
                    _this.endLoading();
                });
            }
        });
    };
    EditViewModelBase.prototype.addItem = function (item) {
        return null;
    };
    EditViewModelBase.prototype.updateItem = function (item) {
        return null;
    };
    EditViewModelBase.prototype.deleteItem = function (item) {
        return null;
    };
    EditViewModelBase.prototype.validate = function () {
        return true;
    };
    EditViewModelBase.prototype.onItemAdded = function (item) {
        navigationModule.goBack();
    };
    EditViewModelBase.prototype.onItemDeleted = function (item) {
        navigationModule.goBack();
    };
    EditViewModelBase.clone = function (item) {
        var clone = {};
        EditViewModelBase.copy(item, clone);
        return clone;
    };
    EditViewModelBase.copy = function (fromItem, toItem) {
        for (var prop in fromItem) {
            if (fromItem.hasOwnProperty(prop)) {
                toItem[prop] = fromItem[prop];
            }
        }
    };
    return EditViewModelBase;
})(viewModelBaseModule.ViewModelBase);
exports.EditViewModelBase = EditViewModelBase;
