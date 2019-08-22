app.service("registerServices", function ($http, $location) {
    this.registerServicesUser = function (data) {
        $http(
            {
                method: 'POST',
                url: 'http://localhost:3000/register',
                data: data
            }).then(
                function (response) {
                    console.log("registration successfully");
                    console.log(response);

                    $location.path('/#/register');
                    $location.path('/#/login');
                }).catch(function (error) {
                    console.log("Registration failed..", error)
                });
    }
});