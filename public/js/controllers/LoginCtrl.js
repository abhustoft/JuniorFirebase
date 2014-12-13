
angular.module('loginCtrl', []).controller('LoginController', function(saleFactory, salesService, storeSalesFactory, $firebase, $filter) {

    // Form submission for logging in
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

    /* Social buttons
    form.children('.bt-social').on('click', function (e) {

        var $currentButton = $(this);
        var provider = $currentButton.data('provider');
        var socialLoginPromise;
        e.preventDefault();

        socialLoginPromise = thirdPartyLogin(provider);
        handleAuthResponse(socialLoginPromise, 'profile');

    });

    form.children('#btAnon').on('click', function (e) {
        e.preventDefault();
        handleAuthResponse(authAnonymously(), 'profilex');
    });
    */
})