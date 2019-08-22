// var chatApplication = angular.module('chatApplication', ['ui.router']);
// chatApplication.config(function ($stateProvider, $urlRouterProvider) {

//     $stateProvider
//     .state('register', {
//         url: '/register',
//         templateUrl: 'template/register.html',
//         controller: 'controlRegister'
//     })
// })

var chatApplication = angular.module('chatApplication',['ui.router']);

chatApplication.config(function($stateProvider,$urlRouterProvider)
{
    $stateProvider.state('register',
    {
        url: '/register',
        templateUrl: 'template/register.html',
        controller: 'registerController'
    });
});