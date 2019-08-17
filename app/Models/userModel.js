const bcrypt = require("bcrypt");
const saltRounds = 10;

const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    firstname: {
        type: String,
        require: [true, 'first name should not be empty']
    },
    lastname: {
        type: String,
        require: [true, 'last name should not be empty']
    },
    mobileno: {
        type: String,
        require: [true, 'mobile number should not be empty']
    },
    emailid: {
        type: String,
        require: [true, 'email id should not be empty']
    },
    password: {
        type: String,
        require: [true, 'password should not be empty']
    }
}, { timestamps: true });

var user = mongoose.model('user', Schema);

module.exports =
{
    register(createData, callback)
    {
        console.log('in create data', createData);
        var registerDetails = new user (
        {
            "firstname": createData.firstname,
            "lastname": createData.lastname,
            "mobileno": createData.mobileno,
            "emailid": createData.emailid,
            "password": createData.password
        })

        registerDetails.save((err, data) =>
        {
            if(err)
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
        console.log(loginData.emailid)
        user.findOne({'emailid': loginData.emailid}, (err, data) =>
        {
            if(err)
            {
                return callback(err);
            }
            else
            {
                bcrypt.hash(loginData.password, saltRounds, function(err,hash)
                {
                    password : loginData.password
                });

                bcrypt.compare(loginData.password, hash, function(err, res)
                {
                    if(res)
                    {
                        return callback(null, {message: "Successfully loged in.", data})
                    }
                    else
                    {
                        return callback({message: "please enter valid password.", err})
                    }
                });
                // console.log(loginData.password)
                // console.log(data.password)
                // if(loginData.password === data.password)
                // {
                //     return callback(null, {message: 'Successfully loged in' ,data});
                // }
                // else
                // {
                //     return callback({message: 'Please enter valid password.' , err});
                // }
            }
        });
    }
}