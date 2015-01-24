
angular.module('loginCtrl', []).controller('LoginController', function(firebaseAuthService) {

    this.login =  function (email, password) {
        firebaseAuthService.login(email, password);

    }

    this.logout =  function () {
        firebaseAuthService.logout();

    }
})