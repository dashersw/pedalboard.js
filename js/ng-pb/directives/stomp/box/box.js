ngpb.controller('Box', ['$rootScope', function($rootScope) {
    new pb.stomp.BoxModel($rootScope.context);
}]);

ngpb.directive('pbBox', function() {
    return {
        restrict : 'AE',
        templateUrl : 'js/ng-pb/directives/stomp/box/box.html',
        controller: 'Box'
    };
});

