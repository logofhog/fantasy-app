angular.module('fantasy_app')
  .directive('stackedBarChart', function(playerStatUtils){
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

            title: {text: 'Players Points'},

            xAxis: {
              categories: playerStatUtils.getPlayers(scope.items)
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
              { name: 'Passing',
                data: playerStatUtils.getPassing(scope.items)
              },
              { name: 'Rushing',
                data: playerStatUtils.getRushing(scope.items)
              },
              { name: 'Receiving',
                data: playerStatUtils.getReceiving(scope.items)
              }
            ],

            tooltip: {
              shared: true,
              useHTML: true,
              formatter: function()  {
                var statsDict = playerStatUtils.statsDict(scope.items);
                var player = statsDict[this.x];
                template = makeTemplate(player);
                return template
              }
            }
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
          }) //end HighChart.Chart


          var stat_names = playerStatUtils.stat_names

          function makeTemplate(player) {
            var stats = playerStatUtils.removeUselessKeys(player);
            var template = ["<span id='tooltip_name'>", player.full_name, "</span><table id='player_tooltip_table'>"]
            for (var k in stats) {
              template = template.concat(["<tr","class='" + stats[k].stat_name + "'", "><td>", stat_names[stats[k].stat_name],
                                          "</td><td style='text-align: right'>", stats[k].stat_value, "</td></tr>"]);
            }
            template = template.join(' ');
            return template
          }

//          function getData(stat) {
//            var data = scope.items.map(function(player) { return parseInt(player[stat])});
//            return data
//          }

        }
        scope.$watch('items', function(newvalue) {
          makeChart();
        });
      }
    }
  })
