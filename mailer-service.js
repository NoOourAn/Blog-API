const nodemailer = require('nodemailer');

async function sendConfirmationMail(useremail,username){
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp-relay.sendinblue.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'nouranaborwash@gmail.com',
                pass: 'nxhdE9b4szTZ1GjW'
            },
            tls:{
                rejectUnauthorized:false
            }
        });

        let mailOptions = {
            from: 'blog@blog-now-api.herokuapp.com',
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