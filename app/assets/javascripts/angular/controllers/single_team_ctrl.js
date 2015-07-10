angular.module('fantasy_app')
  .controller('singleTeamCtrl', function($stateParams, apiUtils, $scope){
    var team = this;

    init();

    function init() {
      if ($stateParams.id) {
        getTeamData($stateParams.id).then(function(response) {
        });
      }
    }

    function getTeamData(id) {
      return apiUtils.getTeam(id).then(function(response) {
        return response.data;
      });
    }
  });
