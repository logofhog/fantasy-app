angular.module('fantasy_app')
  .controller('playersCtrl', function($scope){
    //var vm = this;

    $scope.modalShown = false;

    $scope.showPlayerModal = function(items) {
      $scope.items = items;
      console.log('items', items);
      console.log('modal show');
      $scope.modalShown = !$scope.modalShown;
    }

  });

