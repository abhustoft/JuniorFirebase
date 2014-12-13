angular.module('registerCtrl', []).controller('RegisterController', function($firebase) {

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
            }
        });

    }

    /*
    this.createUserAndLogin = function (userObj) {
        return createUser(userObj)
            .then(function () {
                return authWithPassword(userObj);
            });
    }

    this.createUser = function (userObj) {
        var deferred = $.Deferred();
        rootRef.createUser(userObj, function (err) {

            if (!err) {
                deferred.resolve();
            } else {
                deferred.reject(err);
            }

        });

        return deferred.promise();
    }
*/
})
