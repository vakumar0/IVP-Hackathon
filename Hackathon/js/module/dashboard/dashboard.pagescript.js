var Dashboard = function () {
    this.url = {
        dashboardHtml: 'html/module/dashboard.html',
        operationsHtml: 'html/module/operations.html'
    }
}

Dashboard.prototype.init = function () {
    this.loadDashBoardHtml();
}

Dashboard.prototype.loadDashBoardHtml = function () {
    $.ajax({
        url: 'html/module/dashboard.html', success: function (html) {
            $('#contentBody').append(html);
            Dashboard.prototype.bindCharts('topLeftArea', 'column', '', '45%', Dashboard.prototype.getDataForXirr());
            Dashboard.prototype.bindCharts('barHighCharts', 'spline', '', '37%', Dashboard.prototype.getDataForPerformance());
            Dashboard.prototype.bindCharts('columnHighcharts', 'column', '', '37%', Dashboard.prototype.getDataForXirr());
            Dashboard.prototype.bindCharts('splineHighcharts', 'spline', '', '37%', Dashboard.prototype.getDataForPerformance());
            Dashboard.prototype.bindCharts('areaHighcharts', 'area', '', '37%', Dashboard.prototype.getDataForFunds());
            Dashboard.prototype.bindClickControls();
        }
    });
}

Dashboard.prototype.bindClickControls = function () {
    $('.tileHeading').unbind('click').bind('click', function (event) {
        Dashboard.prototype.bindCenterTile(event);
    });

    $('#chartTypes .chartTypes').unbind('click').bind('click', function (event) {
        Dashboard.prototype.changeChartType(event);
    });

    $('#operationsTab').unbind('click').bind('click', function (event) {
        var target = $(event.target);
        $('#tabsParentDiv .tabs').removeClass('selected');
        $(target[0].parentElement).addClass('selected');
        Dashboard.prototype.bindOperationsTab();
    });

    $('#summaryTab').unbind('click').bind('click', function (event) {
        var target = $(event.target);
        $('#tabsParentDiv .tabs').removeClass('selected');
        $(target[0].parentElement).addClass('selected');
        $('#contentBody').children().remove();
        Dashboard.prototype.loadDashBoardHtml();
    });

    $('#TradesTab').unbind('click').bind('click', function (event) {
        var target = $(event.target);
        $('#tabsParentDiv .tabs').removeClass('selected');
        $(target[0].parentElement).addClass('selected');
        $('#contentBody').children().remove();
        Dashboard.prototype.bindTradesTab();
    });
}

Dashboard.prototype.bindTradesTab = function () {
    $.ajax({
        url: 'html/module/trades.html', success: function (html) {
            $('#contentBody').children().remove();
            $('#contentBody').append(html);
            $("#tradesBody").steps({
                headerTag: "h3",
                bodyTag: "section",
                transitionEffect: "slideLeft",
                autoFocus: true
            });
        }
    });
}

Dashboard.prototype.bindOperationsTab = function () {
    $.ajax({
        url: 'html/module/operations.html', success: function (html) {
            $('#contentBody').children().remove();
            $('#contentBody').append(html);
            Dashboard.prototype.bindGrid("gridArea");

            $('#smallGrid').unbind('click').bind('click', function (event) {
                $('.jsgrid-cell').css({ 'padding': '.3em' });
            });

            $('#normalGrid').unbind('click').bind('click', function (event) {
                $('.jsgrid-cell').css({ 'padding': '.5em' });
            });

            $('#largeGrid').unbind('click').bind('click', function (event) {
                $('.jsgrid-cell').css({ 'padding': '.7em' });
            });
        }
    });
}

Dashboard.prototype.topLeftAreaForGridData = function () {
    $('#topLeftArea').empty();
    $('<div/>', {
        id: 'topLeftAreaForGrid',
    }).appendTo('#topLeftArea');

    return gridInfo = {
        gridData: Dashboard.prototype.getData(),
        height: '97%',
        inserting: false,
        selecting: false,
        sorting: true,
        editing: false,
        fields: [
            { name: "Institutional_sector_name", type: "text", align: "left", headercss: "alignLeft", width: '130px' },
            { name: "Descriptor", type: "text", align: "left", headercss: "alignLeft", width: '200px' },
            { name: "Year", type: "text", align: "left", headercss: "alignLeft", width: '60px' },
            {
                name: "Values", type: "number", align: "right", width: '60px', headercss: "alignRight",
                cellRenderer: function (value, item) {
                    return value < 0 ? $("<td>").css({ 'color': 'red' }).append('$(' + (value * -1) + ')') : $("<td>").css({ 'color': '#08c73a' }).append('$' + value);
                }
            },            
            { name: "SNA08TRANS", type: "text", align: "left", headercss: "alignLeft" },
            { name: "Status", type: "text", align: "left", headercss: "alignLeft", width: '50px' },
            { name: "Institutional_sector_code", type: "number", align: "right", headercss: "alignRight" }
        ]
    }
}

