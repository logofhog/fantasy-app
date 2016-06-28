angular.module('fantasy_app')
  .controller('filterOptionsCtrl', function($scope, $rootScope){

    $scope.query_string_options = {
      is_red_zone: false,
      positions: {
        'QB': true,
        'WR': true,
        'RB': true,
        'TE': true
        },
      avg: false,
      sum: true
    };

    $scope.toggleRedZone = function() {
      $scope.query_string_options.is_red_zone = !$scope.query_string_options.is_red_zone;
    }

    $scope.togglePosition = function(position) {
      $scope.query_string_options.positions[position] = !$scope.query_string_options.positions[position];
    }

    $scope.toggleSumAvg = function(value) {
      if(value == 'sum') {
        $scope.query_string_options.sum = true;
        $scope.query_string_options.avg = false;
      }
      else {
        $scope.query_string_options.sum = false;
        $scope.query_string_options.avg = true;
      }
    }

    function weeksArray() {
      var weeks = [];
      for(var week in $scope.weeks) {
        if(!$scope.weeks[week]) {
          weeks.push(week);
        }
      }
      return weeks;
    }

    $scope.update = function() {
      var url = makeUrl();
      $rootScope.$broadcast('filter_options_update', { url: url });
      return url;
    }

    function makeUrl() {
      var weeks = weeksArray();
      var url = "?positions=" + query_string_options.positions.join()
      if(weeks.length > 0) { url += "&omit_weeks=" + weeks.join() }
      if(query_string_options.avg) { url += "&is_avg=" + query_string_options.avg}
      if(query_string_options.is_red_zone) { url +=  "&is_red_zone=" + query_string_options.is_red_zone }
      return url
    }
  });
