angular.module('fantasy_app')
  .directive('replacementPlayer', function(){
    return {
      templateUrl: 'replacement_player.html',
      scope: true,
      controllerAs: 'vm',
      controller: function(apiUtils, replacementPlayerUtils){
        var activePosition;
        var vm = this;
        vm.getReplacementPlayers = getReplacementPlayers;

        function getReplacementPlayers() {
          console.log('replacement players');
          apiUtils.getAllReplacementPlayers().then(function(response) {
            replacementPlayerUtils.set_replacement_players(response.data);
          });
        }

        getReplacementPlayers();

        vm.setPosition = function(position){
          console.log('setting position to', position);
          console.log(replacementPlayerUtils.QB, 'should be the qb');
          activePosition = position
        }

        vm.updateReplacementPlayer = function(position) {
          console.log('updating replacement player');
          //replacementPlayerUtils.update(position);
        }
      }
    }
  });
