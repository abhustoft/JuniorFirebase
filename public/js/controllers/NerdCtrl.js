
angular.module('NerdCtrl', []).controller('NerdController', function($scope, nerdFactory) {

    $scope.tagline = 'Nothing beats a pocket protector!';
    $scope.nerds = nerdFactory.query();
    var kk = {'id': '54610d5c6de1237c1017d147' };
    $scope.abh = nerdFactory.get(kk);
    console.log($scope.nerds);
});

