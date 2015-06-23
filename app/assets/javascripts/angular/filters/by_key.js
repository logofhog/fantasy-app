angular.module('fantasy_app')
  .filter('byKey', function(){
    return function(items){
      var filtered = [];
      angular.forEach(items, function(value, key) {
        filtered.push(key);
      });
      return filtered
      }
  })

