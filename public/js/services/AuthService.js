angular.module('sampleApp').service('authService', function () {

    this.login =  function (email, password) {

        var ref = new Firebase('https://junioropen.firebaseio.com/auth');
        ref.authWithPassword({
            email : email,
            password : password
        }, function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
            }
        });

    }

})

  