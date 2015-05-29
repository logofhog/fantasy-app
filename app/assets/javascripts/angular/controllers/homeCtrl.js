angular.module('fantasy_app')
  .controller('HomeCtrl', function($scope, api_utils){
    api_utils.getPlayers();
    $scope.test = "this is a test!";
  });

