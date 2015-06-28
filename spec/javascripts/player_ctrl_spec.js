describe('PlayerCtrl', function(){
  beforeEach(module('fantasy_app'));
  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));


  it('changes the stat', function(){
    var $scope = {};
    var controller = $controller('playerCtrl as vm', { $scope: $scope });
    controller.changeStat('passing_yds');
  });
});
