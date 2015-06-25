angular.module('fantasy_app')
  .controller('playerCtrl', function($stateParams, apiUtils, $scope){
    var vm = this;

    init();
    var show_stat;

    // vm.items = name: title: stats:
    //
    vm.changeStat = function(stat) {
      show_stat = stat;
    }

    function init() {
      getPlayerData($stateParams.id).then(function(response) {
        vm.items = {};
        vm.items.stats = stats(response.stats, 'passing_yds');
        vm.items.player = response.player;
        vm.items.title = 'Passing Yards';
      });
    }

    function stats(data, stat) {
      var all_stats_array = arrayByWeek(data);
      var one_stat = activeStat(all_stats_array, stat);
      return one_stat;
    }

    function activeStat(all_stats, stat) {
      return all_stats.map(function(s) { return s[stat] })
    }

    function arrayByWeek(obj) {
      var stats_array = Array.apply(null, Array(17)).map(function(x, i) {return {week: i+1}});
      for (var i=0; i<16; i++) {
        stats_array[obj[i].week-1] = obj[i]
      }
      return stats_array;
    }

    function getPlayerData(id) {
      return apiUtils.getPlayerByWeek(id).then(function(response){
        return response.data
      });
    }

  });

