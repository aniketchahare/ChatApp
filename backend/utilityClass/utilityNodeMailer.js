var nodeMailer = require('nodemailer');

module.exports =
{
    sendEmail(emailid, url)
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
            text: url,
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