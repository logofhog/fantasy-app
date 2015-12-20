angular.module('fantasy_app')
  .controller('teamsCtrl', function($state, $rootScope, teams, apiUtils){
    var vm = this;
    vm.teams = teams;
    vm.orderBy = 'opponent';
    vm.sortReverse = false;

    vm.getAllDefense = function() {
      apiUtils.getAllDefense().then(function(response) {
        vm.defense = convertToInt(response.data.teams);
        var sorted = sortByPoints(vm.defense, 'total_points')
        vm.options = makeOptions(sorted);
      });
    }

    vm.getAllOffense = function() {
      apiUtils.getAllOffense().then(function(response) {
        vm.offense = convertToInt(response.data.teams);
      });
    }

    vm.getTEDefense = function() {
      apiUtils.getTEDefense().then(function(response) {
        vm.defense = convertToInt(response.data.teams);
        var sorted = sortByPoints(vm.defense, 'receiving_points');
        vm.options = makeOptions(sorted);
      });
    }

    vm.getWRDefense = function(rank) {
      apiUtils.getWRDefense(rank).then(function(response) {
        vm.defense = convertToInt(response.data.teams);
        var sorted = sortByPoints(vm.defense, 'receiving_points');
        vm.options = makeOptions(sorted);
      });
    }

    function sortByPoints(teams, sort_by) {
      var sorted = teams.sort(function(a, b) {return a[sort_by] - b[sort_by]});
      return sorted
    }

    function convertToInt(object) {
      angular.forEach(object, function(item) {
        angular.forEach(item, function(val, key) {
          if (key != 'opponent' && key != 'team') {
            item[key] = parseFloat(val);
          }
        });
      });
      return object;
    }

    function makeOptions(teams) {
      var options = {
        title_text: "Score",
        categories: teams.map(function(team) { return team.opponent}),
        tooltip: {
          shared: true,
          useHTML: true,
          formatter: function()  {
            return 'Points VS ' + this.x + ': ' + this.y
          }
        },
        series: [
          { name: 'Passing',
            data: teams.map(function(team) { return team.passing_points })
          },
          { name: 'Rushing',
            data: teams.map(function(team) { return team.rushing_points })
          },
          { name: 'Receiving',
            data: teams.map(function(team) { return team.receiving_points })
          }
        ],
      }
      return options
    }
  });

