ngpb.controller('Pot', ['$rootScope', '$scope', '$element', function($rootScope, $scope, $element) {
    $scope.model = new pb.pot.PotModel($scope.param || $scope.callback(), $scope.name, $scope.multiplier || 1);
    $scope.angle = 260;

    $scope.rotation = $scope.model.getNormalizedValue() * $scope.angle;

    $scope.model.addEventListener(pb.pot.PotModel.EventType.VALUE_CHANGED, function() {
        $scope.rotation = $scope.model.getNormalizedValue() * $scope.angle;
        $scope.$digest();
    });
}]);

ngpb.directive('pbPot', function() {
    return {
        restrict : 'AE',
        scope: {
            name: '@',
            param: '=',
            multiplier: '=',
            callback: '&',
            size: '@'
        },
        templateUrl : 'js/ng-pb/directives/pot/pot.html',
        controller: 'Pot',
        link: function(scope, elem, attr) {
            elem[0].classList.add('pot', scope.size);
            var knob = goog.dom.query('.knobHolder', elem[0])[0];
            pb.shadowMaker(knob, 10, 0.5, 4);

            var oldY, flag = false;

            elem.on('mousedown', function(e) {
                flag = true;
                oldY = e.clientY;

                var mouseup = angular.element(document.body).on('mouseup', function(e) {
                    flag = false;
                    angular.element(document.body).off('mousemove', mousemove);
                    angular.element(document.body).off('mouseup', mouseup);
                });

                var mousemove = angular.element(document.body).on('mousemove', function(e) {
                    if (flag) {
                        var val = scope.model.getNormalizedValue() - (e.clientY - oldY) / 100;
                        scope.model.setValue(val);
                        oldY = e.clientY;
                    }
                });
            });
        }
    };
});
