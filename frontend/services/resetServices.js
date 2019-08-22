app.service("resetServices", function($http,$location)
{
    this.resetServicesUser = function(data,$scope)
    {
        $http(
        {
            method: 'POST',
            url: 'http://localhost:3000/reset',
            data: data
        }).then(
            function resetSuccessfully(res)
            {
                console.log("reset successfully");
                console.log(response);

                $location.path('/reset');
            }).catch(function error(error)
            {
                console.log("reset failed..",error)
            });
    }
});