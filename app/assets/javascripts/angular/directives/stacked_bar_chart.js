angular.module('fantasy_app')
  .directive('stackedBarChart', function(playerStatUtils){
    return {
      scope: {
        options: '='
        },
      template: "<div id='container'></div>",
      link: function(scope, elem, attrs) {
        scope.$watch('options', function(newvalue) {
          makeChart();
        });

        function makeChart() {
          if (! scope.options) {
            return
          }

          var options = scope.options;

          var chart = new Highcharts.Chart({
            chart: {
              renderTo: 'container',
              type: 'bar',
              height: '700'
            },
            title: {text: options.title_text},
            xAxis: { categories: options.categories},
            legend: {
              reversed: true
            },
            plotOptions: {
              series: {
                stacking: 'normal',
                pointPadding: 0,
                groupPadding: 0.1
              }
            },
            series: options.series,
            tooltip: options.tooltip
          }); //end HighChart.Chart
        }//end makeChart
      }
    }
  });
            //  keeping this for advanced stat functionality
//            series: [
//              {name: 'Passing Yards',
//               data: getData('passing_yds').map(function(p) {return p/25})
//              },
//              {name: 'Passing TDs',
//               data: getData('passing_tds').map(function(p) {return p*4})
//              },
//              {name: 'Interceptions',
//               data: getData('passing_int').map(function(p) {return p*-1})
//              },
//              {name: 'Rushing Yards',
//               data: getData('rushing_yds').map(function(p) {return p/10})
//              },
//              {name: 'Rushing TDs',
//               data: getData('rushing_tds').map(function(p) {return p*6})
//              },
//              {name: 'Receiving TDs',
//               data: getData('receiving_tds').map(function(p) {return p*6})
//              },
//              {name: 'Receiving Yards',
//               data: getData('receiving_yds').map(function(p) {return p/10})
//              },
//              {name: 'Receptions ',
//               data: getData('receiving_rec').map(function(p) {return p/2})
//              }
//            ]


//          function getData(stat) {
//            var data = scope.items.map(function(player) { return parseInt(player[stat])});
//            return data
//          }

        // Apply the theme
//        Highcharts.setOptions(Highcharts.theme);
