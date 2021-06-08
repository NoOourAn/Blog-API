const nodemailer = require('nodemailer');

async function sendConfirmationMail(useremail,username){
    try {
        let transporter = nodemailer.createTransport({
            host: 'email-smtp.us-east-2.amazonaws.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'AKIAW5Z2PRQ7WLMPLEE2',
                pass: 'BGcfq7xHzxvcfDWLg6oYqukTIWONUxtRswQiVXWuKl5s'
            },
            tls:{
                rejectUnauthorized:false
            }
        });

        let mailOptions = {
            from: 'nouranaborwash@gmail.com',
            to: `${useremail}`,
            subject: 'Sending Email using Node.js',
            text: `Welcome to our Familia ${username}!`
        };
        
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = sendConfirmationMail