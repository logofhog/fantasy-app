angular.module('fantasy_app')
  .directive('singlePlayer', function(){
    return {
      controller: 'playerCtrl',
      templateUrl: 'single_player.html'
    }
  });
