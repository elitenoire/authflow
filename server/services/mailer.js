const fs = require('fs')
const path = require('path')
const { compile } = require('handlebars')
const { mjml2html } = require('mjml')
const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text')
const { MAIL_HOST,MAIL_PORT, MAIL_PASS, MAIL_USER, MAIL_FROM } = require(../config)

// Mail Transport Service
const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    auth: { user: MAIL_USER, pass: MAIL_PASS },
    logger: true
})


    // const mailOptions = {
    //     from: '"AuthFlow" <no-reply@authflow.herokuapp.com>',
    //     to: user.email,
    //     subject: 'Confirm your Authflow account with us',
    //     text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' 
    //     + req.headers.host + '\/auth\/confirm\/' + token.token + '.\n'
    //     }        
    // transporter.sendMail(mailOptions, function (err) {
    //     // do something
    // })


const sendEmail = ({ from, to, subject, data, templateName }) => {
    // mailer options
    const mailOptions = {
        from : from || MAIL_FROM,
        to,
        subject
    }
    // Add subject as data if needed
    data.subject = subject
    
    

    // promisified mail sending
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if(err) reject(err)
            //  console.log(`Message sent: #${info.messageId} ${info.response}`)
            else resolve(info) 
            }
        )
    }

}

module.exports = { sendEmail }



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