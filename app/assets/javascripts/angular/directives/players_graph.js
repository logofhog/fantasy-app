angular.module('fantasy_app')
  .directive('playersGraph', function() {
    return {
      template: '<div stacked_bar_chart items="vm.players"></div><div ng-repeat="player in vm.players"><div single_player>{{player}}</div></div>',
      controller: 'playersGraphCtrl',
      controllerAs: 'vm'
    }
  });
