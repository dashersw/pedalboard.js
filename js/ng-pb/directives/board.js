ngpb.controller('Board', ['$rootScope', '$scope', function($rootScope, $scope) {
    $scope.model = new pb.Board($rootScope.context);
    this.model = $scope.model;
}]);

ngpb.directive('pbBoard', function() {
    return {
        restrict : 'AE',
        require: '^pbStage',
        scope: {},
        transclude: true,
        template : '<div class="board" ng-transclude></div>',
        replace: true,
        controller: 'Board',
        link: function(scope, elem, attr, stageController) {
            stageController.model.setBoard(scope.model);
//            scope.model.render(elem[0]);
        }
    };
});
