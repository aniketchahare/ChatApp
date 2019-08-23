var userService = require('../services/userService');

module.exports =
{
    registerController(req, res)
    {
        try
        {
            req.checkBody('firstname', 'First name should not be empty.').notEmpty();
            req.checkBody('firstname', 'Please enter only lettes.').isAlpha();
            req.checkBody('lastname', 'Last name should not be empty.').notEmpty();
            req.checkBody('lastname', 'Please enter only letters.').isAlpha();
            req.checkBody('mobileno', 'Mobile number should not be empty').notEmpty();
            req.checkBody('mobileno', 'Please enter only numeric.').isNumeric();
            req.checkBody('mobileno', 'Please enter 10 digit mobile number.').isLength({max : 10});
            req.checkBody('mobileno', 'Please enter 10 digit mobile number.').isLength({min : 10});
            req.checkBody('emailid', 'Email id should not be empty').notEmpty();
            req.checkBody('emailid', 'Please enter valid email id.').isEmail();
            req.checkBody('password', 'Password should not be empty.').notEmpty();
            req.checkBody('password', 'Password length should be minimum 6.').isLength({min : 6});

            var errors = req.validationErrors();

            var response = {};

            if(errors)
            {
                response.success = false;
                response.error = errors;
                return res.status(422).send(response);
            }
            else
            {
                var userData =
                {
                    firstname : req.body.firstname,
                    lastname : req.body.lastname,
                    mobileno : req.body.mobileno,
                    emailid : req.body.emailid,
                    password : req.body.password
                }
                console.log('user data in ctrl', userData);

                userService.registerService(userData, (err, data) => 
                {
                    if(err)
                    {
                        response.success = false;
                        response.error = err;
                        return res.status(400).send(response);
                    }
                    else
                    {
                        response.success = true;
                        response.result = data;
                        return res.status(200).send(response);
                    }
                });
            }
        }
        catch(err)
        {
            console.log(err);
            return err;
        }
    },

    loginController(req, res)
    {
        try
        {
            req.checkBody('emailid', 'Email id should not be empty').notEmpty();
            req.checkBody('emailid', 'Please enter valid email id.').isEmail();
            req.checkBody('password', 'Password should not be empty.').notEmpty();
            req.checkBody('password', 'Password length should be minimum 6.').isLength({min : 6});

            var errors = req.validationErrors();

            var response = {};

            if(errors)
            {
                response.success = false;
                response.error = errors;
                return res.status(422).send(response);
            }
            else
            {
                var logindata =
                {
                    emailid : req.body.emailid,
                    password : req.body.password
                }

                userService.loginService(logindata, (err, data) =>
                {
                    if(err)
                    {
                        response.success = false;
                        response.result = err;
                        return res.status(400).send(response);
                    }
                    else
                    {
                        response.success = true;
                        response.result = data;
                        return res.status(200).send(response);
                    }
                });
            }
        }
        catch(err)
        {
            console.log(err);
            return err;
        }
    },

    forgotPasswordController(req, res)
    {
        try
        {
            req.checkBody('emailid', 'Email id should not be empty').notEmpty();
            req.checkBody('emailid', 'Please enter valid email id.').isEmail();

            var errors = req.validationErrors();

            var response = {};

            if(errors)
            {
                response.success = false;
                response.error = errors;
                return res.status(422).send(response);
            }
            else
            {
                var forgotPasswordDetails =
                {
                    emailid : req.body.emailid,
                }

                userService.forgotPasswordService(forgotPasswordDetails, (err, data) =>
                {
                    if(err)
                    {
                        response.success = false;
                        response.result = err;
                        return res.status(400).send(response);
                    }
                    else
                    {
                        response.success = true;
                        response.result = data;
                        return res.status(200).send(response);
                    }
                });
            }
        }
        catch(err)
        {
            console.log(err);
            return err;
        }
    },

    resetPasswordController(req, res)
    {
        try
        {
            req.checkBody('password', 'Password should not be empty.').notEmpty();
            req.checkBody('password', 'Password length should be minimum 6.').isLength({min : 6});

            var errors = req.validationErrors();

            var response = {};

            if(errors)
            {
                response.success = false;
                response.error = errors;
                return res.status(422).send(response);
            }
            else
            {
                console.log("in controller",req.body.data._id);
                var resetPasswordDetails =
                {
                    _id : req.body.data._id,
                    password : req.body.password,
                }

                console.log("inside reset control",resetPasswordDetails);

                userService.resetPasswordService(resetPasswordDetails, (err,data) =>
                {
                    if(err)
                    {
                        response.success = false;
                        response.result = err;
                        return res.status(400).send(response);
                    }
                    else
                    {
                        response.success = true;
                        response.result = data;
                        return res.status(200).send(response);
                    }
                });
            }
        }
        catch(err)
        {
            console.log(err);
            return err;
        }
    },

    getAllUserController(req,res)
    {
        try
        {
            var response = {};
            
            userService.getAllUserService((err, data) => 
            {
                if(err)
                {
                    response.success = false;
                    response.error = err;
                    return res.status(400).send(response);
                }
                else
                {
                    response.success = true;
                    response.result = data;
                    return res.status(200).send(response);
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