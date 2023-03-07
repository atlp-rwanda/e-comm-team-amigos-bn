const nodemailer = require('nodemailer');
require('dotenv').config();

function sendMail(recepient, subject, text, url) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASSWORD,
      },
    });
    const mailOption = {
      from: 'kananuraabdulkhaliq59@gmail.com',
      to: recepient,
      subject,
      text: 'Hello, \n\n' + 'This email verification',
      html: `<p>Hello,</p><p>This email verification link</p><a href='${url}'>Click here to Verify your account</a>`,
    };

    transporter.sendMail(mailOption, (error, info) => {
      if (error) {
        return reject({ message: 'An error Has occured' });
      }
      resolve({ message: 'Email sent successfully' });
    });
  });
}
module.exports = { sendMail };
