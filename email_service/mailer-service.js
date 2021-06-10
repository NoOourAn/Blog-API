const nodemailer = require('nodemailer');
const generateEmailTemplate = require('./email-template');

async function sendConfirmationMail(useremail, username, token) {
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
            tls: {
                rejectUnauthorized: false
            }
        });

        ////confirmation Url
        let url = token ? `http://${process.env.HOST}:${process.env.PORT}/api/activateAccount/${token}?api_key=${process.env.API_KEY}` : undefined

        let mailOptions = {
            from: 'nouranaborwash@gmail.com',
            to: `${useremail}`,
            subject: 'Confirmation Mail',
            html: generateEmailTemplate(username,url),
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = sendConfirmationMail