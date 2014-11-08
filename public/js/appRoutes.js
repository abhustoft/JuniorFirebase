/**
 * Created by abhustoft on 08.11.14.
 */
// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        .when('/nerds', {
            templateUrl: 'views/nerd.html',
            controller: 'NerdController'
        })

        .when('/admin', {
            templateUrl: 'views/admin.html',
            controller: 'AdminController'
        });

    $locationProvider.html5Mode(true);

}]);

