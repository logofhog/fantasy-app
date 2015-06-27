angular.module('fantasy_app')
  .controller('playerCtrl', function($stateParams, apiUtils, $scope){
    var vm = this;

    var show_stat;
    var players_to_graph = {};

    init();

    function init() {
      if ($stateParams.id) {
        getPlayerData($stateParams.id).then(function(response) {
          players_to_graph[response.player.player_id] = response;
          resetGraph()
        });
      }
    }

    vm.changeStat = function(stat) {
      show_stat = stat;
    }

    $scope.initPlayerModal = function(id) {
      players_to_graph = {};
      addPlayer(id).then(function() {
        $scope.showPlayerModal(vm.items);
      });
    }


    function addPlayer(player_id) {
      return getPlayerData(player_id).then(function(response) {
        players_to_graph[response.player.player_id] = response;
        resetGraph();
      });
    }

    vm.removePlayer = function(id) {
      var id = "00-0029668"
      delete players_to_graph[id];
      resetGraph();
    }

    function resetGraph() {
      vm.items = {series: {}}
      for (p in players_to_graph) {
        graphData(players_to_graph[p]);
      }
    }

// "00-0023459" arod
//  00-0026143 matt ryan
//  "00-0029668" a luck

    function graphData(response, stat) {
      var player_obj = {};
      player_obj.stats = stats(response.stats, 'passing_yds');
      player_obj.player = response.player;
      vm.items.title = 'Passing TDs';
      vm.items.series[player_obj.player.player_id] = player_obj
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

