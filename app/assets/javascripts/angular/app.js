angular.module('fantasy_app', ['ui.router', 'templates', 'restangular'])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('testState', {
        url: "/test_state",
        templateUrl: "/test_state.html"
      });
  });
