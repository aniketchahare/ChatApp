app.service("chatService", function($http, $location) {
    this.allUser = function($scope) {
        data = localStorage.getItem('token')
        $http({
            method: 'GET',
            url: 'http://localhost:3000/getAllUsers',
            data: data,
            headers: {
                token: data
            }
        }).then(
            function(response) {
                var getuser = [];
                console.log("chatServices here--> ", response.data);

                $scope.allUser = response.data.result.data;

                console.log("all users display--> ", $scope.allUser)
            }).catch(function(error) {
            console.log("chatServices failed..", error)
        });
    }

    this.person = function($scope, receiver) {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/getAllChat',
            data: data,
            headers: {
                token: data
            }
        }).then(
            function(response) {
                var allChat = [];
                console.log("all chat display--> ", response.data.result.data);

                $scope.allChat = response.data.result.data;
                console.log("get all chats in allChat--> ",$scope.allChat);

                // if($scope.emailid == allChat. && receiver == allChat.emailid);
            }).catch(function(error) {
            console.log("there is some errors in /getAllChat")
        });
    }
});