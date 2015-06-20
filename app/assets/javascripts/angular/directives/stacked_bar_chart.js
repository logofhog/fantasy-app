angular.module('fantasy_app')
  .directive('stackedBarChart', function(){
    return {
      scope: {
        items: '='
        },
      template: "<div id='container'></div>",
      link: function(scope, elem, attrs) {
        function makeChart() {
          if (! scope.items) {
            return
          }
          var chart = new Highcharts.Chart({
            chart: {
              renderTo: 'container',
              type: 'bar',
              height: '700'
            },

            title: {text: 'this is the chart!'},

            xAxis: {
              categories: getPlayers()
            },

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

            series: [
              {name: 'Passing Yards',
               data: getData('passing_yds').map(function(p) {return p/25})
              },
              {name: 'Passing TDs',
               data: getData('passing_tds').map(function(p) {return p*4})
              },
              {name: 'Interceptions',
               data: getData('passing_int').map(function(p) {return p*-1})
              },
              {name: 'Rushing Yards',
               data: getData('rushing_yds').map(function(p) {return p/10})
              },
              {name: 'Rushing TDs',
               data: getData('rushing_tds').map(function(p) {return p*6})
              },
              {name: 'Receiving TDs',
               data: getData('receiving_tds').map(function(p) {return p*6})
              },
              {name: 'Receiving Yards',
               data: getData('receiving_yds').map(function(p) {return p/10})
              },
              {name: 'Receptions ',
               data: getData('receiving_rec').map(function(p) {return p/2})
              }
            ]
          }) //end HighChart.Chart

          function getData(stat) {
            var data = scope.items.map(function(player) { return parseInt(player[stat])});
            return data
          }

          function getPlayers() {
            var players = scope.items.map(function(player) { return player.full_name });
            return players
          }

        }

        scope.$watch('items', function(newvalue) {
          console.log(scope.items);
          makeChart();
        });
      }
    }
  })
