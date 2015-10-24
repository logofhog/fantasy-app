angular.module('fantasy_app')
  .controller('teamsCtrl', function($state, $rootScope, teams, apiUtils){
    var vm = this;
    vm.teams = teams;

    vm.getAllDefense = function() {
      apiUtils.getAllDefense().then(function(response) {
        vm.defense = response.data.teams;
      });
    }
  });

