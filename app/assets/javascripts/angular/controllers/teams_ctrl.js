angular.module('fantasy_app')
  .controller('teamsCtrl', function($state, $rootScope, teams){
    var vm = this;
    vm.expandedTeams = (!!$state.params.id) ? false: true
    vm.teams = teams;

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      vm.expandedTeams = !$state.params.id
    });
  });

