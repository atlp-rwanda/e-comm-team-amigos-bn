const nodemailer = require('nodemailer');
require('dotenv').config();

const confirmPaymentEmail = (recipient, subject, cartItems, id) => new Promise((resolve, reject) => {
    // Calculate the total price
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: process.env.AUTH_USER,
    to: recipient,
    subject,
    text: 'Hello,\n\nThis is the message body.',
    html: `<!doctype html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Confirmation</title>
      <style>
        /* Add inline styles here */
      </style>
    </head>
    <body>
      <table class="container" style="max-width: 600px; margin: 0 auto;">
        <tr>
          <td>
            <table>
              <tr>
                <td>
                  <img src="https://media.istockphoto.com/id/1206806317/vector/shopping-cart-icon-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=1RRQJs5NDhcB67necQn1WCpJX2YMfWZ4rYi1DFKlkNA=" width="30" height="30" alt="Amigos Logo">
                </td>
                <td>
                  <h1>Amigos</h1>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>
            <h1 style="text-align: center; margin: 70px 0;">Thanks for your payment!</h1>
            <table class="table" style="width: 100%;">
              <thead>
                <tr>
                  <th scope="col">Order confirmation</th>
                  <th scope="col">${id}</th>
                </tr>
              </thead>
              <tbody>
              <!-- Replace the static data with dynamic cart items -->
                ${cartItems.map(item => `
                    <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>${item.price}</td>
                    </tr>
                `).join('')}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row" colspan="1">Total:</th>
                  <td>${total}</td>
                </tr>
              </tfoot>
            </table>
          </td>
        </tr>
        <tr>
          <td>
            <table class="container" style="background-color: #096E3E; margin-top: 20px; padding: 10px; width: 100%;">
              <tr>
                <td>
                  <h4 style="color: white;">Get 20% off your next order</h4>
                </td>
                <td>
                  <button style="background-color: white; border: none; padding: 8px 16px;">Shop now</button>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return reject({ message: 'An error has occurred' });
    }
    resolve({ message: 'Email sent successfully' });
  });
});

module.exports = { confirmPaymentEmail };