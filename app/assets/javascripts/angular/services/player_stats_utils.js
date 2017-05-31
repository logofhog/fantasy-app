angular.module('fantasy_app')
  .service('playerStatUtils', function($cookies){
    defaultPointValues = {
      passing_yds : 25.0,
      passing_tds : 4.0,
      passing_int : -1.0,
      rushing_yds : 10.0,
      rushing_tds : 6.0,
      receiving_yds : 10.0,
      receiving_tds : 6.0,
      receiving_rec : 0.0
    }

    getPointValues = function(){
      var point_values = $cookies.get('point_values');
      if(point_values == undefined) {
        point_values = defaultPointValues;
      } else {
        point_values = JSON.parse(point_values)
      }
      return point_values;
    }
    var utils = {
      point_values: getPointValues,
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
          return {stat_name: index, stat_value: value}
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
          var total = ((player.passing_yds) / utils.point_values().passing_yds) +
                      ((player.passing_tds) * utils.point_values().passing_tds) +
                      ((player.passing_int) * -1.0)
          return total
        });
        return data
      },
      getRushing: function(items){
        var data = items.map(function(player) {
          var total = ((player.rushing_yds) / utils.point_values().rushing_yds) +
                      ((player.rushing_tds) * utils.point_values().rushing_tds)
          return total
        });
        return data
      },
      getReceiving: function(items){
        var data = items.map(function(player) {
          var total = ((player.receiving_yds) / utils.point_values().receiving_yds) +
                      ((player.receiving_tds) * utils.point_values().receiving_tds)
          if(utils.point_values().receiving_rec > 0){
            total = total + ((player.receiving_rec) * utils.point_values().receiving_rec)
          }
          return total
        });
        return data
      }
    }
    return utils
  });
