var chatService = require('../services/chatService');

module.exports =
{
    chatController(req, res)
    {
        try
        {
            var response = {};
            
            var userData =
            {
                sendername : req.body.sendername,
                receivername : req.body.receivername,
                message : req.body.message
            }
            console.log('user data in ctrl', userData);

            chatService.chatMsgService(userData, (err, data) => 
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
        catch(err)
        {
            console.log(err);
            return err;
        }
    },

    getAllChatController(req,res)
    {
        try
        {
            var response = {};
            
            chatService.getAllChatService((err, data) => 
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
        catch(err)
        {
            console.log(err);
            return err;
        }
    }
}