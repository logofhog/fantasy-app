angular.module('fantasy_app')
  .directive('filterContainer', function(){
    return {
      templateUrl: 'filter_options/filter_container.html',
      controller: 'filterOptionsCtrl'
    }
  });