Dashboard.prototype.gridAreaData = function () {
    return gridInfo = {
        gridData: Dashboard.prototype.getData2(),
        height: '97%',
        inserting: true,
        selecting: true,
        sorting: true,
        editing: false,
        fields: [
            { name: "Year", type: "text", align: "left", headercss: "alignLeft", width: '60px' },
            { name: "Institutional_sector_name", type: "text", align: "left", headercss: "alignLeft", width: '130px' },
            {
                name: "Values", type: "number", align: "right", width: '60px', headercss: "alignRight",
                cellRenderer: function (value, item) {
                    return value < 0 ? $("<td>").css({ 'color': 'red' }).append('$(' + (value * -1) + ')') : $("<td>").css({ 'color': '#08c73a' }).append('$' + value);
                }
            },
            { name: "Descriptor", type: "text", align: "left", headercss: "alignLeft", width: '200px' },            
            { name: "SNA08TRANS", type: "text", align: "left", headercss: "alignLeft" },
            { name: "Asset_liability_code", type: "text", align: "left", headercss: "alignLeft", width: '80px' },
            { name: "Status", type: "text", align: "left", headercss: "alignLeft", width: '50px' },
            { name: "Institutional_sector_code", type: "number", align: "right", headercss: "alignRight" },
            { type: "control" }
        ]
    }
}

Dashboard.prototype.bindGrid = function (div) {

    var gridInfo = {};
    if (div == 'topLeftAreaForGrid') {
        gridInfo = Dashboard.prototype.topLeftAreaForGridData();
    }
    else {
        gridInfo = Dashboard.prototype.gridAreaData()
    }


    $("#" + div).jsGrid({
        width: "100%",
        height: gridInfo.height,
        //filtering: true,
        inserting: gridInfo.inserting,
        editing: gridInfo.editing,
        selecting: gridInfo.selecting,
        sorting: gridInfo.sorting,
        data: gridInfo.gridData,
        fields: gridInfo.fields

    });

}

Dashboard.prototype.changeChartType = function (event) {
    var $target = $(event.target);
    var graphType = $target[0].getAttribute('graphType');
    var series = '';
    if (graphType == 'bar') {
        series = Dashboard.prototype.getDataForXirr();
        Dashboard.prototype.bindCharts('topLeftArea', graphType, '', '42%', series);
    } else if (graphType == 'column') {
        series = Dashboard.prototype.getDataForPerformance();
        Dashboard.prototype.bindCharts('topLeftArea', graphType, '', '42%', series);
    } else if (graphType == 'grid') {
        Dashboard.prototype.bindGrid('topLeftAreaForGrid');
    }
    else {
        series = Dashboard.prototype.getDataForFunds();
        Dashboard.prototype.bindCharts('topLeftArea', graphType, '', '42%', series);
    }

}

Dashboard.prototype.bindCenterTile = function (event) {
    $target = $(event.target);
    var graphType = $target.next()[0].getAttribute('graphType');
    var title = $target[0].innerText;
    if (graphType == 'bar') {
        series = Dashboard.prototype.getDataForXirr();
    } else if (graphType == 'column') {
        series = Dashboard.prototype.getDataForPerformance();
    } else {
        series = Dashboard.prototype.getDataForFunds();
    }
    Dashboard.prototype.bindCharts('topLeftArea', graphType, title, '45%', series);

}

Dashboard.prototype.bindChartsPie = function (div, chartType, title) {
    Highcharts.chart(div, {
        chart: {
            type: chartType,
        },
        title: {
            text: title
        },
        xAxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Shares'
            }
        },
        exporting: {
            enabled: false
        },
        colors: ['#202020', '#7E909A', '#1C4E80', '#A5D8DD', '#EA6A47', '#0091D5'],
        credits: {
            enabled: false
        },
        series: [{
            name: 'Tokyo',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0]

        }]
    });
}

Dashboard.prototype.bindCharts = function (div, chartType, title, height, series) {
    Highcharts.chart(div, {
        chart: {
            type: chartType,
            height: height,
            style: {
                fontFamily: 'Work Sans'
            }
        },
        title: {
            text: title
        },
        xAxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Shares'
            }
        },
        exporting: {
            enabled: false
        },
        colors: ['#1C4E80', '#A5D8DD', '#EA6A47'],
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="font-size:12px">{series.name}: </td>' +
                '<td style="font-size:12px">{point.y:.1f} </td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        credits: {
            enabled: false
        },
        series: series
    });
}

