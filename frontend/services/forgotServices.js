app.service("forgotServices", function($http,$location)
{
    this.forgotServicesUser = function(data,$scope)
    {
        $http(
        {
            method: 'POST',
            url: 'http://localhost:3000/forgot',
            data: data
        }).then(
            function (response)
            {
                console.log("forgot successfully");
                console.log(response);

                $location.path('/#/forgot');
            }).catch(function error(error)
            {
                console.log("forgot failed..",error)
            });
    }
});