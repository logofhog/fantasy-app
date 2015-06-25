angular.module('fantasy_app')
  .directive('singlePlayerGraph', function(){
    return {
      template: 'this is the graph <div id="container"></div>',
      scope: {
        items: '='
      },
      link: function(scope, elem, attrs) {

        scope.$watch('items', function(newvalue) {
          console.log(scope.items);
          if (! scope.items) { return }
          console.log(scope.items.stats.length)
          makeChart();
        });

        //player data
        //
        // title
        // name
        // stats
        //

        function makeChart() {
          $('#container').highcharts({
            chart: {
                    type: 'spline'
            },
            title: {text: scope.items.title},
            legend: {
              layout: 'vertical',
              align: 'right'
            },
            xAxis: {
              tickAmount: scope.items.stats.length,
              tickInterval: 1,
              title: {text: 'Weeks'}
            },
            yAxis: {
              title: {text: scope.items.title}
            },
            plotOptions: {
              spline: {
                marker: {
                  enabled: true
                }
              }
            },
            series: [
              {
               name: scope.items.player.full_name,
               data: scope.items.stats.map(function(x, i) { return [i+1, x || null] } )
              }
            ]
          });//end highcharts
        }// end makeChart()

      }//end link function
    } //end return object
  });

