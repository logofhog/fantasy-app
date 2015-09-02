angular.module('fantasy_app', ['ui.router', 'templates', 'ui.bootstrap', 'ui.bootstrap.modal'])
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
      .state('teams.singleTeam', {
        url: '/:id',
        templateUrl: 'single_team.html',
        controller: 'singleTeamCtrl',
        controllerAs: 'team'
      })
  });
