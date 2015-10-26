angular.module('fantasy_app')
  .controller('teamsCtrl', function($state, $rootScope, teams, apiUtils){
    var vm = this;
    vm.teams = teams;
    vm.orderBy = 'opponent';
    vm.sortReverse = false;

    vm.getAllDefense = function() {
      apiUtils.getAllDefense().then(function(response) {
        vm.defense = convertToInt(response.data.teams);
        vm.options = makeOptions(sortByPoints(vm.defense));
      });
    }

    vm.getAllOffense = function() {
      apiUtils.getAllOffense().then(function(response) {
        vm.offense = convertToInt(response.data.teams);
      });
    }

    function sortByPoints(teams) {
      var sorted = teams.sort(function(a, b) {return a.total_points - b.total_points});
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
      console.log(teams);
      var options = {
        title_text: "Score",
        categories: teams.map(function(team) { return team.opponent}),
        tooltip: {
          shared: true,
          useHTML: true,
          formatter: function()  {
            return 'template'
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

