angular.module('fantasy_app')
  .controller('playersCtrl', function($scope){
    //var vm = this;

    $scope.modalShown = false;

    $scope.showPlayerModal = function(items) {
      $scope.items = items;
      $scope.modalShown = !$scope.modalShown;
    }

  });

