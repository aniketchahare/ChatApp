app.controller("forgotController", function ($scope, forgotServices) {
    console.log("forgot controller called...");

    $scope.continue = function () {
        var forgotUser =
        {
            'emailid': $scope.emailid
        }

        console.log("forgot details in controller--> ", forgotUser);
        forgotServices.forgotServicesUser(forgotUser, $scope);
    }
});