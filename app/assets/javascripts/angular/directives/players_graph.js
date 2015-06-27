angular.module('fantasy_app')
  .directive('playersGraph', function() {
    return {
      template: '<div stacked_bar_chart items="vm.players"></div>',
      controller: 'playersGraphCtrl',
      controllerAs: 'vm'
    }
  });
