angular.module('registerCtrl', []).controller('RegisterController', function($firebase, authService) {

    this.register =  function (email, password) {
        authService.register(email,password);
    }
})
