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
    'firebase',
    'n3-line-chart']);

app.factory('storeFactory', function($resource) {
    return $resource('/api/stores/:id');
});

app.factory('saleFactory', function($resource) {
    return $resource('/api/sales/:id');
});

app.factory('storeSalesFactory', function($resource) {
    return $resource('/api/sales/store/:id');
});

app.value('FireDB', 'https://junioropen.firebaseio.com/');

app.run(function (firebaseService) {
    /*
    firebaseService.FBref().onAuth(function(authData ) {
        if (authData) {
            console.log("Authenticated with uid:", authData.uid + ' email: ' + authData.password.email);
            //mainCtrl.setUser(authData.uid);
        } else {
            console.log("Client unauthenticated.");
            //mainCtrl.noUser();
        }
    });
    */
})


