angular.module('fantasy_app')
  .factory('apiUtils', function($http){
    return {
      getPlayers: getPlayers,
      getPlayer: getPlayer,
      searchPlayers: searchPlayers
    }

    function getPlayers(){
      return $http.get('/players')
        .success(getPlayersSuccess)
        .error(getPlayersError);

      function getPlayersSuccess(data, status, headers, config) {
        return data;
      }

      function getPlayersError(data, status, headers, config){
      }
    }

    function getPlayer(){
    }

    function searchPlayers(){
    }
  });
