/**
 * Created by abhustoft on 08.11.14.
 */
// public/js/app.js
var app = angular.module('sampleApp', ['ngRoute', 'ngResource', 'appRoutes', 'MainCtrl', 'NerdCtrl', 'AdminCtrl']);

app.factory('nerdFactory', function($resource) {
    return $resource('/api/nerds/:id');
});

app.factory('terdFactory', function($resource) {
    return $resource('/api/nerds/');
});