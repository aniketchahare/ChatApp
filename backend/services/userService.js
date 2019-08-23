var userModel = require('../app/models/userModel');

module.exports =
{
    registerService(registerData, callback)
    {
        try
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
        }
        catch(err)
        {
            console.log(err);
            return err;
        }
    },

    loginService(loginData, callback)
    {
        try
        {
            userModel.login(loginData, (err, data) =>
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
        }
        catch(err)
        {
            console.log(err);
            return err;
        }
    },

    forgotPasswordService(forgotPasswordData, callback)
    {
        try
        {
            userModel.forgotPassword(forgotPasswordData, (err, data) =>
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
        }
        catch(err)
        {
            console.log(err);
            return err;
        }
    },

    resetPasswordService(resetPasswordData, callback)
    {
        try
        {
            userModel.resetPassword(resetPasswordData, (err, data) =>
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
        }
        catch(err)
        {
            console.log(err);
            return err;
        }
    },

    getAllUserService(callback)
    {
        try
        {
            userModel.getAllUser((err, data) =>
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
        }
        catch(err)
        {
            console.log(err);
            return err;
        }
    }
}