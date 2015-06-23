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
          return {stat_name: index, stat_value: parseInt(value)}
        });
        return stats
      },
      statsDict: function(items){
        //if (typeof(scope.dict) != 'undefined') { return scope.dict }

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
          var total = (parseInt(player.passing_yds) /25) +
                      (parseInt(player.passing_tds) * 4) +
                      (parseInt(player.passing_int) * -1)
          return Math.round(total)
        });
        return data
      },
      getRushing: function(items){
        var data = items.map(function(player) {
          var total = (parseInt(player.rushing_yds) /10) +
                      (parseInt(player.rushing_tds) * 6)
          return Math.round(total)
        });
        return data
      },
      getReceiving: function(items){
        var data = items.map(function(player) {
          var total = (parseInt(player.receiving_yds) / 10) +
                      (parseInt(player.receiving_tds) * 6) +
                      (parseInt(player.receiving_rec) / 2)
          return Math.round(total)
        });
        return data
      }
    }

    return utils
  });
