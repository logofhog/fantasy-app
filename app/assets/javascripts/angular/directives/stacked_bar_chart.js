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

            title: {text: 'Players Points'},

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
              { name: 'Passing',
                data: getPassing()
              },
              { name: 'Rushing',
                data: getRushing()
              },
              { name: 'Receiving',
                data: getReceiving()
              }
            ],

            tooltip: {
              shared: true,
              useHTML: true,
              formatter: function()  {
                statsDict();
                var player = scope.dict[this.x];
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

          var stat_names = {
            passing_yds : 'Passing Yards',
            passing_tds : 'Passing TDs',
            rushing_yds : 'Rushing Yards',
            rushing_tds : 'Rushing TDs',
            receiving_yds : 'Receiving Yards',
            receiving_tds : 'Receiving TDs',
            receiving_rec : 'Receptions',
            total_points: 'Total Points'
          }

          function makeTemplate(player) {
            var stats = removeUselessKeys(player);
            var template = ["<span id='tooltip_name'>", player.full_name, "</span><table id='player_tooltip_table'>"]
            for (var k in stats) {
              template = template.concat(["<tr","class='" + stats[k].stat_name + "'", "><td>", stat_names[stats[k].stat_name],
                                          "</td><td style='text-align: right'>", stats[k].stat_value, "</td></tr>"]);
            }
            template = template.join(' ');
            return template
          }

          function removeUselessKeys(player) {
            var stats = $.map(player, function(value, index) {
              if (value === '0' || !(index in stat_names)) { return }
              return {stat_name: index, stat_value: parseInt(value)}
            });
            return stats
          }

          function statsDict(){
            if (typeof(scope.dict) != 'undefined') { return scope.dict }

            scope.dict = {};
            for (i in scope.items) {
              scope.dict[scope.items[i].full_name] = scope.items[i];
            }
          }

          function getData(stat) {
            var data = scope.items.map(function(player) { return parseInt(player[stat])});
            return data
          }

          function getPlayers() {
            var players = scope.items.map(function(player) { return player.full_name });
            return players
          }

          function getPassing(){
            var data = scope.items.map(function(player) {
              var total = (parseInt(player.passing_yds) /25) +
                          (parseInt(player.passing_tds) * 4) +
                          (parseInt(player.passing_int) * -1)
              return Math.round(total)
            });
            return data
          }
          function getRushing(){
            var data = scope.items.map(function(player) {
              var total = (parseInt(player.rushing_yds) /10) +
                          (parseInt(player.rushing_tds) * 6)
              return Math.round(total)
            });
            return data
          }
          function getReceiving(){
            var data = scope.items.map(function(player) {
              var total = (parseInt(player.receiving_yds) / 10) +
                          (parseInt(player.receiving_tds) * 6) +
                          (parseInt(player.receiving_rec) / 2)
              return Math.round(total)
            });
            return data
          }
        }

        scope.$watch('items', function(newvalue) {
          makeChart();
        });
      }
    }
  })
