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

    function convertToInt(object) {
      angular.forEach(object, function(item) {
        angular.forEach(item, function(val, key) {
          if (key != 'opponent') {
            item[key] = parseFloat(val);
          }
        });
      });
      return object;
    }
  });

