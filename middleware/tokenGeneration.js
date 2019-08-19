var jwt = require('jsonwebtoken');
var secretKey = "secretKey";

module.exports = 
{
    tokenGeneration(payload)
    {
        try
        {
            console.log('gene---->', payload);
            var token = jwt.sign(payload, secretKey, { expiresIn: '1d' });

            var msg = 
            {
                success: true,
                message: 'Token generated',
                token: token
            }
            return msg
        } 
        catch(err)
        {
            console.log(err);
            return err;
        }
    }
}