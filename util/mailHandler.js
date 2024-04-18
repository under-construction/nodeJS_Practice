const fs = require('fs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
require('dotenv').config();

const FROM_MAIL = 'from email';

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: process.env.NODE_MAILER_API_KEY
    }
}));

exports.SIGN_UP_MAIL = './views123/mailViews456/signUpMail.ejs';
exports.PASSWORD_RESET_MAIL = './views123/mailViews456/passwordResetMail.ejs';

exports.sendMail = async (mailType, toMail, subject, token = null) => {
    fs.readFile(mailType, 'utf8', async (err, fileContent) => {

        if (mailType === this.PASSWORD_RESET_MAIL) {
            fileContent = fileContent.replace('${token}', token);
        }

        await transporter.sendMail({
            to: toMail,
            from: FROM_MAIL,
            subject: subject,
            html: fileContent
                .replace('${email}', toMail)
        });
    });
}
