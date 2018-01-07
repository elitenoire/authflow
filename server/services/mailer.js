const fs = require('fs')
const path = require('path')
const { compile } = require('handlebars')
const { mjml2html } = require('mjml')
const nodemailer = require('nodemailer');
const htmlTotext = require('html-to-text')
const { MAIL_HOST, MAIL_PASS, MAIL_USER } = require(../config)


// Send mail function

// send verification email
    const transporter = nodemailer.createTransport({
        service: 'Sendgrid',
        auth: { user: MAIL_USER, pass: MAIL_PASS }
        })
    const mailOptions = {
        from: '"AuthFlow" <no-reply@authflow.herokuapp.com>',
        to: user.email,
        subject: 'Confirm your Authflow account with us',
        text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' 
        + req.headers.host + '\/auth\/confirm\/' + token.token + '.\n'
        }        
    transporter.sendMail(mailOptions, function (err) {
        // do something
    })

// logger: true,
// in createtransport option nodemailer

// // send mail with defined transport object
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message %s sent: %s', info.messageId, info.response);
//     });

//     transport.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//     }
//     console.log(`Message sent: ${info.response}`);
//   });
// // promised-version
// const emailPromise = () =>{
//     return new Promise((resolve,reject)=>{
//       transporter.sendMail(mailOptions, (error,info)=>{
//         if(error){
//           reject(error)
//           return
//         }
//         resolve(info)
//       })
//     })
//   }
// Load email template / compile mjml to html