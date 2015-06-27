angular.module('fantasy_app')
  .directive('modal', function(){
    return {
      scope: { show: '=' },
      replace: true,
      transclude: true,
      template: "<div class='ng-modal' ng-show='show'>"+
                "<div class='reveal-modal' ng-show='show'>"+
                "<div ng-transclude></div>"+
                "<a class='close-reveal-modal' ng-click='hideModal()'></a>"+
                "</div>"+
                "<div class='reveal-modal-bg' ng-click='hideModal()'></div>"+
                "</div>",
      link: function(scope, elem, attrs) {
        scope.hideModal = function() {
          scope.show = false;
        }
      }
    }
  });


