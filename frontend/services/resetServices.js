app.service("resetServices", function ($http, $location) {
    this.resetServicesUser = function (data, $scope) {
        var data = localStorage.getItem('token');
        $http(
            {
                method: 'POST',
                url: 'http://localhost:3000/reset/:token',
                data: data,
                headers:
                {
                    token: data
                }
            }).then(
                function (response) {
                    console.log("reset successfully");
                    console.log(response);

                    $location.path('/#/login');
                }).catch(function error(error) {
                    console.log("reset failed..", error)
                });
    }
});