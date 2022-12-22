var DemoApp = angular.module('DemoApp', ['dx']);

DemoApp.controller('DemoController', function DemoController($scope) {
    $scope.chartOptions = {
        // title: "Population Pyramid For Norway 2016",
        dataSource: dataSource,
        rotated: true,
        barGroupWidth: 10,
        commonSeriesSettings: {
            type: "stackedbar",
            argumentField: "age"
        },
        series: [{
            valueField: "male",
            name: "Negative Emotional States",
            color: "#f00"
        }, {
            valueField: "female",
            name: "Positive Emotional States",
            color: "#268027"
        }],
        tooltip: {
            enabled: true,
            customizeTooltip: function () {
                return {
                    text: Math.abs(this.valueText)
                };
            }
        },
        valueAxis: {
            // label: {
            //     customizeText: function () {
            //         return Math.abs(this.value) + '%';
            //     }
            // }
            tickInterval: 10
        },
        size: {
          height:350
        },
        legend: {
            verticalAlignment: "top",
            horizontalAlignment: "center",
            margin: { left: 10 }
        }
    };
});

var dataSource = [{
    age: "Zest",
    male: -100,
    female: 0
},{
    age: "Sadness",
    male: 0,
    female: 90
},{
    age: "Egotism",
    male: 0,
    female: 1.9
}, {
    age: "Content",
    male: -1.8,
    female: 0
}, {
    age: "Idifference",
    male: -3.2,
    female: 0
}, {
    age: "Greed",
    male: -20,
    female: 0
}, {
    age: "Admiration",
    male: 0,
    female: 20
}, {
    age: "Fear",
    male: 0,
    female: 3.1
}, {
    age: "Love",
    male: -2.5,
    female: 0
}, {
    age: "Anger",
    male: 0,
    female: 100
}];