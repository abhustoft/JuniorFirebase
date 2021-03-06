/**
 * Created by abhustoft on 08.11.14.
 */
// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'views/home.html'
        })

        .when('/admin', {
            templateUrl: 'views/admin.html',
            controller: 'AdminController',
            controllerAs: 'AdminCtrl'
        })

        .when('/sales', {
            templateUrl: 'views/test.html',
            controller: 'TestController',
            controllerAs: 'testCtrl'
        })

        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController',
            controllerAs: 'loginCtrl'
        })

        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegisterController',
            controllerAs: 'registerCtrl'
        })
    ;

    $locationProvider.html5Mode(true);

}]);

