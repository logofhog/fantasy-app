angular.module('fantasy_app')
  .directive('navBar', function(){
    return {
      templateUrl: 'nav_bar.html',
      link: function(scope, elem, attrs) {
        scope.show_options_view = false
      }
    }
  })

