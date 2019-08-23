const mongoose = require("mongoose");

const Schema = mongoose.Schema(
    {
        sendername:
        {
            type: String,
            require: [true, 'sender name should not be empty']
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
    chatMsg(userData, callback)
    {
        try
        {
            console.log('user data in model--> ',userData);
            var userTextBoxDetails = new chatBox(
            {
                "sendername": userData.sendername,
                "receivername": userData.receivername,
                "message": userData.message
            });

            console.log(userTextBoxDetails)

            userTextBoxDetails.save((err, data) => 
            {
                if (err)
                {
                    return callback(err);
                }
                else
                {
                    return callback({ message: 'message sent..', data });
                }
            });
        }
        catch(err)
        {
            console.log(err);
            return err;
        }
    },

    getAllChatMsg(callback)
    {
        try
        {
            chatBox.find({}, (err,data) =>
            {
                if(err)
                {
                    return callback({message : 'chat box is empty...'})
                }
                else
                {
                    console.log("data in model ",data)
                    return callback(null,{message : 'chat messages...',data});
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