angular.module('fantasy_app')
  .directive('playersGraph', function() {
    return {
      template: '<div stacked_bar_chart options="vm.options"></div>',
      controller: 'playersGraphCtrl',
      controllerAs: 'vm'
    }
  });
