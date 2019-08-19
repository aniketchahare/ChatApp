var userService = require('../Services/userService');

module.exports =
{
    registerController(req, res)
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

            var response = {};

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
    },

    loginController(req, res)
    {
        req.checkBody('emailid', 'Email id should not be empty').notEmpty();
        req.checkBody('emailid', 'Please enter valid email id.').isEmail();
        req.checkBody('password', 'Password should not be empty.').notEmpty();
        req.checkBody('password', 'Password length should be minimum 6.').isLength({min : 6});

        var errors = req.validationErrors();

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

            var response = {};

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
    },

    forgotPasswordController(req, res)
    {
        var forgotPasswordDetails =
        {
            emailid : req.body.emailid,
        }

        var response = {};

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
    },

    resetPasswordController(req, res)
    {

        req.checkBody('password', 'Password should not be empty.').notEmpty();
        req.checkBody('password', 'Password length should be minimum 6.').isLength({min : 6});

        var errors = req.validationErrors();

        if(errors)
        {
            response.success = false;
            response.error = errors;
            return res.status(422).send(response);
        }
        else
        {
            var resetPasswordDetails =
            {
                _id : req.decoded._id,
                password : req.body.password,
            }

            console.log(resetPasswordDetails);
            var response = {};

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
}