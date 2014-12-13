angular.module('registerCtrl', []).controller('RegisterController', function($firebase, authService) {

    this.register =  function (email, password) {

        var ref = new Firebase('https://junioropen.firebaseio.com/auth');
        ref.createUser({
            email : email,
            password : password
        }, function(error) {
            if (error) {
                console.log("Create Failed!", error);
            } else {
                console.log("Created successfully");
                authService.login(email, password);
            }
        });

    }

})
