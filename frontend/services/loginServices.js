app.service("loginServices", function ($http, $location, SocketService) {
    this.loginServicesUser = function (data, $scope) {
        $http(
            {
                method: 'POST',
                url: 'http://localhost:3000/#/login',
                data: data
            }).then(
                function (response) {
                    console.log("login successfully");
                    console.log("data in response--> ", response);

                    localStorage.setItem('_id', response.data.result.data._id);
                    localStorage.setItem('firstname', response.data.result.data.firstname);
                    localStorage.setItem('lastname', response.data.result.data.lastname);
                    localStorage.setItem('mobileno', response.data.result.data.mobileno);
                    localStorage.setItem('emailid', response.data.result.data.emailid);
                    localStorage.setItem('password', response.data.result.data.password);
                    localStorage.setItem('token', response.data.result.token.token);

                    $scope.login = function () {
                        alert("Login successfull")
                    }
                    // $http(
                    //     {
                    //         method: 'GET',
                    //         url: 'http://localhost:3000/getAllUsers',
                    //         data: data,
                    //         headers:
                    //         {
                    //             token: data.result.token.token
                    //         }
                    //     }).then(
                    //         function (response) {
                    //             var getuser = [];

                    //             localStorage.setItem('getuser',JSON.stringify(localStorage.setItem(response.data)));

                    //         }).catch(function (error) {
                    //             console.log("chatServices failed..", error)
                    //         });

                    $location.path('/chatBox')
                    // $location.path('/login');
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