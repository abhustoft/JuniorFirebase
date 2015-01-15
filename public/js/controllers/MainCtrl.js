
angular.module('mainCtrl', []).controller('MainController', function(firebaseService, $log, $scope, $timeout, authService) {

    $scope.tagline = 'Bla bla';
    $scope.user = 'Checking login status';

   angular.element(document).ready(function () {

        authService.checkAuth().then(function (data) {
                $scope.user = data;
                console.log('mainCtrl data:' + data);
            }, function (failed) {
                $scope.user = 'Not logged in';
                console.log('mainCtrl failed :' + failed);
            }

        );
   });
});

