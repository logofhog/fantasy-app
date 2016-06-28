angular.module('fantasy_app')
  .directive('replacementPlayer', function(){
    return {
      templateUrl: 'replacement_player.html',
      scope: true,
      controllerAs: 'vm',
      controller: function(apiUtils, replacementPlayerUtils){
        var activePosition;
        var vm = this;

        vm.replacement_player = {
          qb: {
            offset: 20
          },
          rb: {
            offset: 20
          },
          wr: {
            offset: 30
          },
          te: {
            offset: 15
          }
        }
        vm.getReplacementPlayers = getReplacementPlayers;

        getReplacementPlayers();

        function getReplacementPlayers(params) {
          var query_string = makeUrl();
          apiUtils.getAllReplacementPlayers(query_string).then(function(response) {
            replacementPlayerUtils.set_replacement_players(response.data);
          });
        }

        function makeUrl() {
          return $.param(vm.replacement_player);
        }

      }
    }
  });
