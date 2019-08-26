app.controller("chatController", function ($scope, chatServices, SocketService) {
    console.log("chat controller called...");


    $scope.message = '';
    $scope.allMessage = [];

    $scope._id = localStorage.getItem('_id');
    $scope.firstname = localStorage.getItem('firstname');
    $scope.lastname = localStorage.getItem('lastname');
    $scope.mobileno = localStorage.getItem('mobileno');
    $scope.emailid = localStorage.getItem('emailid');
    $scope.password = localStorage.getItem('password');
    $scope.token = localStorage.getItem('token')

    try {
        SocketService.on($scope.password, (message) => {
            //listening to the evnts
            console.log(" new Message generated--> ", message);
            $scope.allMessage.push(message);
            /// console.log("arr", $scope.allMessageArr); 
        });
    } catch (error) {
        console.log("error in searching messages....")
    }

    $scope.allUser = function () {
        console.log("get all users token inside " + token);
        chatService.displayChatServiceUser(token, $scope);
    }
    $scope.allUser();

    try {
        $scope.logout = function () {
            localStorage.clear();
            $location.path('/login')
        }
    }
    catch (err) {
        console.log("error in logging out")
    }
});