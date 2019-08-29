chatApplication.service('chatService', function ($http,$location) 
{
    try {
       
        //displaying all users
        this.displayAllUser = function ($scope, token) 
        {
            console.log(" In service chat")
            token = localStorage.getItem('token');
            $http({
                method: 'GET',
                url: 'http://localhost:4000/displayAllUser',
                headers: {
                     token: token
                }
            }).then(
                function successCallback(response) {
                    $scope.displayAllUser = response.data.result.data;
                    console.log("Response in chat service", $scope.displayAllUser)
                    console.log("Successfully display all users!!");
                },
                function errorCallback(response) {
                    console.log("Failed to display all users");
                    console.log(response);
                    $location.path('/login');
                }
            );
        },

        //getusermessages
        this.getUserMessage = function ($scope, usertoken) 
        {
            console.log("In getusermsg service")
            var array = []
            var usertoken = localStorage.getItem('token'); 
     
            console.log(" Token in getusermessage method ", usertoken);
            $http({
                method: 'GET',
                url: 'http://localhost:4000/getUserMessage',
                headers: {
                    'token': usertoken,
                }
            }).then(
                function successCallback(response) 
                {
                    console.log("Displaying all users messages:",response.data);
                    for( var i =0; i < (response.data.result.length); i++) 
                    {
                        
                        var list = response.data.result[i];
                        // console.log("list: ",list);
                        // console.log("userid ",localStorage.getItem('userId'))
                        // console.log("receiveruserId ",localStorage.getItem('receiveruserId'))
                        // console.log("userfirstname ",localStorage.getItem('userfirstname'))
                        // console.log("receiverfirstname ",localStorage.getItem('receiverfirstname'))
                        if((localStorage.getItem('userId') == list.senderId) && (localStorage.getItem('receiveruserId') == list.receiverId))
                        {
                        
                            array.push(list);
                        }
                    }   
                    $scope.getallMessages = array;
                    console.log("Array: ",array);
                    console.log("All messages of users:  ",$scope.getallMessages); 
                    // return array;  
                },
                function errorCallback(response) {
                    console.log("Failed to display Messages of Users ");
                    console.log(response);
                }
            );
        }
    }
    catch (err) {
        console.log("Error in chat service..");
    }
})