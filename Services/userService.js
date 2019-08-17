var userModel = require('../app/Models/userModel');

module.exports =
{
    registerService(registerData, callback)
    {
        userModel.register(registerData, (err, data) =>
        {
            if(err)
            {
                return callback(err);
            }
            else
            {
                return callback(null, data);
            }
        });
    },

    loginService(loginData, callback)
    {
        userModel.login(loginData, (err, data) =>
        {
            if(err)
            {
                return callback(err)
            }
            else
            {
                return callback(null, data);
            }
        })
    }
}