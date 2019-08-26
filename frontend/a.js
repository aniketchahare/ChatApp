chatApp.controller('controlChat', function ($scope, SocketService, $location, chatService) {
    console.log("In chat controller");

    $scope.message = '';
    $scope.getallMessages = [];
    $scope.emailid = localStorage.getItem('emailid');
    $scope.password = localStorage.getItem('password');
    $scope.token = localStorage.getItem('token');

    try { // $scope.currentuser is changed for getting only for delever message to authorsied person
        SocketService.on($scope.password, (message) => {
            //listening to the evnts
            console.log(" new Message genrrated == ", message);
            $scope.getallMessages.push(message);
            /// console.log("arr", $scope.allMessageArr); 
        })
    }
    catch (err) {
        console.log("error in finding message")
    }
    $scope.displayAllUser = function () {
        console.log("get all users token inside " + token);
        chatService.displayAllUser($scope, token);
    }
    $scope.displayAllUser();

    try {
        $scope.logout = function () {
            localStorage.clear();
            $location.path('login')
        }
    }
    catch (err) {
        console.log("error in logging out")
    }
});


chatApplication.service('serviceLogin', function ($http, $location) {
    this.loginUser = function (data, $scope) {
        console.log("Data on Login Service: ", data);
        $http({
            method: 'POST',
            url: 'http://localhost:4000/login',
            data: data

        }).then(
            function successCallback(response) {
                console.log("Login successful in console");
                console.log(response);
                localStorage.setItem('emailid', response.data.emailid);
                localStorage.setItem('password', response.data.password);
                localStorage.setItem('token', response.data.token);
                $scope.login = function () {
                    alert("Login Successfully!!!!");
                };
                $scope.message = "login successful";
                $location.path('/chatapp')
            },
        ).catch(function errorCallback(response) {
            $scope.login = function () {
                alert("Login Failed!!!!");
            };
            $location.path('/login');
            console.log("Login Failed", response);
        });
    }
});