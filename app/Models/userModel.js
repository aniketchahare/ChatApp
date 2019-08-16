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

module.exports = {
    create(createData, callback) {
        console.log('in create data', createData);
        var userDetails = new user ({
            "firstname": createData.firstname,
            "lastname": createData.lastname,
            "mobileno": createData.mobileno,
            "emailid": createData.emailid,
            "password": createData.password
        })

        userDetails.save((err, data) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, { message: 'registered successfully', data });
            }
        })
    }
}