Dashboard.prototype.DateRangePicker = function () {
    $('input[name="Dates"]').Daterangepicker({
        singleDatePicker: true,
    });
}

Dashboard.prototype.getData = function () {
    return [
    {
        "Institutional_sector_name": "Captive financial institutions",
        "Descriptor": "Revaluation Account Financial assets Total financial assets",
        "Institutional_sector_code": 281,
        "Year": 2008.03,
        "SNA08TRANS": "K070000",
        "Asset_liability_code": "AFA0000",
        "Status": "REVISED",
        "Values": 3207
    },
    {
        "Institutional_sector_name": "Captive financial institutions",
        "Descriptor": "Revaluation Account Financial assets Total financial assets",
        "Institutional_sector_code": 281,
        "Year": 2009.03,
        "SNA08TRANS": "K070000",
        "Asset_liability_code": "AFA0000",
        "Status": "REVISED",
        "Values": 5017
    },
    {
        "Institutional_sector_name": "Captive financial institutions",
        "Descriptor": "Revaluation Account Financial assets Total financial assets",
        "Institutional_sector_code": 281,
        "Year": 2010.03,
        "SNA08TRANS": "K070000",
        "Asset_liability_code": "AFA0000",
        "Status": "REVISED",
        "Values": 228
    },
    {
        "Institutional_sector_name": "Captive financial institutions",
        "Descriptor": "Revaluation Account Financial assets Total financial assets",
        "Institutional_sector_code": 281,
        "Year": 2013.03,
        "SNA08TRANS": "K070000",
        "Asset_liability_code": "AFA0000",
        "Status": "REVISED",
        "Values": 2336
    },
    {
        "Institutional_sector_name": "Captive financial institutions",
        "Descriptor": "Revaluation Account Financial assets Total financial assets",
        "Institutional_sector_code": 281,
        "Year": 2014.03,
        "SNA08TRANS": "K070000",
        "Asset_liability_code": "AFA0000",
        "Status": "REVISED",
        "Values": -3031
    },
    {
        "Institutional_sector_name": "Captive financial institutions",
        "Descriptor": "Revaluation Account Financial assets Total financial assets",
        "Institutional_sector_code": 281,
        "Year": 2015.03,
        "SNA08TRANS": "K070000",
        "Asset_liability_code": "AFA0000",
        "Status": "REVISED",
        "Values": 4560
    },
    {
        "Institutional_sector_name": "Captive financial institutions",
        "Descriptor": "Revaluation Account Financial assets Total financial assets",
        "Institutional_sector_code": 281,
        "Year": 2016.03,
        "SNA08TRANS": "K070000",
        "Asset_liability_code": "AFA0000",
        "Status": "REVISED",
        "Values": 3012
    },
    {
        "Institutional_sector_name": "Captive financial institutions",
        "Descriptor": "Revaluation Account Financial assets Total financial assets",
        "Institutional_sector_code": 281,
        "Year": 2017.03,
        "SNA08TRANS": "K070000",
        "Asset_liability_code": "AFA0000",
        "Status": "FINAL",
        "Values": 4926
    },
    {
        "Institutional_sector_name": "Captive financial institutions",
        "Descriptor": "Revaluation Account Financial liabilities Monetary gold and special drawing rights",
        "Institutional_sector_code": 281,
        "Year": 2008.03,
        "SNA08TRANS": "K070000",
        "Asset_liability_code": "AFL0100",
        "Status": "FINAL",
        "Values": 552
    },
    {
        "Institutional_sector_name": "Captive financial institutions",
        "Descriptor": "Revaluation Account Financial liabilities Monetary gold and special drawing rights",
        "Institutional_sector_code": 281,
        "Year": 2009.03,
        "SNA08TRANS": "K070000",
        "Asset_liability_code": "AFL0100",
        "Status": "FINAL",
        "Values": 552
    },
    {
        "Institutional_sector_name": "Captive financial institutions",
        "Descriptor": "Revaluation Account Financial liabilities Monetary gold and special drawing rights",
        "Institutional_sector_code": 281,
        "Year": 2010.03,
        "SNA08TRANS": "K070000",
        "Asset_liability_code": "AFL0100",
        "Status": "FINAL",
        "Values": 552
    },
    {
        "Institutional_sector_name": "Captive financial institutions",
        "Descriptor": "Revaluation Account Financial liabilities Monetary gold and special drawing rights",
        "Institutional_sector_code": 281,
        "Year": 2011.03,
        "SNA08TRANS": "K070000",
        "Asset_liability_code": "AFL0100",
        "Status": "FINAL",
        "Values": 552
    }
    ]
}

