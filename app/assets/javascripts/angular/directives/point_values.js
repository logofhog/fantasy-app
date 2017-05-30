angular.module('fantasy_app')
  .directive('pointValues', function(){
    return {
      templateUrl: 'point_values.html',
      controller: 'filterOptionsCtrl',
    }
  });
