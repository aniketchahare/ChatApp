app.controller('loginController', function($scope,loginServices)
{
    console.log("login controller called...");

    $scope.login = function()
    {
        var loginUser =
        {
            'emailid': $scope.emailid,
            'password': $scope.password
        }

        console.log("login details in controller--> ",loginUser);
        loginServices.loginServicesUser(loginUser,$scope);
    }
})