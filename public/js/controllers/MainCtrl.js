
angular.module('mainCtrl', []).controller('MainController', function(firebaseService, $log, $scope, $timeout, authService) {

    $scope.tagline = 'Bla bla';
    $scope.user = 'Checking login status';

    var loggedIn = function (data) {
        $scope.user = data;
        console.log('mainCtrl data:' + data);
    };

    var loggedOut = function (failed) {
        $scope.user = 'Not logged in';
        console.log('mainCtrl failed :' + failed);
    };

    angular.element(document).ready(function () {

        // Call to get status on load
        authService.checkAuth().then(loggedIn, loggedOut);
    });


});

