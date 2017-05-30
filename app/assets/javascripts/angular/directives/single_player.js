angular.module('fantasy_app')
  .directive('singlePlayer', function(comparePlayerService){
    return {
      replace: true,
      templateUrl: 'single_player.html',
      scope: {player: '=player'},
      link: function(scope, elem, attr) {
        scope.in_compare = comparePlayerService.is_player_in_compare(scope.player.player_id);

        elem.bind('click', function() {
          scope.in_compare = !scope.in_compare;
          scope.in_compare ? comparePlayerService.addPlayerToCompare(scope.player) : comparePlayerService.removePlayerFromCompare(scope.player);
        })
      }
    }
  });
