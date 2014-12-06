/**
 * Created by abhustoft on 08.11.14.
 */
// public/js/app.js
var app = angular.module('sampleApp', ['ngRoute',
    'ngResource',
    'appRoutes',
    'MainCtrl',
    'StoreCtrl',
    'SaleCtrl',
    'AdminCtrl',
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

