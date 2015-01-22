
angular.module('loginCtrl', []).controller('LoginController', function(firebaseAuthService) {

    this.login =  function (email, password) {
        firebaseAuthService.login(email, password);

    }

    this.logout =  function () {
        firebaseAuthService.logout();

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