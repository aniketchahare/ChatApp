var chatModel = require('../app/models/chatModel');

module.exports =
{
    chatMsgService(userData, callback)
    {
        try
        {
            chatModel.chatMsg(userData, (err, data) =>
            {
                if(err)
                {
                    return callback(err);
                }
                else
                {
                    return callback(null, data);
                }
            });
        }
        catch(err)
        {
            console.log(err);
            return err;
        }
    },

    getAllChatService(callback)
    {
        try
        {
            chatModel.getAllChatMsg((err, data) =>
            {
                if(err)
                {
                    return callback(err);
                }
                else
                {
                    return callback(null, data);
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