Dashboard.prototype.getData2 = function () {
    return [
  {
      "Year": 2008.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial assets Total financial assets",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFA0000",
      "Status": "REVISED",
      "Values": 3207
  },
  {
      "Year": 2009.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial assets Total financial assets",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFA0000",
      "Status": "REVISED",
      "Values": 5017
  },
  {
      "Year": 2010.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial assets Total financial assets",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFA0000",
      "Status": "REVISED",
      "Values": 228
  },
  {
      "Year": 2011.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial assets Total financial assets",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFA0000",
      "Status": "REVISED",
      "Values": -91
  },
  {
      "Year": 2012.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial assets Total financial assets",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFA0000",
      "Status": "REVISED",
      "Values": -552
  },
  {
      "Year": 2013.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial assets Total financial assets",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFA0000",
      "Status": "REVISED",
      "Values": 2336
  },
  {
      "Year": 2014.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial assets Total financial assets",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFA0000",
      "Status": "REVISED",
      "Values": -3031
  },
  {
      "Year": 2015.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial assets Total financial assets",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFA0000",
      "Status": "REVISED",
      "Values": 4560
  },
  {
      "Year": 2016.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial assets Total financial assets",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFA0000",
      "Status": "REVISED",
      "Values": 3012
  },
  {
      "Year": 2017.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial assets Total financial assets",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFA0000",
      "Status": "FINAL",
      "Values": 4926
  },
  {
      "Year": 2008.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Monetary gold and special drawing rights",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0100",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2009.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Monetary gold and special drawing rights",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0100",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2010.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Monetary gold and special drawing rights",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0100",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2011.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Monetary gold and special drawing rights",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0100",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2012.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Monetary gold and special drawing rights",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0100",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2013.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Monetary gold and special drawing rights",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0100",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2014.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Monetary gold and special drawing rights",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0100",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2015.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Monetary gold and special drawing rights",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0100",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2016.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Monetary gold and special drawing rights",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0100",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2017.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Monetary gold and special drawing rights",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0100",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2008.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Currency and deposits",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0200",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2009.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Currency and deposits",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0200",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2010.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Currency and deposits",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0200",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2011.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Currency and deposits",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0200",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2012.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Currency and deposits",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0200",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2013.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Currency and deposits",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0200",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2014.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Currency and deposits",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0200",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2015.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Currency and deposits",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0200",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2016.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Currency and deposits",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0200",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2017.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Currency and deposits",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0200",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2008.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Debt securities",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0300",
      "Status": "FINAL",
      "Values": -109
  },
  {
      "Year": 2009.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Debt securities",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0300",
      "Status": "FINAL",
      "Values": 1921
  },
  {
      "Year": 2010.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Debt securities",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0300",
      "Status": "FINAL",
      "Values": -1336
  },
  {
      "Year": 2011.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Debt securities",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0300",
      "Status": "FINAL",
      "Values": 157
  },
  {
      "Year": 2012.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Debt securities",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0300",
      "Status": "FINAL",
      "Values": 1648
  },
  {
      "Year": 2013.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Debt securities",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0300",
      "Status": "FINAL",
      "Values": 883
  },
  {
      "Year": 2014.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Debt securities",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0300",
      "Status": "REVISED",
      "Values": -784
  },
  {
      "Year": 2015.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Debt securities",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0300",
      "Status": "REVISED",
      "Values": 456
  },
  {
      "Year": 2016.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Debt securities",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0300",
      "Status": "REVISED",
      "Values": 3310
  },
  {
      "Year": 2017.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Debt securities",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0300",
      "Status": "FINAL",
      "Values": 1907
  },
  {
      "Year": 2008.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Loans",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0400",
      "Status": "REVISED",
      "Values": 2987
  },
  {
      "Year": 2009.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Loans",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0400",
      "Status": "REVISED",
      "Values": 2987
  },
  {
      "Year": 2010.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Loans",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0400",
      "Status": "REVISED",
      "Values": 2987
  },
  {
      "Year": 2011.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Loans",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0400",
      "Status": "REVISED",
      "Values": 2987
  },
  {
      "Year": 2012.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Loans",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0400",
      "Status": "REVISED",
      "Values": 2987
  },
  {
      "Year": 2013.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Loans",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0400",
      "Status": "REVISED",
      "Values": 2987
  },
  {
      "Year": 2014.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Loans",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0400",
      "Status": "REVISED",
      "Values": 2987
  },
  {
      "Year": 2015.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Loans",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0400",
      "Status": "REVISED",
      "Values": 2987
  },
  {
      "Year": 2016.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Loans",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0400",
      "Status": "REVISED",
      "Values": 2987
  },
  {
      "Year": 2017.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Loans",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0400",
      "Status": "FINAL",
      "Values": 2987
  },
  {
      "Year": 2008.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Equity and investment fund shares",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0500",
      "Status": "REVISED",
      "Values": -4690
  },
  {
      "Year": 2009.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Equity and investment fund shares",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0500",
      "Status": "REVISED",
      "Values": -4250
  },
  {
      "Year": 2010.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Equity and investment fund shares",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0500",
      "Status": "REVISED",
      "Values": 2963
  },
  {
      "Year": 2011.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Equity and investment fund shares",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0500",
      "Status": "REVISED",
      "Values": 552
  },
  {
      "Year": 2012.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Equity and investment fund shares",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0500",
      "Status": "REVISED",
      "Values": -2988
  },
  {
      "Year": 2013.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Equity and investment fund shares",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0500",
      "Status": "REVISED",
      "Values": 2790
  },
  {
      "Year": 2014.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Equity and investment fund shares",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0500",
      "Status": "REVISED",
      "Values": -842
  },
  {
      "Year": 2015.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Equity and investment fund shares",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0500",
      "Status": "REVISED",
      "Values": 5590
  },
  {
      "Year": 2016.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Equity and investment fund shares",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0500",
      "Status": "REVISED",
      "Values": 519
  },
  {
      "Year": 2017.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Equity and investment fund shares",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0500",
      "Status": "FINAL",
      "Values": -1568
  },
  {
      "Year": 2008.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Insurance, pension and standardised guarantee schemes",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0600",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2009.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Insurance, pension and standardised guarantee schemes",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0600",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2010.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Insurance, pension and standardised guarantee schemes",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0600",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2011.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Insurance, pension and standardised guarantee schemes",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0600",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2012.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Insurance, pension and standardised guarantee schemes",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0600",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2013.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Insurance, pension and standardised guarantee schemes",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0600",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2014.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Insurance, pension and standardised guarantee schemes",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0600",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2015.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Insurance, pension and standardised guarantee schemes",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0600",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2016.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Insurance, pension and standardised guarantee schemes",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0600",
      "Status": "FINAL",
      "Values": 2987
  },
  {
      "Year": 2017.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Insurance, pension and standardised guarantee schemes",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0600",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2008.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Financial derivatives and employee stock options",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0700",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2009.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Financial derivatives and employee stock options",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0700",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2010.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Financial derivatives and employee stock options",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0700",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2011.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Financial derivatives and employee stock options",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0700",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2012.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Financial derivatives and employee stock options",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0700",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2013.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Financial derivatives and employee stock options",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0700",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2014.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Financial derivatives and employee stock options",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0700",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2015.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Financial derivatives and employee stock options",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0700",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2016.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Financial derivatives and employee stock options",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0700",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2017.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Financial derivatives and employee stock options",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0700",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2008.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Other accounts payable",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0800",
      "Status": "FINAL",
      "Values": 2987
  },
  {
      "Year": 2009.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Other accounts payable",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0800",
      "Status": "FINAL",
      "Values": 2987
  },
  {
      "Year": 2010.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Other accounts payable",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0800",
      "Status": "FINAL",
      "Values": 2987
  },
  {
      "Year": 2011.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Other accounts payable",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0800",
      "Status": "FINAL",
      "Values": 2987
  },
  {
      "Year": 2012.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Other accounts payable",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0800",
      "Status": "FINAL",
      "Values": 2987
  },
  {
      "Year": 2013.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Other accounts payable",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0800",
      "Status": "FINAL",
      "Values": 2987
  },
  {
      "Year": 2014.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Other accounts payable",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0800",
      "Status": "REVISED",
      "Values": 2987
  },
  {
      "Year": 2015.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Other accounts payable",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0800",
      "Status": "REVISED",
      "Values": 2987
  },
  {
      "Year": 2016.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Other accounts payable",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0800",
      "Status": "REVISED",
      "Values": 2987
  },
  {
      "Year": 2017.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Other accounts payable",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0800",
      "Status": "FINAL",
      "Values": 2987
  },
  {
      "Year": 2008.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Total financial liabilities",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0000",
      "Status": "REVISED",
      "Values": -4860
  },
  {
      "Year": 2009.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Total financial liabilities",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0000",
      "Status": "REVISED",
      "Values": -2283
  },
  {
      "Year": 2010.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Total financial liabilities",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0000",
      "Status": "REVISED",
      "Values": 1586
  },
  {
      "Year": 2011.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Total financial liabilities",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0000",
      "Status": "REVISED",
      "Values": 146
  },
  {
      "Year": 2012.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Total financial liabilities",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0000",
      "Status": "REVISED",
      "Values": -1399
  },
  {
      "Year": 2013.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Total financial liabilities",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0000",
      "Status": "REVISED",
      "Values": 3669
  },
  {
      "Year": 2014.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Total financial liabilities",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0000",
      "Status": "REVISED",
      "Values": -1693
  },
  {
      "Year": 2015.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Total financial liabilities",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0000",
      "Status": "REVISED",
      "Values": 6147
  },
  {
      "Year": 2016.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Total financial liabilities",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0000",
      "Status": "REVISED",
      "Values": 3982
  },
  {
      "Year": 2017.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Financial liabilities Total financial liabilities",
      "SNA08TRANS": "K070000",
      "Asset_liability_code": "AFL0000",
      "Status": "FINAL",
      "Values": 241
  },
  {
      "Year": 2008.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Changes in net worth due to holding gains/losses",
      "SNA08TRANS": "B103000",
      "Asset_liability_code": "A000000",
      "Status": "REVISED",
      "Values": 8366
  },
  {
      "Year": 2009.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Changes in net worth due to holding gains/losses",
      "SNA08TRANS": "B103000",
      "Asset_liability_code": "A000000",
      "Status": "REVISED",
      "Values": 7807
  },
  {
      "Year": 2010.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Changes in net worth due to holding gains/losses",
      "SNA08TRANS": "B103000",
      "Asset_liability_code": "A000000",
      "Status": "REVISED",
      "Values": -679
  },
  {
      "Year": 2011.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Changes in net worth due to holding gains/losses",
      "SNA08TRANS": "B103000",
      "Asset_liability_code": "A000000",
      "Status": "REVISED",
      "Values": -463
  },
  {
      "Year": 2012.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Changes in net worth due to holding gains/losses",
      "SNA08TRANS": "B103000",
      "Asset_liability_code": "A000000",
      "Status": "REVISED",
      "Values": 1181
  },
  {
      "Year": 2013.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Changes in net worth due to holding gains/losses",
      "SNA08TRANS": "B103000",
      "Asset_liability_code": "A000000",
      "Status": "REVISED",
      "Values": -956
  },
  {
      "Year": 2014.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Changes in net worth due to holding gains/losses",
      "SNA08TRANS": "B103000",
      "Asset_liability_code": "A000000",
      "Status": "REVISED",
      "Values": -1520
  },
  {
      "Year": 2015.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Changes in net worth due to holding gains/losses",
      "SNA08TRANS": "B103000",
      "Asset_liability_code": "A000000",
      "Status": "REVISED",
      "Values": -655
  },
  {
      "Year": 2016.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Changes in net worth due to holding gains/losses",
      "SNA08TRANS": "B103000",
      "Asset_liability_code": "A000000",
      "Status": "REVISED",
      "Values": -599
  },
  {
      "Year": 2017.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Revaluation Account Changes in net worth due to holding gains/losses",
      "SNA08TRANS": "B103000",
      "Asset_liability_code": "A000000",
      "Status": "FINAL",
      "Values": 4826
  },
  {
      "Year": 2008.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance monetary gold and special drawing rights",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0100",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2009.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance monetary gold and special drawing rights",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0100",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2010.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance monetary gold and special drawing rights",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0100",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2011.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance monetary gold and special drawing rights",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0100",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2012.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance monetary gold and special drawing rights",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0100",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2013.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance monetary gold and special drawing rights",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0100",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2014.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance monetary gold and special drawing rights",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0100",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2015.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance monetary gold and special drawing rights",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0100",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2016.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance monetary gold and special drawing rights",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0100",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2017.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance monetary gold and special drawing rights",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0100",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2008.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance currency and deposits",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0200",
      "Status": "FINAL",
      "Values": 5137
  },
  {
      "Year": 2009.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance currency and deposits",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0200",
      "Status": "FINAL",
      "Values": 6931
  },
  {
      "Year": 2010.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance currency and deposits",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0200",
      "Status": "FINAL",
      "Values": 10429
  },
  {
      "Year": 2011.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance currency and deposits",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0200",
      "Status": "FINAL",
      "Values": 11292
  },
  {
      "Year": 2012.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance currency and deposits",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0200",
      "Status": "FINAL",
      "Values": 12207
  },
  {
      "Year": 2013.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance currency and deposits",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0200",
      "Status": "FINAL",
      "Values": 11431
  },
  {
      "Year": 2014.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance currency and deposits",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0200",
      "Status": "REVISED",
      "Values": 12138
  },
  {
      "Year": 2015.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance currency and deposits",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0200",
      "Status": "REVISED",
      "Values": 11743
  },
  {
      "Year": 2016.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance currency and deposits",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0200",
      "Status": "REVISED",
      "Values": 16564
  },
  {
      "Year": 2017.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance currency and deposits",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0200",
      "Status": "FINAL",
      "Values": 17959
  },
  {
      "Year": 2008.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance debt securities",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0300",
      "Status": "FINAL",
      "Values": 7695
  },
  {
      "Year": 2009.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance debt securities",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0300",
      "Status": "FINAL",
      "Values": 6386
  },
  {
      "Year": 2010.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance debt securities",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0300",
      "Status": "FINAL",
      "Values": 13383
  },
  {
      "Year": 2011.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance debt securities",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0300",
      "Status": "FINAL",
      "Values": 15639
  },
  {
      "Year": 2012.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance debt securities",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0300",
      "Status": "FINAL",
      "Values": 15794
  },
  {
      "Year": 2013.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance debt securities",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0300",
      "Status": "FINAL",
      "Values": 12328
  },
  {
      "Year": 2014.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance debt securities",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0300",
      "Status": "REVISED",
      "Values": 11898
  },
  {
      "Year": 2015.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance debt securities",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0300",
      "Status": "REVISED",
      "Values": 17132
  },
  {
      "Year": 2016.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance debt securities",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0300",
      "Status": "REVISED",
      "Values": 20868
  },
  {
      "Year": 2017.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance debt securities",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0300",
      "Status": "FINAL",
      "Values": 12726
  },
  {
      "Year": 2008.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance loans",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0400",
      "Status": "FINAL",
      "Values": 127394
  },
  {
      "Year": 2009.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance loans",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0400",
      "Status": "FINAL",
      "Values": 126415
  },
  {
      "Year": 2010.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance loans",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0400",
      "Status": "FINAL",
      "Values": 121018
  },
  {
      "Year": 2011.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance loans",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0400",
      "Status": "FINAL",
      "Values": 128988
  },
  {
      "Year": 2012.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance loans",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0400",
      "Status": "FINAL",
      "Values": 125573
  },
  {
      "Year": 2013.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance loans",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0400",
      "Status": "FINAL",
      "Values": 112269
  },
  {
      "Year": 2014.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance loans",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0400",
      "Status": "REVISED",
      "Values": 115388
  },
  {
      "Year": 2015.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance loans",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0400",
      "Status": "REVISED",
      "Values": 122718
  },
  {
      "Year": 2016.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance loans",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0400",
      "Status": "REVISED",
      "Values": 104320
  },
  {
      "Year": 2017.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance loans",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0400",
      "Status": "FINAL",
      "Values": 102624
  },
  {
      "Year": 2008.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance equity and investment fund shares",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0500",
      "Status": "REVISED",
      "Values": 145694
  },
  {
      "Year": 2009.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance equity and investment fund shares",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0500",
      "Status": "REVISED",
      "Values": 142425
  },
  {
      "Year": 2010.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance equity and investment fund shares",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0500",
      "Status": "REVISED",
      "Values": 122541
  },
  {
      "Year": 2011.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance equity and investment fund shares",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0500",
      "Status": "REVISED",
      "Values": 143600
  },
  {
      "Year": 2012.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance equity and investment fund shares",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0500",
      "Status": "REVISED",
      "Values": 134743
  },
  {
      "Year": 2013.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance equity and investment fund shares",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0500",
      "Status": "REVISED",
      "Values": 132244
  },
  {
      "Year": 2014.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance equity and investment fund shares",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0500",
      "Status": "REVISED",
      "Values": 147850
  },
  {
      "Year": 2015.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance equity and investment fund shares",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0500",
      "Status": "REVISED",
      "Values": 153107
  },
  {
      "Year": 2016.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance equity and investment fund shares",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0500",
      "Status": "REVISED",
      "Values": 162458
  },
  {
      "Year": 2017.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance equity and investment fund shares",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0500",
      "Status": "FINAL",
      "Values": 145800
  },
  {
      "Year": 2008.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance insurance, pension, and standardised guarantee schemes",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0600",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2009.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance insurance, pension, and standardised guarantee schemes",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0600",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2010.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance insurance, pension, and standardised guarantee schemes",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0600",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2011.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance insurance, pension, and standardised guarantee schemes",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0600",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2012.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance insurance, pension, and standardised guarantee schemes",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0600",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2013.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance insurance, pension, and standardised guarantee schemes",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0600",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2014.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance insurance, pension, and standardised guarantee schemes",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0600",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2015.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance insurance, pension, and standardised guarantee schemes",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0600",
      "Status": "FINAL",
      "Values": 2987
  },
  {
      "Year": 2016.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance insurance, pension, and standardised guarantee schemes",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0600",
      "Status": "FINAL",
      "Values": 2987
  },
  {
      "Year": 2017.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance insurance, pension, and standardised guarantee schemes",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0600",
      "Status": "FINAL",
      "Values": 2987
  },
  {
      "Year": 2008.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance financial derivatives",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0700",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2009.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance financial derivatives",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0700",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2010.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance financial derivatives",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0700",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2011.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance financial derivatives",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0700",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2012.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance financial derivatives",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0700",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2013.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance financial derivatives",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0700",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2014.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance financial derivatives",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0700",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2015.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance financial derivatives",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0700",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2016.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance financial derivatives",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0700",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2017.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance financial derivatives",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0700",
      "Status": "FINAL",
      "Values": 552
  },
  {
      "Year": 2008.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance other accounts receivable",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0800",
      "Status": "FINAL",
      "Values": 11195
  },
  {
      "Year": 2009.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance other accounts receivable",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0800",
      "Status": "FINAL",
      "Values": 11306
  },
  {
      "Year": 2010.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance other accounts receivable",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0800",
      "Status": "FINAL",
      "Values": 10294
  },
  {
      "Year": 2011.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance other accounts receivable",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0800",
      "Status": "FINAL",
      "Values": 6498
  },
  {
      "Year": 2012.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance other accounts receivable",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0800",
      "Status": "FINAL",
      "Values": 12595
  },
  {
      "Year": 2013.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance other accounts receivable",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0800",
      "Status": "FINAL",
      "Values": 6897
  },
  {
      "Year": 2014.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance other accounts receivable",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0800",
      "Status": "REVISED",
      "Values": 6472
  },
  {
      "Year": 2015.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance other accounts receivable",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0800",
      "Status": "FINAL",
      "Values": 2987
  },
  {
      "Year": 2016.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance other accounts receivable",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0800",
      "Status": "FINAL",
      "Values": 2987
  },
  {
      "Year": 2017.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance other accounts receivable",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0800",
      "Status": "FINAL",
      "Values": 2987
  },
  {
      "Year": 2008.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance Total financial assets",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0000",
      "Status": "REVISED",
      "Values": 297115
  },
  {
      "Year": 2009.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance Total financial assets",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0000",
      "Status": "REVISED",
      "Values": 293463
  },
  {
      "Year": 2010.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance Total financial assets",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0000",
      "Status": "REVISED",
      "Values": 277665
  },
  {
      "Year": 2011.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance Total financial assets",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0000",
      "Status": "REVISED",
      "Values": 306017
  },
  {
      "Year": 2012.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance Total financial assets",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0000",
      "Status": "REVISED",
      "Values": 300912
  },
  {
      "Year": 2013.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance Total financial assets",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0000",
      "Status": "REVISED",
      "Values": 275169
  },
  {
      "Year": 2014.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance Total financial assets",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0000",
      "Status": "REVISED",
      "Values": 293746
  },
  {
      "Year": 2015.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance Total financial assets",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0000",
      "Status": "REVISED",
      "Values": 309742
  },
  {
      "Year": 2016.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance Total financial assets",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0000",
      "Status": "REVISED",
      "Values": 308080
  },
  {
      "Year": 2017.03,
      "Institutional_sector_name": "Captive financial institutions",
      "Institutional_sector_code": 281,
      "Descriptor": "Financial assets Closing balance Total financial assets",
      "SNA08TRANS": "LE00000",
      "Asset_liability_code": "AFA0000",
      "Status": "FINAL",
      "Values": 283021
  }
    ]
}

