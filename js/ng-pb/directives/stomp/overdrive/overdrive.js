ngpb.controller('Overdrive', ['$rootScope', '$scope', function($rootScope, $scope) {
    $scope.model = new pb.stomp.Overdrive($rootScope.context);

    $scope.setTone = function(newValue) {
        $scope.model.setTone(newValue);
    };

    $scope.setDrive = function(newValue) {
        $scope.model.setDrive(newValue);
    };
}]);

ngpb.directive('pbOverdrive', function() {
    return {
        restrict : 'AE',
        require: '^pbBoard',
        scope: {},
        templateUrl : 'js/ng-pb/directives/stomp/overdrive/overdrive.html',
        controller: 'Overdrive',
        link: function(scope, elem, attr, boardController) {
            boardController.model.addPedals([scope.model]);
            elem[0].classList.add('box', 'overdrive');

            pb.shadowMaker(elem[0], 40, 0.5, 0.7);
        }
    };
});
