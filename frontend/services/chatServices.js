app.service("chatController", function ($http, $location) {
    this.displayChatServiceUser = function (data , $scope) {
        $http(
            {
                method: 'GET',
                url: 'http://localhost:3000/getAllUsers',
                data: data,
                headers:
                {
                    token: data.result.token.token
                }
            }).then(
                function (response) {
                    var getuser = [];
                    console.log("chatServices here--> ",response.data);
                    
                    // $scope.allUsers = data.result.data;

                    console.log("all users display--> ",allUsers)
                }).catch(function (error) {
                    console.log("chatServices failed..", error)
                });
    }
    
});