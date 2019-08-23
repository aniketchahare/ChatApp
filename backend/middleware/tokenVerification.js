var jwt = require('jsonwebtoken');
var secretKey = "secretKey"

module.exports =
{
    checkToken(req,res,next)
    {
        try
        {
            var token = req.header('token') || req.param.token;

            console.log('token in check token',token)
            if(token)
            {
                jwt.verify(token, secretKey, (err,data) =>
                {
                    if(err)
                    {
                        return res.json(
                        {
                            success: false,
                            message: 'Token is invalid.'
                        });
                    }
                    else
                    {
                        console.log(data)
                        req.body['data'] = data;
                        console.log('Decoded token--> '+req.body['data'])
                        next();
                    }
                });
            }
            else
            {
                return res.json(
                {
                    success: false,
                    message: 'Unauthorised User.'
                });
            }
        }
        catch(err)
        {
            console.log(err);
            return err;
        }
    }
}