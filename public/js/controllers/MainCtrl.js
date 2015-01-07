
angular.module('mainCtrl', []).controller('MainController', function(firebaseService, $log, $scope, $timeout) {

    $scope.tagline = 'Bla bla';
    $scope.user = 'Not logged in';

    function registerAuthData (authData) {

        // $scope.$apply() worked for login, but failed due to multiple apply()s
        // in progress on logout
        $timeout(function() {
            if (typeof(authData) != 'undefined' && authData != null) {
                console.log("Authenticated with uid:", authData.uid + ' email: ' + authData.password.email);
                $scope.user = authData.password.email;
            } else {
                console.log("Client unauthenticated.");
                $scope.user = 'not authenticated';
            }
            $log.log($scope.user);
        },0);
    }

    angular.element(document).ready(function () {
        firebaseService.FBref().onAuth(registerAuthData, this);
    });
});

