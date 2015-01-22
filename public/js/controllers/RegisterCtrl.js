angular.module('registerCtrl', []).controller('RegisterController', function($firebase, firebaseAuthService) {

    this.register =  function (email, password) {
        firebaseAuthService.register(email,password);
    }
})
