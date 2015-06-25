angular.module('fantasy_app')
  .factory('apiUtils', function($http){
    return {
      getPlayers: getPlayers,
      getPlayer: getPlayer,
      getPlayerByWeek: getPlayerByWeek,
      searchPlayers: searchPlayers
    }

    function getPlayerByWeek(id){
      return $http.get('/players/' + id + '/by_week')
        .success(getPlayersSuccess)
        .error(getPlayersError);
    }

    function getPlayer(id){
      return $http.get('/players/' + id)
        .success(getPlayersSuccess)
        .error(getPlayersError);
    }

    function getPlayers(){
      return $http.get('/players')
        .success(getPlayersSuccess)
        .error(getPlayersError);
    }

    function getPlayersSuccess(data, status, headers, config) {
      return data;
    }

    function getPlayersError(data, status, headers, config){
    }

    function searchPlayers(){
    }
  });
