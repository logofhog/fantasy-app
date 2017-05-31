angular.module('fantasy_app', ['ui.router', 'templates', 'ui.bootstrap', 'ui.bootstrap.modal', 'ngCookies'])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('search', {
        url: "/search",
        templateUrl: "search.html",
        controller: "playerCtrl"
      })
      .state('players', {
        url: "/players",
        templateUrl: "players_home.html",
        controller: "playerCtrl"
      })
      .state('player', {
        url: "/player/:id",
        templateUrl: "player.html",
        controller: "playerCtrl",
        controllerAs: "vm"
      })
      .state('teams', {
        url: "/teams",
        controller: "teamsCtrl",
        controllerAs: 'vm',
        templateUrl: "teams_home.html"
      })
      .state('teams.offense', {
        url: "/offense",
        templateUrl: 'teams_offense.html'
      })
      .state('teams.defense', {
        url: "/defense",
        templateUrl: 'teams_defense.html'
      })
      .state('teams.vste', {
        url: "/defense/vste",
        templateUrl: 'defense_vs_te.html'
      })
      .state('teams.vswrs', {
        url: "/defense/vswrs",
        templateUrl: 'defense_vs_wrs.html'
      })
      .state('teams.singleTeam', {
        url: '/:id',
        templateUrl: 'single_team.html',
        controller: 'singleTeamCtrl',
        controllerAs: 'team'
      })
  });

