// chatApplication.service('serviceRegister', function ($http, $location) {
//     console.log('registerservice.js')
//     this.registerUser = function (data, $scope) {
//         console.log("data on service register---", data);
//         $http({
//             method: 'POST',
//             url: 'http://localhost:9000/register',
//             data: data

//         }).then(
//             function successCallback(response) {
//                 console.log("registration successful");
//                 console.log(response);
               
//                 $location.path('/register');
//             },
//         ).catch(function errorCallback(response) {
//             console.log("registration  unsuccessful", response);
            
//         });
//     }
// });

chatApplication.services("registerServices", function($http,$location)
{
    this.registerServicesUser = function(data,$scope)
    {
        $http(
        {
            method: 'POST',
            url: 'http://localhost:27017/register',
            data: data
        }).then(
            function registerSuccessfully(res)
            {
                $location.path('/register');
            }).catch(function error(res)
            {
                console.log("Registration failed..",res)
            });
    }
});