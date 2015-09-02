angular.module('fantasy_app')
  .directive('statsSelector', function(playerStatUtils){
    return {
      template: "<span><button ng-click='update_stat()'>clicke me</button></div>",
    }
  });
