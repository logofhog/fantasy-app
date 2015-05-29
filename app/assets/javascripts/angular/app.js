angular.module('fantasy_app', ['ui.router', 'templates'])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('search', {
        url: "/search",
        templateUrl: "search.html"
      })
      .state('players', {
        url: "/players",
        templateUrl: "players_home.html"
      })
      .state('teams', {
        url: "/teams",
        templateUrl: "teams_home.html"
      })
  });
