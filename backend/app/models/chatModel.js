const mongoose = require("mongoose");

const Schema = mongoose.Schema(
    {
        senderid:
        {
            type: String,
        },
        sendername:
        {
            type: String,
            require: [true, 'sender name should not be empty']
        },
        receiverid:
        {
            type: String,
        },
        receivername:
        {
            type: String,
            require: [true, 'receiver name should not be empty']
        },
        message:
        {
            type: String,
            require: [true, 'message should not be empty']
        }
    }, { timestamps: true });

var chatBox = mongoose.model('chatBox', Schema);

module.exports =
    {
        chatMsg(userData, callback) {
            try {
                console.log('user data in model--> ', userData);
                var userTextBoxDetails = new chatBox(
                    {
                        "senderid": userData.senderid,
                        "sendername": userData.sendername,
                        "receiverid": userData.receiverid,
                        "receivername": userData.receivername,
                        "message": userData.message
                    });

                console.log("user details in chat msg..backend--> ", userTextBoxDetails)

                userTextBoxDetails.save((err, data) => {
                    if (err) {
                        return callback(err);
                    }
                    else {
                        return callback(null, { message: 'message sent..', data });
                    }
                });
            }
            catch (err) {
                console.log(err);
                return err;
            }
        },

        getAllChatMsg(callback) {
            try {
                chatBox.find({}, (err, data) => {
                    if (err) {
                        return callback({ message: 'chat box is empty...' })
                    }
                    else {
                        console.log("data in model ", data)
                        return callback(null, { message: 'chat messages...', data });
                    }
                });
            }
            catch (err) {
                console.log(err);
                return err;
            }
        }
    }