angular.module('fantasy_app')
  .factory('apiUtils', function($http){
    return {
      getPlayers: getPlayers,
      getPlayer: getPlayer,
      getPlayerByWeek: getPlayerByWeek,
      searchPlayers: searchPlayers,
      getTeam: getTeam,
      getAllReplacementPlayers: getAllReplacementPlayers,
      getPlayerSuggestions: getPlayerSuggestions,
      getAllOffense: getAllOffense,
      getAllDefense: getAllDefense,
      getWRDefense: getWRDefense,
      getTEDefense: getTEDefense
    }

    function getWRDefense() {
      return $http.get('/teams/wrdefense')
        .success(getWRDefenseSuccess);
    }

    function getWRDefenseSuccess(data, status, headers, config) {
      return data;
    }

    function getTEDefense() {
      return $http.get('/teams/tedefense')
        .success(getTEDefenseSuccess);
    }

    function getTEDefenseSuccess(data, status, headers, config) {
      return data;
    }

    function getAllOffense() {
      return $http.get('/teams/offense')
        .success(getOffenseSuccess);
    }

    function getOffenseSuccess(data, status, headers, config){
      return data;
    }

    function getAllDefense() {
      return $http.get('/teams/defense')
        .success(getDefenseSuccess);
    }

    function getDefenseSuccess(data, status, headers, config) {
      return data;
    }

    function getPlayerSuggestions(value) {
      return $http.get('players/search?name=' + value)
        .success(function(data, status, headers, config) {
          return data;
        });
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

    function getAllReplacementPlayers(query_string){
      return $http.get('replacement_players/?' + query_string)
        .success(replacementPlayersSuccess)
        .error(replacementPlayersError)
    }

    function replacementPlayersError(){}

    function replacementPlayersSuccess(data, status, headers, config){
      return data
    }
  });
