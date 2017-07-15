angular.module('fantasy_app')
  .directive('weekOptions', function(){
    return {
      templateUrl: 'weeks_selector.html',
      link: function(scope, elem, attrs){

        scope.weeks = {
           1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true,
           8: true, 9: true, 10: true, 11: true, 12: true, 13: true, 14: true,
           15: true, 16: true, 17: true
        }

        var weeks_endpoints = { 'start': 1, 'end': 17 }

        $('#weeks_slider').noUiSlider({
          start: [1, 17],
          connect: true,
          range: range(),
          snap: true
        });

        $("#weeks_slider").on('set', function() {
          var slider_weeks = $("#weeks_slider").val();
          var start = parseInt(slider_weeks[0]);
          var end = parseInt(slider_weeks[1]);
          updateWeeks(start, end, false);
          scope.update_weeks(scope.weeks);
          scope.$apply()
        });

        function updateWeeks(start, end) {
          changeValue(start, end);
          weeks_endpoints['start'] = start;
          weeks_endpoints['end'] = end;
        }

        function changeValue(start, end) {
          value = start > weeks_endpoints['start'] ? false : true
          var min = Math.min(start, weeks_endpoints['start']);
          var max = Math.max(start, weeks_endpoints['start']);
          for (min; min < max; min++) {
            scope.weeks[min] = value;
          }

          value = end > weeks_endpoints['end'] ? true : false
          var min = Math.min(end, weeks_endpoints['end']) + 1;
          var max = Math.max(end, weeks_endpoints['end']);
          for (min; min <= max; min++) {
            scope.weeks[min] = value;
          }
        }

        function range() {
          var range = {}
          for (var i=1; i<=17; i++) {
            if (i==1) { range['min'] = 1 }
            if (i==17) { range['max'] = 17 }
            if (i!=1 && i!=17) {range[String((100/16)*(i-1))] = i}
          }
          return range
        }
      }
    }
  });
