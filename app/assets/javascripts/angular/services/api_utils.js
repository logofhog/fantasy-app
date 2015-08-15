angular.module('fantasy_app')
  .factory('apiUtils', function($http){
    return {
      getPlayers: getPlayers,
      getPlayer: getPlayer,
      getPlayerByWeek: getPlayerByWeek,
      searchPlayers: searchPlayers,
      getTeam: getTeam,
      getAllReplacementPlayers: getAllReplacementPlayers
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

    function getPlayers(url){
      return $http.get('/players' + url)
        .success(getPlayersSuccess)
        .error(getPlayersError);
    }

    function getTeam(id) {
      return $http.get('teams/' + id + '/weekly_totals')
        .success(getTeamSuccess)
        .error(getTeamError)
    }

    function getTeamSuccess(data, status, headers, config) {
      return data
    }

    function getTeamError(data, status, headers, config) {
    }

    function getPlayersSuccess(data, status, headers, config) {
      return data;
    }

    function getPlayersError(data, status, headers, config){
    }

    function searchPlayers(){
    }

    function getAllReplacementPlayers(){
      return $http.get('replacement_players/')
        .success(replacementPlayersSuccess)
        .error(replacementPlayersError)
    }

    function replacementPlayersError(){}

    function replacementPlayersSuccess(data, status, headers, config){
      return data
    }
  });
