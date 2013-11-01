ngpb.controller('Stage', ['$rootScope', '$scope', function($rootScope, $scope) {
    $scope.model = new pb.Stage();
    window.stage = $scope.model;
    $rootScope.stage = $scope.model;
    $rootScope.context = $rootScope.stage.getContext();
    this.model = $scope.model;
}]);

ngpb.directive('pbStage', function() {
    return {
        restrict : 'AE',
        scope: {},
        transclude: true,
        template : '<div class="stage" ng-transclude></div>',
        controller: 'Stage',
        replace: true,
        link: function(scope, elem, attr) {
//            scope.model.render(elem[0]);
        }
    };
});
