angular.module('sampleApp').service('firebaseAuthService', function (firebaseService, $q) {

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
     * Check with Firebase if user is logged in
     * @returns {q}
     */
    this.checkAuth = function () {

        return $q(function(resolve, reject) {

            firebaseService.FBref().onAuth(function (authData) {

                if (typeof(authData) != 'undefined' && authData != null) {
                    console.log("Authenticated with uid:", authData.uid + ' email: ' + authData.password.email);
                    resolve(authData.password.email);
                } else {
                    console.log("firebaseAuthService: Client unauthenticated.");
                    reject('firebaseAuthService: not authenticated');
                }
            });
        });
    };

    /**
     * Log out user
     */
    this.logout =  function () {
        loginRef.unauth();
    }
});

  