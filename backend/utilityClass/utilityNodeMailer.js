var nodeMailer = require('nodemailer');

module.exports =
{
    sendEmail(emailid, token)
    {
        console.log('in side node mailer');
        const smtpTransporter = nodeMailer.createTransport(
        {
            service: 'gmail',
            auth:
            {
                user: 'userdummy1304@gmail.com',
                pass: 'dummyuser1304',
            },
        });

        const mailOptions =
        {
            from: 'userdummy1304@gmail.com',
            to: emailid,
            subject: "reset password",
            // html: '<p>click here <a href="http://localhost:3000/#/reset/' + token + '"></a></p>'
            html: '<p>Click <a href="http://localhost:3000/#/reset/'+token+'">here</a> to reset your password</p>'
        };

        smtpTransporter.sendMail(mailOptions, (err, response) => 
        {
            if(err)
            {
                console.log("there was an error: " + err);
            }
            else
            {
                console.log("here is the response: ", response);
            }
        });
    }
}