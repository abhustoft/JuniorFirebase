angular.module('sampleApp').service('authService', function (firebaseService) {

    var loginRef = firebaseService.FBref();

    /** Login in with email and password
     *
     * @param {string} email
     * @param {string} password
     */
    var login =  function (email, password) {

        loginRef.authWithPassword({
            email : email,
            password : password
        }, function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                loginRef.child("users").child(authData.uid).set(authData);
            }
        });
    };

    /** Login in with email and password
     *
     * @param {string} email
     * @param {string} password
     */
    this.login = function (email, password) {
        login(email, password);
    };

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

    };

    /**
     * Log out user
     */
    this.logout =  function () {
        loginRef.unauth();
    }
});

  