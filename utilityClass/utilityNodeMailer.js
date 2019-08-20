// var 
// const nodemailer = require("nodemailer");

// function nodeMailer()
// {
//     try
//     {
//         let testAccount = await nodemailer.createTestAccount();

//         let transporter = nodemailer.createTransport(
//         {
//             host: 'localhost:27017',
//             port: process.env.PORT,
//             secure: false, // true for 465, false for other ports
//             auth: {
//                 user: testAccount.user, // generated ethereal user
//                 pass: testAccount.pass // generated ethereal password
//             }
//         });

//         let info = await transporter.sendMail(
//         {
//             from: '"Fred Foo" <foo@example.com>', // sender address
//             to: 'bar@example.com, baz@example.com', // list of receivers
//             subject: 'Verification..', // Subject line
//             text: 'Please verify by clicking link.', // plain text body
//             // html: '<b>Hello world?</b>' // html body
//         });

//         console.log('Message sent: %s', info.messageId);

//         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//     }
//     catch(err)
//     {
//         console.log(err);
//     }
// }
// nodeMailer();