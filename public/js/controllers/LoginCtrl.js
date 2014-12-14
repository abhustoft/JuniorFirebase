
angular.module('loginCtrl', []).controller('LoginController', function(authService) {

    this.login =  function (email, password) {
        authService.login(email, password);

    }

    this.logout =  function () {
        authService.logout();

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