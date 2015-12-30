angular.module('fantasy_app')
  .directive('pointValues', function(){
    return {
      templateUrl: 'point_values.html',
      scope: {},
      controllerAs: 'vm',
      controller: function(apiUtils) {
        var vm = this;

        vm.point_values = {
          passing_yds: 25,
          passing_tds:   6,
          rushing_yds:   10,
          rushing_tds:   6,
          receiving_yds: 15,
          receiving_tds: 6
        }
      }
    }
  });
