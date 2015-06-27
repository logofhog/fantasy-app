angular.module('fantasy_app')
  .directive('singlePlayerGraph', function(){
    return {
      template: '<div id="player_container"></div>',
      scope: {
        items: '='
      },
      link: function(scope, elem, attrs) {

        scope.$watch('items', function(newvalue) {
          console.log(scope.items);
          if (! scope.items || Object.keys(scope.items).length == 0) { return }
          var series = seriesValues(scope.items.series);
          makeChart(series, scope.items.title, 17);
        }, true);

        function seriesValues(data) {
          var series = [];
          for (key in data) {
            var series_obj = {};
            series_obj['name'] = data[key].player.full_name;
            series_obj['data'] = data[key].stats.map(function(x, i) { return [i+1, x || null] } );
            series.push(series_obj);
          }
          return series;
        }

        function makeChart(series, title, ticks) {
          $('#player_container').highcharts({
            chart: {
                    type: 'spline'
            },
            title: {text: title},
            legend: {
              layout: 'vertical',
              align: 'right'
            },
            xAxis: {
              tickAmount: ticks,
              tickInterval: 1,
              title: {text: 'Weeks'}
            },
            yAxis: {
              title: {text: title}
            },
            plotOptions: {
              spline: {
                marker: {
                  enabled: true
                }
              }
            },
            series: series
          });//end highcharts
        }// end makeChart()

      }//end link function
    } //end return object
  });

