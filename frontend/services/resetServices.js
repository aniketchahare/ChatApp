app.service("resetServices", function($http,$location)
{
    this.resetServicesUser = function(data,$scope)
    {
        $http(
        {
            method: 'POST',
            url: 'http://localhost:3000/reset/:token',
            data: data
        }).then(
            function (response)
            {
                console.log("reset successfully");
                console.log(response);

                // $location.path('/#/login');
            }).catch(function error(error)
            {
                console.log("reset failed..",error)
            });
    }
});