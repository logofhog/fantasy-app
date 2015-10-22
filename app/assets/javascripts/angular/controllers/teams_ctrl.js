angular.module('fantasy_app')
  .controller('teamsCtrl', function($state, $rootScope, teams){
    var vm = this;
    vm.teams = teams;

  });

