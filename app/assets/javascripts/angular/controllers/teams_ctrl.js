angular.module('fantasy_app')
  .controller('teamsCtrl', function($state, $rootScope, teams, apiUtils){
    var vm = this;
    vm.teams = teams;
    vm.orderBy = 'opponent';
    vm.sortReverse = false;

    vm.getAllDefense = function() {
      apiUtils.getAllDefense().then(function(response) {
        vm.defense = convertToInt(response.data.teams);
      });
    }

    vm.getAllOffense = function() {
      apiUtils.getAllOffense().then(function(response) {
        vm.offense = convertToInt(response.data.teams);
      });
    }

    function convertToInt(object) {
      angular.forEach(object, function(item) {
        angular.forEach(item, function(val, key) {
          if (key != 'opponent' && key != 'team') {
            item[key] = parseFloat(val);
          }
        });
      });
      return object;
    }
  });

