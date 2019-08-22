app.service("loginServices", function ($http, $location) {
    this.loginServicesUser = function (data, $scope) {
        $http(
            {
                method: 'POST',
                url: 'http://localhost:3000/login',
                data: data
            }).then(
                function (response) {
                    console.log("login successfully");
                    console.log(response);

                    $location.path('/login');
                }).catch(function error(error) {
                    console.log("login failed..", error)
                });
    }
});