app.service("loginServices", function ($http, $location, SocketService) {
    this.loginServicesUser = function (data, $scope) {
        console.log("data inside login service--> ", data)
        $http(
            {
                method: 'POST',
                url: 'http://localhost:3000/login',
                data: data
            }).then(
                function (response) {
                    console.log("login successfully");
                    console.log("data in response--> ", response);

                    localStorage.setItem('_id', response.data.result.data._id);
                    localStorage.setItem('firstname', response.data.result.data.firstname);
                    localStorage.setItem('emailid', response.data.result.data.emailid);
                    localStorage.setItem('token', response.data.result.token.token);


                    $location.path('/chatBox')
                    $scope.login = function () {
                        alert("Login successfull")
                    }
                }).catch(function error(error) {
                    $scope.login = function () {
                        alert("Login failed...")
                    }
                    console.log("login failed..", error)
                });
    }

    SocketService.on('connection', (data) => {
        console.log(data);
    });
});