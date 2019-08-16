var userModel = require('../app/Models/userModel');

module.exports = {
    registerService(registerData, callback){
        console.log('req data---->', registerData.firstname);
        userModel.create(registerData, (err, data) => {
            if(err){
                return callback(err);
            }else{
                return callback(null, data);
            }
        })
    }
}