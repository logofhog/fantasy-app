angular.module('fantasy_app')
  .controller('playersGraphCtrl', function(apiUtils, playerStatUtils){
    var vm = this;

    apiUtils.getPlayers().then(function(response) {
      vm.players = response.data.players;
      vm.options = makeOptions(response.data.players);
    });

    function makeOptions(players) {
      var options = {
        title_text: "Players Points",
        series: [],
        categories: playerStatUtils.getPlayers(players),
        tooltip: {
          shared: true,
          useHTML: true,
          formatter: function()  {
            var statsDict = playerStatUtils.statsDict(players);
            var player = statsDict[this.x];
            template = makeTemplate(player);
            return template
          }
        },
        series: [
          { name: 'Passing',
            data: playerStatUtils.getPassing(players)
          },
          { name: 'Rushing',
            data: playerStatUtils.getRushing(players)
          },
          { name: 'Receiving',
            data: playerStatUtils.getReceiving(players)
          }
        ],
      }
      return options
    }

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
  });
