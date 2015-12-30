angular.module('fantasy_app')
  .factory('replacementPlayerUtils', function($http){
    var utils = {
      replacement_players: {
        QB: 0,
        RB: 0,
        WR: 0,
        TE: 0
      },
      set_replacement_players:  function(players) {
        Object.keys(players).map(function(p, i) {
          utils.replacement_players[p] = players[p];
        });
      },
      get_replacement_players: function(){
        return utils.replacement_players;
      }
    }
    return utils
  });

