angular.module('fantasy_app')
  .directive('vorp', function(replacementPlayerUtils){
    return {
      scope: { player: '='},
      template: '<span> {{games_played}}{{player.position}}</span>',
      link: function(scope, elem, attrs) {
        scope.replacement_player_values = {}
        scope.games_played = scope.player.games_played;
        scope.$watchCollection(replacementPlayerUtils.get_replacement_players, function(newvalue){
          setReplacementValues(newvalue);
          setVorp();
        });

        function setReplacementValues(values) {
          Object.keys(values).map(function(v) {
            scope.replacement_player_values[v] = values[v];
          })
        }

        function setVorp() {
          var temp = (parseFloat(scope.player.total_points)/parseInt(scope.player.games_played)) - parseFloat(scope.replacement_player_values[scope.player.position])
          //console.log(temp.toFixed(2), 'pts above replacement for ', scope.player.full_name)
          var avg = parseFloat(scope.player.total_points) / parseInt(scope.player.games_played);
          var vorp = avg / scope.replacement_player_values[scope.player.position];
        }
      }
    }
  });
