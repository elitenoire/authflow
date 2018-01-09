const fs = require('fs')
//const { readFile, readdir } = require('fs')
const path = require('path')
const { promisify } = require('util')
const { compile } = require('handlebars')
const { mjml2html } = require('mjml')
const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text')
const { MAIL_HOST,MAIL_PORT, MAIL_PASS, MAIL_USER, MAIL_FROM } = require(../config)

const readFile = promisify(fs.readFile)
const readdir = promisify(fs.readdir)
//const readFile = promisify(readFile)
//const readdir = promisify(readdir)

// Mail Transport Service
const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    auth: { user: MAIL_USER, pass: MAIL_PASS },
    logger: true,
    tls: { rejectUnauthorized: false }
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
const compileTemplate = async (templateName, data) => {
    const templatePath = path.join(__dirname, '../templates/mail/', `${templateName}.mjml`)
    try {
        const templateString = await readFile(templatePath, 'utf8')
        const mjmlTemplate = compile(templateString)(data)
        const { errors, html } = mjml2html(mjmlTemplate)
        if (errors){
            console.log(errors.map(e => e.formattedMessage).join("\n"));
        }
        return html
    }
    catch(err) {
        return err
    }

}

const sendEmail = async ({ from, to, subject, data, templateName }) => {
    // mailer options
    const mailOptions = {
        from : from || MAIL_FROM,
        to,
        subject : subject || data.subject
    }
    // Add subject as data if needed
    data.subject = subject
    
    // Generate email
    try {
        const html = await compileTemplate(templateName, data)
        const text = htmlToText.fromString(html, {wordwrap: 80});        
    }
    catch(err) {
        return err
    }  

    // promisified mail sending
    return new Promise((resolve, reject) => {
        transporter.sendMail({...mailOptions, html, text}, (err, info) => {
            if(err) reject(err)
            //  console.log(`Message sent: #${info.messageId} ${info.response}`)
            else resolve(info) 
            }
        )
    }

}

module.exports = { sendEmail }
