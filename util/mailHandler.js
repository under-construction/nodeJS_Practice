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

exports.sendMail = async (toMail, subject) => {
    fs.readFile('./views123/mailViews456/mail.ejs', 'utf8', async (err, fileContent) => {
        await transporter.sendMail({
            to: toMail,
            from: FROM_MAIL,
            subject: subject,
            html: fileContent
        });
    });
}