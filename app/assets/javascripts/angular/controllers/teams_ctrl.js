angular.module('fantasy_app')
  .controller('teamsCtrl', function($stateParams, $scope, apiUtils, teams){
    init();

    var vm = this;
    vm.expandedTeams = true;
    vm.teams = teams;

    function init() {
      console.log('intializing');
      if ($stateParams.id) {
        getTeamData($stateParams.id).then(function(response) {
          console.log(response);
        });
      }
    }

    function getTeamData(id) {
      apiUtils.getTeamData(id).then(function(response) {
        return response
      });
    }

    vm.toggleExpandedTeams = function(){
      vm.expandedTeams = false;
    }
  });

