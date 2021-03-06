angular.module('fantasy_app')
  .controller('playerCtrl', function($stateParams, apiUtils, stats_names, comparePlayerService, $scope, $modal, $window){
    var vm = this;
    vm.in_compare = true;

    var show_stat = 'ranked';
    $scope.players_to_graph = {};
    $scope.selection = {selected: ''};

    $scope.getSuggestions = function(value) {
      var players;
      return apiUtils.getPlayerSuggestions(value).then(function(players) {
        return players.data.map(function(p) { return {full_name: p['full_name'], player_id: p['player_id'] }})
      });
    }

    $scope.selectPlayer = function(player_id) {
      addPlayer(player_id);
    }

    $scope.change_stat = function(stat) {
      show_stat = stat;
      resetGraph();
      $scope.items = vm.items;
    }

    $scope.modalShown = false;
//
   $scope.showPlayerModal = function(items) {
     $scope.items = items;
     $scope.modalShown = !$scope.modalShown;
   }
//
    init();

    function init() {
      if ($stateParams.id) {
        getPlayerData($stateParams.id).then(function(response) {
          $scope.players_to_graph[response.player.player_id] = response;
          resetGraph()
        });
      }
    }

    $scope.addPlayerToCompare = function(player) {
      if (player.in_comparison) {
        player.in_comparison = !player.in_comparison;
      }
      else {
        player.in_comparison = true;
      }
    }

    $scope.initPlayerModal = function(player) {
      $scope.players_to_graph = {};
      show_stat = statFromPlayer(player.position);
      addPlayer(player.player_id).then(function() {
        $scope.showPlayerModal(vm.items);
        var modalInstance = $modal.open({
          //animation: true,
          windowClass: "player_modal",
          scope: $scope,
            templateUrl: 'single_player_graph.html',
            //controller: 'playerCtrl'
            size: 'custom',
        });
      });
    }

    $scope.initComparisonModal = function() {
      $scope.players_to_graph = comparePlayerService.get_players();
      $scope.items = $scope.players_to_graph;
      resetGraph();
      $scope.modalShown = !$scope.modalShown;
      var modalInstance = $modal.open({
        //animation: true,
        windowClass: "player_modal",
        scope: $scope,
        templateUrl: 'single_player_graph.html',
        //controller: 'playerCtrl'
        size: 'custom',
      });
    }

    var stats_from_positions = {
      QB: 'passing_yds',
      RB: 'rushing_yds',
      WR: 'receiving_yds',
      TE: 'receiving_yds'
    }

    function statFromPlayer(position) {
      return stats_from_positions[position];
    }

    vm.addPlayer = addPlayer;

    function addPlayer(player_id) {
      return getPlayerData(player_id).then(function(response) {
        $scope.players_to_graph[response.player.player_id] = response;
        resetGraph();
      });
    }

    $scope.isPlayerInCompare = function(player) {
      return comparePlayerService.isPlayerInCompare(player);
    }

    $scope.removePlayer = function(player) {
      player.in_compare = false;
      comparePlayerService.removePlayerFromCompare(player);
      delete $scope.players_to_graph[player.player.player_id];
      resetGraph();
    }

    function resetGraph() {
      vm.items = {series: {}}
      for (p in $scope.players_to_graph) {
        graphData($scope.players_to_graph[p], show_stat);
      }
      $scope.items = vm.items;
    }

    var stat_to_title = {
      passing_yds: "Passing Yards",
      passing_tds: "Passing TDs",
      rushing_yds: "Rushing Yards",
      rushing_tds: "Rushing TDs",
      receiving_yds: "Receiving Yards",
      receiving_tds: "Receiving TDs",
      receiving_rec: "Receptions",
      ranked: "Weekly Rank"
    }

    function graphData(response, stat) {
      var player_obj = {};
      player_obj.stats = stats(response.stats, stat);
      player_obj.player = response.player;
      vm.items.title = stat_to_title[stat];
      vm.items.series[player_obj.player.player_id] = player_obj
    }

    function stats(data, stat) {
      var all_stats_array = orderByWeek(data);
      var one_stat = activeStat(all_stats_array, stat);
      return one_stat;
    }

    function activeStat(all_stats, stat) {
      return all_stats.map(function(s) { return s[stat] })
    }

    function orderByWeek(obj) {
      var stats_array = Array.apply(null, Array(17)).map(function(x, i) {return {week: i+1}});
      for (var i=0; i<16; i++) {
        obj[i] = obj[i] || {week: i}
        if (!stats_array[obj[i].week-1]['player_id']) {
          stats_array[obj[i].week-1] = obj[i];
        }
      }
      return stats_array;
    }

    function typeResults(stats) {
      stats.map(function(stat){
        angular.forEach(stat, function(val, key) {
          if (key in stats_names) {
            stat[key] = parseInt(val);
          }
        });
      });
    }

    function getPlayerData(id) {
      return apiUtils.getPlayerByWeek(id).then(function(response){
        typeResults(response.data.stats);
        return response.data
      });
    }
  });

