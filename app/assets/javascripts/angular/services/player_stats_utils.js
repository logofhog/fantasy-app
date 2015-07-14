angular.module('fantasy_app')
  .service('playerStatUtils', function(){
    var utils = {
      stat_names:  {
        passing_yds : 'Passing Yards',
        passing_tds : 'Passing TDs',
        rushing_yds : 'Rushing Yards',
        rushing_tds : 'Rushing TDs',
        receiving_yds : 'Receiving Yards',
        receiving_tds : 'Receiving TDs',
        receiving_rec : 'Receptions',
        total_points: 'Total Points'
      },
      removeUselessKeys:   function(player) {
        var stats = $.map(player, function(value, index) {
          if (value === '0' || !(index in utils.stat_names)) { return }
          return {stat_name: index, stat_value: parseFloat(value)}
        });
        return stats
      },
      statsDict: function(items){
        stats = {};
        for (i in items) {
          stats[items[i].full_name] = items[i];
        }
        return stats
      },
      getPlayers: function(items) {
        var players = items.map(function(player) { return player.full_name });
        return players
      },
      getPassing: function(items){
        var data = items.map(function(player) {
          var total = (parseFloat(player.passing_yds) /25.0) +
                      (parseFloat(player.passing_tds) * 4) +
                      (parseFloat(player.passing_int) * -1)
          return total
        });
        return data
      },
      getRushing: function(items){
        var data = items.map(function(player) {
          var total = (parseFloat(player.rushing_yds) /10.0) +
                      (parseFloat(player.rushing_tds) * 6)
          return total
        });
        return data
      },
      getReceiving: function(items){
        var data = items.map(function(player) {
          var total = (parseFloat(player.receiving_yds) / 10.0) +
                      (parseFloat(player.receiving_tds) * 6) +
                      (parseFloat(player.receiving_rec) / 2.0)
          return total
        });
        return data
      }
    }
    return utils
  });
