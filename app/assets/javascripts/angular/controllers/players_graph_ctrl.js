angular.module('fantasy_app')
  .controller('playersGraphCtrl', function(apiUtils, playerStatUtils, $scope){
    var vm = this;
    var page = 0;
    var url = '';

    $scope.$on('filter_options_update', function(event, args) {
      url = args.url;
      refreshData(url);
    })

    refreshData('');

    vm.page = function(value) {
      if (value === 0) {
        page = 0;
      }
      else {
        page = Math.max(0, page + value);
      }
      var url_with_page = addPageToUrl(page);
      refreshData(url_with_page);
    }

    function addPageToUrl(page) {
      if (page === 0) { return url }
      var new_url;
      if (url.length > 0) {
        new_url += '&page=' + page;
      }
      else {
        new_url = '?page=' + page;
      }
      return new_url;
    }

    function refreshData(url) {
      apiUtils.getPlayers(url).then(function(response) {
        vm.players = response.data.players;
        vm.options = makeOptions(response.data.players);
      });
    }

    function makeOptions(players) {
      var options = {
        title_text: "Players Points",
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
