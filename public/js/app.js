/**
 * Created by abhustoft on 08.11.14.
 */
// public/js/app.js
var app = angular.module('sampleApp', ['ngRoute',
    'ngResource',
    'appRoutes',
    'MainCtrl',
    'NerdCtrl',
    'StoreCtrl',
    'SaleCtrl',
    'AdminCtrl']);

app.factory('storeFactory', function($resource) {
    return $resource('/api/stores/:id');
});

app.factory('nerdFactory', function($resource) {
    return $resource('/api/nerds/:id');
});

app.factory('saleFactory', function($resource) {
    return $resource('/api/sales/:id');
});
