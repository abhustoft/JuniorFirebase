
angular.module('mainCtrl', []).controller('MainController', function(firebaseService, $log, $scope, $timeout, authService) {

    $scope.tagline = 'Bla bla';
    $scope.user = 'Not logged in';

   angular.element(document).ready(function () {

        authService.checkAuth().then(function (data) {
                $scope.user = data;
                console.log('mainCtrl data:' + data);
            }, function (failed) {
                console.log('mainCtrl failed :' + failed);
            }

        );
   });



});

