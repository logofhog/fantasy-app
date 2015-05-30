angular.module('fantasy_app')
  .factory('api_utils', function($http){
    return {
      getPlayers: getPlayers,
      getPlayer: getPlayer,
      searchPlayers: searchPlayers
    }

    function getPlayers(){
      return $http.get('/players')
        .success(getPlayersComplete)
        .error(getPlayersError);

      function getPlayersComplete(data, status, headers, config) {
        console.log(data);
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
