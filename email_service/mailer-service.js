const nodemailer = require('nodemailer');
const generateEmailTemplate = require('./email-template');

async function sendConfirmationMail(useremail,username){
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_SERVER,
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.LOGIN,
                pass: process.env.PASS,
            },
            tls:{
                rejectUnauthorized:false
            }
        });

        let mailOptions = {
            from: 'nouranaborwash@gmail.com',
            to: `${useremail}`,
            subject: 'Sending Email using Node.js',
            html: generateEmailTemplate(username),
        };
        
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = sendConfirmationMail