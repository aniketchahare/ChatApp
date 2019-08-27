var app = angular.module('chatApplication', ['ui.router', 'btford.socket-io']);

app.config(function ($stateProvider, $urlRouterProvider) {
    console.log("welcome")
    $stateProvider.state('register',
        {
            url: '/register',
            templateUrl: 'templates/register.html',
            controller: 'registerController'
        })


        .state('login',
            {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'loginController'
            })


        .state('forgot',
            {
                url: '/forgot',
                templateUrl: 'templates/forgot.html',
                controller: 'forgotController'
            })

        .state('reset',
            {
                url: '/reset/:token',
                templateUrl: 'templates/reset.html',
                controller: 'resetController'
            })

        .state('chatBox',
            {
                url: '/chatBox',
                templateUrl: 'templates/chatBox.html',
                controller: 'chatController'
            });

    $urlRouterProvider.otherwise('/login');
});

app.service('SocketService', ['socketFactory', function SocketService(socketFactory) {
    return socketFactory({
        ioSocket: io.connect('http://localhost:3000')
    });
}]);