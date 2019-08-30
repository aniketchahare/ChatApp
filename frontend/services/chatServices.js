app.service("chatService", function ($http, $location) {
    this.allUser = function ($scope) {
        data = localStorage.getItem('token')
        $http({
            method: 'GET',
            url: 'http://localhost:3000/getAllUsers',
            data: data,
            headers: {
                token: data
            }
        }).then(
            function (response) {
                var getuser = [];
                console.log("chatServices here--> ", response.data);

                $scope.allUser = response.data.result.data;

                $scope.currentUser = $scope.emailid;

                console.log("all users display--> ", $scope.allUser)
            }).catch(function (error) {
                console.log("chatServices failed..", error)
            });
    }

    this.getReceiverMessage = function ($scope,token) {
        var array = []
        data = localStorage.getItem('token')
        $http({
            method: 'GET',
            url: 'http://localhost:3000/getAllChat',
            data: data,
            headers: {
                token: data
            }
        }).then(
            function (response) {
                console.log("length-->  ",response.data.result.data.length)
                
                for (var i = 0; i < (response.data.result.data.length); i++) {

                    var list = response.data.result.data[i];
                    console.log(list);

                    if (((localStorage.getItem('_id') === list.senderid) && (localStorage.getItem('receiverid') == list.receiverid))  ||  ((localStorage.getItem('_id') === list.receiverid) && (localStorage.getItem('receiverid') === list.senderid))) {
                        array.push(list);
                        $scope.getallMessages = array;
                    }
                }

                console.log("Array display",array)
                console.log("get All Messages display--> ",$scope.getallMessages);
            }).catch(function (error) {
                console.log("there is some errors in /getAllChat")
            });
    }
});