angular.module('fantasy_app')
  .controller('filterOptionsCtrl', function($scope, $rootScope){

    var query_string_options = {
      is_red_zone: false,
      positions: ['QB', 'WR', 'RB', 'TE'],
      avg: false
    };

    $scope.toggleRedZone = function() {
      query_string_options.is_red_zone = !query_string_options.is_red_zone;
    }

    $scope.togglePosition = function(position) {
      var index = query_string_options.positions.indexOf(position);
      if(index >=0) {
        query_string_options.positions.splice(index, 1);
      } else {
        query_string_options.positions.push(position);
      }
    }

    $scope.toggleSumAvg = function() {
      query_string_options.avg = !query_string_options.avg;
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
