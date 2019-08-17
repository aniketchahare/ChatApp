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
                });

                    bcrypt.compare(myPlaintextPassword, hash, function(err, res)
                    {
                        // res == true
                    });
                    bcrypt.compare(someOtherPlaintextPassword, hash, function(err, res)
                    {
                        // res == false
                    });
                console.log(loginData.password)
                console.log(data.password)
                if(loginData.password === data.password)
                {
                    console.log('Successfully loged in');
                    return callback(null, {message: 'Successfully loged in' ,data});
                }
                else
                {
                    console.log("Please enter valid password.");
                    return callback({message: 'Please enter valid password.' , err});
                }
            }
        });
    }
}