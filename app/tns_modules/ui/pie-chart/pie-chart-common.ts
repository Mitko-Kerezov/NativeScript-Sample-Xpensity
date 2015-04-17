﻿import itemsViewModule = require("ui/items-view");
import definitionModule = require("ui/pie-chart");
import utilsModule = require("utils/utils");

export class PieChart extends itemsViewModule.ItemsView implements definitionModule.PieChart {
    private _valueProperty: string;
    private _labelProperty: string;
    private _showLabels: boolean;
    private _canSelect: boolean;
    private _colors: string[];

    constructor() {
        super();

        this.valueProperty = null;
        this.labelProperty = null;
        this.canSelect = false;
        this.showLabels = false;
    }

    get valueProperty(): string {
        return this._valueProperty;
    }
    
    set valueProperty(value: string) {
        if (this._valueProperty !== value) {
            this._valueProperty = value;
            this.refresh();
        }
    }

    get labelProperty(): string {
        return this._labelProperty;
    }

    set labelProperty(value: string) {
        if (this._labelProperty !== value) {
            this._labelProperty = value;
            this.refresh();
        }
    }

    get showLabels(): boolean {
        return this._showLabels;
    }

    set showLabels(value: boolean) {
        if (this._showLabels !== value) {
            this._showLabels = value;
            this.refresh();
        }
    }

    get canSelect(): boolean {
        return this._canSelect;
    }

    set canSelect(value: boolean) {
        if (this._canSelect !== value) {
            this._canSelect = value;
            this.refresh();
        }
    }

    get colors(): string[] {
        return this._colors;
    }

    set colors(value: string[]) {
        if (this._colors !== value) {
            this._colors = value;
            this.refresh();
        }
    }

    onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void {
        super.onMeasure(widthMeasureSpec, widthMeasureSpec);
    }
}