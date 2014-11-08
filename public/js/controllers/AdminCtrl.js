
angular.module('AdminCtrl', []).controller('AdminController', function($scope, nerdFactory) {

    $scope.user = {};

    $scope.saveUser = function (user) {
        $scope.user = angular.copy(user);
        console.log($scope.user.firstName);
        var nerd = {'name': $scope.user.firstName,'street': $scope.user.street};
        console.log(nerd);
        nerdFactory.save(nerd);
    };

});