Dashboard.prototype.getDataForXirr = function () {
    return [{
        name: 'Tokyo',
        data: [99.9, 61.5, 106.4, 129.2, 144.0, 176.0]

    }, {
        name: 'New York',
        data: [183.6, 178.8, 108.5, 123.4, 136.0, 124.5]

    }, {
        name: 'London',
        data: [148.9, 138.8, 139.3, 96.4, 174.0, 184.3]

    }]
}

Dashboard.prototype.getDataForPerformance = function () {
    return [{
        name: 'Tokyo',
        data: [79.9, 81.5, 106.4, 129.2, 90.0, 176.0]

    }, {
        name: 'New York',
        data: [183.6, 128.8, 108.5, 123.4, 146.0, 124.5]

    }, {
        name: 'London',
        data: [128.9, 138.8, 139.3, 96.4, 174.0, 184.3]

    }]
}

Dashboard.prototype.getDataForFunds = function () {
    return [{
        name: 'Tokyo',
        data: [67.9, 88.5, 106.4, 219.2, 190.0, 167.0]

    }, {
        name: 'New York',
        data: [138.6, 183.8, 108.5, 132.4, 164.0, 142.5]

    }, {
        name: 'London',
        data: [128.9, 183.8, 193.3, 69.4, 174.0, 184.3]

    }, {
        name: 'Berlin',
        data: [148.9, 138.8, 139.3, 96.4, 174.0, 184.3]

    }]
}

var dashboard = new Dashboard();
dashboard.init();