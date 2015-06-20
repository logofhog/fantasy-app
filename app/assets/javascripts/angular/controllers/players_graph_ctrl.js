angular.module('fantasy_app')
  .controller('playersGraphCtrl', function(apiUtils){
    var vm = this;

    apiUtils.getPlayers().then(function(response) {
      vm.players = response.data.players;
    });
  });
