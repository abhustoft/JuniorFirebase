angular.module('sampleApp').service('authService', function ($firebaseAuth) {

    var loginRef  = new Firebase('https://junioropen.firebaseio.com');

    /** Login in with email and password
     *
     * @param {string} email
     * @param {string} password
     */
    var login =  function (email, password) {

        loginRef = new Firebase('https://junioropen.firebaseio.com');
        loginRef.authWithPassword({
            email : email,
            password : password
        }, function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                //console.log("Authenticated successfully with payload:", authData);
                //console.log("User " + authData.uid + " is logged in with " + authData.provider);
                loginRef.child("users").child(authData.uid).set(authData);
            }
        });
    }

    /** Login in with email and password
     *
     * @param {string} email
     * @param {string} password
     */
    this.login = function (email,password) {
        login(email, password);
    }

    /**
     * Register a new user account
     * @param {string} email
     * @param {string} password
     */
    this.register =  function (email, password) {

        loginRef.createUser({
            email : email,
            password : password
        }, function(error) {
            if (error) {
                console.log("Create Failed!", error);
            } else {
                console.log("Created successfully");
                login(email, password);
            }
        });

    }



    this.logout =  function () {
        loginRef.unauth();
    }
})

  