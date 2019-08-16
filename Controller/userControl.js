var userService = require('../Services/userService');

module.exports =
    {
        registerController(req, res) {
            var userData = {
                firstname : req.body.firstname,
                lastname : req.body.lastname,
            }
            console.log('user data in ctrl', userData);
            var response = {};
            userService.registerService(userData, (err, data) => {
                if(err){
                    response.success = false;
                    response.error = err;
                    return res.status(400).send(response);
                }else{
                    response.success = true;
                    response.result = data;
                    return res.status(200).send(response);
                }
            })
        }
    }