app.controller("registerController", function ($scope, registerServices) {
    console.log("register controller called...");

    $scope.register = function () {
        var registerUser =
        {
            'firstname': $scope.firstname,
            'lastname': $scope.lastname,
            'mobileno': $scope.mobileno,
            'emailid': $scope.emailid,
            'password': $scope.password
        }

        console.log("register details in controller--> ", registerUser);
        registerServices.registerServicesUser(registerUser);
    }
});