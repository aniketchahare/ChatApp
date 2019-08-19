const bcrypt = require("bcrypt");

const tokenVerification = require('../../middleware/tokenVerification');

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
    verify:
    {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

function hash(password)
{
    const saltRounds = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(password, saltRounds);
    return hashPassword;
}

var user = mongoose.model('user', Schema);

module.exports =
{
    register(createData, callback)
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

        registerDetails.save((err, data) => 
        {
            if (err)
            {
                return callback(err);
            }
            else
            {
                return callback(null, { message: 'registered successfully', data });
            }
        });
    },

    login(loginData, callback) 
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
                            "emailid": loginData.emailid,
                            "_id": data._id
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
    },

    forgotPassword(forgotPasswordData, callback)
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
    },

    resetPassword(resetPasswordData, callback) 
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
}