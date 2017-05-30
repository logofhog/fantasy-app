angular.module('fantasy_app')
  .service('comparePlayerService', function(apiUtils, stats_names){
    var players = {};

    this.addPlayerToCompare = function(player) {
      var player_stats = this.getPlayerDataByWeek(player.player_id).then(function(data) {
        players[player.player_id] = data;
      });
    }

    this.removePlayerFromCompare = function(player) {
      delete players[player.player_id];
    }

    this.is_player_in_compare = function(player_id) {
      return !!players[player_id];
    }

    this.get_players = function() {
      return players;
    }

    this.isPlayerInCompare = function(player) {
      return players.hasOwnProperty(player.player_id);
    }

    this.getPlayerDataByWeek = function(id){
      return apiUtils.getPlayerByWeek(id).then(function(response){
        typeResults(response.data.stats);
        return response.data
      });
    }

    function typeResults(stats) {
      stats.map(function(stat){
        angular.forEach(stat, function(val, key) {
          if (key in stats_names) {
            stat[key] = parseInt(val);
          }
        });
      });
    }
  })
