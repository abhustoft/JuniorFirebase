/**
 * Created by abhustoft on 08.11.14.
 */
// public/js/app.js
var app = angular.module('sampleApp', [
    'ngRoute',
    'ngResource',
    'appRoutes',
    'mainCtrl',
    'storeCtrl',
    'testCtrl',
    'adminCtrl',
    'loginCtrl',
    'registerCtrl',
    'firebase']);

app.factory('storeFactory', function($resource) {
    return $resource('/api/stores/:id');
});

app.factory('saleFactory', function($resource) {
    return $resource('/api/sales/:id');
});

app.factory('storeSalesFactory', function($resource) {
    return $resource('/api/sales/store/:id');
});

app.run(function () {
    console.log('running');
    var ref = new Firebase('https://junioropen.firebaseio.com');

    ref.onAuth(function(authData ) {
        if (authData) {
            console.log("Authenticated with uid:", authData.uid + ' email: ' + authData.password.email);
            //ref.unauth();
        } else {
            console.log("Client unauthenticated.")
        }
    });
})


