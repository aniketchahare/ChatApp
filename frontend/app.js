var app = angular.module('chatApplication', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {
    console.log("welcome")
    $stateProvider.state('register',
        {
            url: '/register',
            templateUrl: 'templates/register.html',
            controller: 'registerController'
        });
    $urlRouterProvider.otherwise('/login');

    $stateProvider.state('login',
        {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'loginController'
        });
    $urlRouterProvider.otherwise('/login');

    $stateProvider.state('forgot',
        {
            url: '/forgot',
            templateUrl: 'templates/forgot.html',
            controller: 'forgotController'
        });
    $urlRouterProvider.otherwise('/reset');

    $stateProvider.state('reset',
        {
            url: '/reset',
            templateUrl: 'templates/reset.html',
            controller: 'resetController'
        });
    $urlRouterProvider.otherwise('/login');
});