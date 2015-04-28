var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var colorModule = require("color");
var pieChartCommonModule = require("ui/pie-chart/pie-chart-common");
require("utils/module-merge").merge(pieChartCommonModule, exports);
var PieChart = (function (_super) {
    __extends(PieChart, _super);
    function PieChart() {
        _super.call(this);
    }
    Object.defineProperty(PieChart.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    PieChart.prototype._createUI = function () {
        this._android = new com.telerik.widget.chart.visualization.pieChart.RadPieChartView(this._context);
        this._pieSeries = new com.telerik.widget.chart.visualization.pieChart.PieSeries();
        this._renderer = new CustomPieLabelRenderer(this, this._pieSeries);
        this._pieSeries.setLabelRenderer(this._renderer);
        this._pieSeries.setLabelOffset(-50);
        this._pieSeries.setLabelFillColor(android.graphics.Color.TRANSPARENT);
        this._pieSeries.setLabelTextColor(android.graphics.Color.BLACK);
        this._pieSeries.setLabelSize(18);
        this._android.getSeries().add(this._pieSeries);
        var that = this;
        this._pieSeries.setValueBinding(new com.telerik.widget.chart.engine.databinding.GenericDataPointBinding(new com.telerik.android.common.Function({
            apply: function (arg) {
                var item = JSON.parse(arg);
                return item.value;
            }
        })));
        this.refresh();
    };
    PieChart.prototype.refresh = function () {
        if (this._pieSeries && this.items) {
            _super.prototype.refresh.call(this);
            this._pieSeries.setData(new java.util.ArrayList());
            this._pieSeries.setData(this.getWrappedItems());
            this._pieSeries.setShowLabels(this.showLabels);
            if (this.showLabels) {
                this._android.setChartPadding(50);
            }
            else {
                this._android.setChartPadding(0);
            }
            if (this.canSelect) {
                if (!this._selectionBehavior) {
                    this._selectionBehavior = new com.telerik.widget.chart.visualization.behaviors.ChartSelectionBehavior();
                    this._android.getBehaviors().add(this._selectionBehavior);
                }
            }
            else if (this._selectionBehavior) {
                this._android.getBehaviors().remove(this._selectionBehavior);
                this._selectionBehavior = null;
            }
            this.updatePalette();
        }
    };
    PieChart.prototype.updatePalette = function () {
        if (this.items) {
            var customPalette = this._android.getPalette().clone();
            var pieEntries = customPalette.entriesForFamily(com.telerik.widget.palettes.ChartPalette.PIE_FAMILY);
            pieEntries.clear();
            var customSelectPalette = this._android.getSelectionPalette().clone();
            var pieSelectEntries = customSelectPalette.entriesForFamily(com.telerik.widget.palettes.ChartPalette.PIE_FAMILY);
            pieSelectEntries.clear();
            for (var i = 0; i < this.items.length; i++) {
                var item = this.items[i];
                var color = new colorModule.Color(item.Color);
                pieEntries.add(new com.telerik.widget.palettes.PaletteEntry(color.android));
                var entry = new com.telerik.widget.palettes.PaletteEntry(color.android);
                //entry.setStroke(PieChart.getDarkerColor(color).android);
                //entry.setStrokeWidth(3);
                pieSelectEntries.add(entry);
            }
            this._android.setPalette(customPalette);
            this._android.setSelectionPalette(customSelectPalette);
        }
    };
    PieChart.prototype.getWrappedItems = function () {
        var result = new java.util.ArrayList();
        if (this.items) {
            for (var i = 0; i < this.items.length; i++) {
                var item = this.items[i];
                var value = pieChartCommonModule.getPropertyValue(item, this.valueProperty);
                var label = pieChartCommonModule.getPropertyValue(item, this.labelProperty);
                result.add(java.lang.String.valueOf(JSON.stringify({ value: value, label: label })));
            }
        }
        return result;
    };
    return PieChart;
})(pieChartCommonModule.PieChart);
exports.PieChart = PieChart;
var CustomPieLabelRenderer = (function (_super) {
    __extends(CustomPieLabelRenderer, _super);
    function CustomPieLabelRenderer(owner, series) {
        _super.call(this, series);
        this._owner = owner;
    }
    CustomPieLabelRenderer.prototype.getLabelText = function (dataPoint) {
        var item = JSON.parse(dataPoint.getDataItem());
        return pieChartCommonModule.getLabelText(item.label, item.value);
    };
    CustomPieLabelRenderer.prototype.drawLabelBackground = function (canvas, path, index) {
    };
    CustomPieLabelRenderer.prototype.applyPalette = function (palette) {
    };
    return CustomPieLabelRenderer;
})(com.telerik.widget.chart.visualization.pieChart.PieSeriesLabelRenderer);
exports.CustomPieLabelRenderer = CustomPieLabelRenderer;
//# sourceMappingURL=pie-chart.android.js.map