app.controller('resetController', function($scope,resetServices)
{
    console.log("reset controller called...");

    $scope.save = function()
    {
        var resetUser =
        {
            'password': $scope.password
        }

        console.log("reset details in controller--> ",resetUser);
        resetServices.resetServicesUser(resetUser,$scope);
    }
})