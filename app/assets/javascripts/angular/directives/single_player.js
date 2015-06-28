angular.module('fantasy_app')
  .directive('singlePlayer', function(){
    return {
      controller: 'playerCtrl',
      replace: true,
      templateUrl: 'single_player.html'
    }
  });
