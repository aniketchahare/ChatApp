
chatApplication.controller('chatControl', function ($scope, SocketService, $location, chatService) {
    console.log("In  chat controller");

    $scope.message = '';
    $scope.getallMessages = [];
    $scope.userfirstname = localStorage.getItem('userfirstname');
    $scope.userId = localStorage.getItem('userId');
    $scope.emailid = localStorage.getItem('emailid');
    var token = localStorage.getItem('token');
    console.log("login token in chat ", token);

    try {
        SocketService.on($scope.userfirstname, (message) => {
            console.log(" New Message ", message);
            if (localStorage.getItem('userId') == message.senderId || localStorage.getItem('receiveruserId') == message.receiverId || localStorage.getItem('userfirstname') == message.senderName || localStorage.getItem('receiverfirstname') == message.receiverName) {
                if ($scope.getallMessages === undefined) {
                    $scope.getallMessages = message;//assighning message to variable
                }
                else {
                    $scope.getallMessages.push(message);
                }
            }
        })
    }
    catch (err) {
        console.log("Error in displaying messages")
    }

    //Display all user
    $scope.displayAllUser = function () {
        console.log("displayalluser token:  " + $scope,token);
        chatService.displayAllUser($scope);
    }
    $scope.displayAllUser();


    //select user from list
    $scope.user = function (userData) {
        console.log(" data of particular user ", userData);

        $scope.getallMessages = '';

        localStorage.setItem('receiverfirstname', userData.firstname);
        localStorage.setItem('receiveruserId', userData._id);
        $scope.receiverUserName = localStorage.getItem('receiverfirstname');
        $scope.getUserMessage();
    }


    //get all message
    $scope.getUserMessage = function () {
        console.log(" getusermsg called");
        chatService.getUserMessage($scope,token);
    }

    //sending new message
    try {
        $scope.sendmessage = function () {
            var uname = localStorage.getItem('userfirstname');
            var uid = localStorage.getItem('userId');
            var receiverId = localStorage.getItem('receiveruserId')
            var rname = localStorage.getItem('receiverfirstname');
            var msg = {

                'senderId': uid,
                'senderName': uname,
                'receiverId': receiverId,
                'receiverName' : rname,
                'message': $scope.message
            };
            SocketService.emit('createMessage', msg);
            $scope.message = '';
            alert("Message Send Successfully!!!");
        }
    }
    catch (err) {
        console.log("Error in sending message");
    }

    //logout
    try {
        $scope.logout = function () {
            localStorage.clear();
            alert("Logout Successfully!!!");
            $location.path('/login');
        }
    }
    catch (err) {
        console.log("Failed to log out")
    }
});