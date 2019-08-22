// chatApplication.controller('controlRegister', function ($scope, serviceRegister) {
//     console.log("registercontroller calling");
//     $scope.register = function () {
//         var user = {
//             'firstname': $scope.firstname,
//             'lastname': $scope.lastname,
//             'emailid': $scope.emailid,
//             'password': $scope.password,
//         }
//         console.log("register calling", user);
//         serviceRegister.registerUser(user, $scope);
//     }
// });

chatApplication.controller("registerController", function($scope,registerServices)
{
    console.log("register controller called...");

    $scope.registerController = function()
    {
        var registerUser =
        {
            'firstname': $scope.firstname,
            'lastname': $scope.lastname,
            'mobileno': $scope.mobileno,
            'emailid': $scope.emailid,
            'password': $scope.password
        }

        console.log("register details in controller--> ",registerUser);
        registerServices.registerServicesUser(registerUser,$scope);
    }
});