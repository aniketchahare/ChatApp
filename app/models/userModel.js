const bcrypt = require("bcrypt");
const nodeMailer = require("nodemailer");

// const tokenVerification = require('../../middleware/tokenVerification');

const mongoose = require("mongoose");
var tokenGeneration = require('../../middleware/tokenGeneration');

const Schema = mongoose.Schema(
{
    firstname:
    {
        type: String,
        require: [true, 'first name should not be empty']
    },
    lastname:
    {
        type: String,
        require: [true, 'last name should not be empty']
    },
    mobileno:
    {
        type: Number,
        require: [true, 'mobile number should not be empty']
    },
    emailid:
    {
        type: String,
        require: [true, 'email id should not be empty']
    },
    password:
    {
        type: String,
        require: [true, 'password should not be empty']
    },
}, { timestamps: true });

var user = mongoose.model('user', Schema);

function hash(password)
{
    const saltRounds = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(password, saltRounds);
    return hashPassword;
}

module.exports =
{
    register(createData, callback)
    {
        try
        {
            console.log('create data--> ',createData);
            var registerDetails = new user(
            {
                "firstname": createData.firstname,
                "lastname": createData.lastname,
                "mobileno": createData.mobileno,
                "emailid": createData.emailid,
                "password": hash(createData.password),
            })

            user.findOne({ 'emailid': registerDetails.emailid }, (err,existData) =>
            {
                console.log(existData)
                if(!existData)
                {
                    return res.status(400).send({ msg: 'Email address is not exist.'});
                }
                else
                {
                    registerDetails.save((err, data) => 
                    {
                        if (err)
                        {
                            return callback(err);
                        }
                        else
                        {
                            // var payload =
                            // {
                            //     'emailid': createData.emailid
                            // }

                            // var token = tokenGeneration.tokenGeneration(payload);

                            // token.

                            return callback(null, { message: 'registered successfully', data });
                        }
                    });
                }
            });
        }
        catch(err)
        {
            console.log(err);
            return err;
        }
    },

    login(loginData, callback) 
    {
        try
        {
            console.log('login data--> ' + loginData.emailid)
            user.findOne({ 'emailid': loginData.emailid }, (err, data) => 
            {
                if(err)
                {
                    return callback(err);
                }
                else
                {
                    console.log('login data--> ', data.password)
                    bcrypt.compare(loginData.password, data.password, (err, result) => 
                    {
                        if(result)
                        {
                            var payload = 
                            {
                                "_id": data._id,
                                "emailid": loginData.emailid
                            }
                            console.log('payload-->', payload);
                            var token = tokenGeneration.tokenGeneration(payload);
                            console.log('token gen--->', token);
                            return callback(null, { message: "Successfully loged in.", data, token: token })
                        }
                        else
                        {
                            return callback({ message: "please enter valid password.", err })
                        }
                    });
                }
            });
        }
        catch(err)
        {
            console.log(err);
            return err;
        }
    },

    forgotPassword(forgotPasswordData, callback)
    {
        try
        {
            console.log('forgot password data--> ' + forgotPasswordData.emailid);
            user.findOne({ 'emailid': forgotPasswordData.emailid }, (err, data) => 
            {
                if(err)
                {
                    return callback(err);
                }
                else
                {
                    var payload =
                    {
                        "emailid": forgotPasswordData.emailid,
                    }

                    var token = tokenGeneration.tokenGeneration(payload);

                    console.log("token gen in forgot--> ",token.token)

                    var url = 'http://localhost:3000/reset/' + token.token;
                    console.log(url)

                    return callback(null, { message: 'reset passsword link has been sent to your email id', data, url : url});
                }
            });
        }
        catch(err)
        {
            console.log(err);
            return err;
        }
    },

    resetPassword(resetPasswordData, callback) 
    {
        try
        {
            user.findOneAndUpdate({ '_id': resetPasswordData._id }, {$set: {"password" : hash(resetPasswordData.password)}}, (err, data) =>
            {
                if(err)
                {
                    return callback(err);
                }
                else
                {
                    console.log('data-->', data)
                    return callback(null, { message: 'Password set successfully.',data});
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