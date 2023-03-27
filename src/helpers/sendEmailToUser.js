const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmailToUser = (recepient, subject, text) =>
    new Promise((resolve, reject) => {
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
        const mailOption = {
            from: 'rwibuserge@icloud.com',
            to: recepient,
            subject,
            text: 'Hello, \n\n' + 'This is the message body.',
            html: `<!doctype html>
      <html lang="en" lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      
      <head>
      <meta charset="utf-8" />
      <meta content="width=device-width" name="viewport" />
      <meta content="IE=edge" http-equiv="X-UA-Compatible" />
      <meta name="x-apple-disable-message-reformatting" />
      <meta content="telephone=no,address=no,email=no,date=no,url=no" name="format-detection" />
      <title>Template 03</title>
      <link href="https://fonts.googleapis.com/css?family=Roboto:400" rel="stylesheet" type="text/css">
      <link href="https://fonts.googleapis.com/css?family=Roboto:700" rel="stylesheet" type="text/css">
      <!--[if mso]>
                  <style>
                      * {
                          font-family: sans-serif !important;
                      }
                  </style>
              <![endif]-->
      <!--[if !mso]><!-->
      <!-- <![endif]-->
      <style>
      html {
          margin: 0 !important;
          padding: 0 !important;
      }
      
      * {
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
      }
      td {
          vertical-align: top;
          mso-table-lspace: 0pt !important;
          mso-table-rspace: 0pt !important;
      }
      a {
          text-decoration: none;
      }
      img {
          -ms-interpolation-mode:bicubic;
      }
      @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
          u ~ div .email-container {
              min-width: 320px !important;
          }
      }
      @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
          u ~ div .email-container {
              min-width: 375px !important;
          }
      }
      @media only screen and (min-device-width: 414px) {
          u ~ div .email-container {
              min-width: 414px !important;
          }
      }
      </style>
      <!--[if gte mso 9]>
              <xml>
                  <o:OfficeDocumentSettings>
                      <o:AllowPNG/>
                      <o:PixelsPerInch>96</o:PixelsPerInch>
                  </o:OfficeDocumentSettings>
              </xml>
              <![endif]-->
      <style>
      @media only screen and (max-device-width: 598px), only screen and (max-width: 598px) {
      
          .eh {
              height:auto !important;
          }
          .desktop {
              display: none !important;
              height: 0 !important;
              margin: 0 !important;
              max-height: 0 !important;
              overflow: hidden !important;
              padding: 0 !important;
              visibility: hidden !important;
              width: 0 !important;
          }
          .mobile {
              display: block !important;
              width: auto !important;
              height: auto !important;
              float: none !important;
          }
              .email-container {
                  width: 100% !important;
                  margin: auto !important;
              }
              .stack-column,
              .stack-column-center {
                  display: block !important;
                  width: 100% !important;
                  max-width: 100% !important;
                  direction: ltr !important;
              }
              .wid-auto {
                  width:auto !important;
              }
              .table-w-full-mobile {
                  width: 100%;
              }
              .text-66174120 {font-size:24px !important;}.text-03252176 {line-height:32px !important;}
              .pl-73080618 {padding-left:16px !important;}.pr-43495815 {padding-right:16px !important;}.pl-25871984 {padding-left:16px !important;}.pr-79383924 {padding-right:16px !important;}.pl-45955143 {padding-left:16px !important;}.pr-46465126 {padding-right:16px !important;}.pl-28793807 {padding-left:16px !important;}.pr-56785582 {padding-right:16px !important;}.pl-72607243 {padding-left:16px !important;}.pr-05473819 {padding-right:16px !important;}
      
              .center-on-narrow {
                  text-align: center !important;
                  display: block !important;
                  margin-left: auto !important;
                  margin-right: auto !important;
                  float: none !important;
              }
              table.center-on-narrow {
                  display: inline-block !important;
              }
      
          }
      
      </style>
      </head>
      
      <body width="100%" style="background-color:#0c5a86;margin:0;padding:0!important;mso-line-height-rule:exactly;">
      <div style="background-color:#0c5a86">
      <!--[if gte mso 9]>
                      <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                      <v:fill type="tile" color="#0c5a86"/>
                      </v:background>
                      <![endif]-->
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
      <td valign="top" align="center">
      <table bgcolor="#ffffff" style="margin:0 auto;" align="center" id="brick_container" cellspacing="0" cellpadding="0" border="0" width="599" class="email-container">
      <tr>
      <td width="599">
      <table cellspacing="0" cellpadding="0" border="0">
      <tr>
      <td width="599" style="background-color:#ffffff;  " bgcolor="#ffffff">
      <table width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
      <td width="100%">
      <table width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr>
      <td width="100%" class="pl-73080618 pr-43495815" style="background-color:#f3f2f5;   padding-left:48px; padding-right:48px;" bgcolor="#f3f2f5">
      <table width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
      <td height="8" style="height:8px; min-height:8px; line-height:8px;"></td>
      </tr>
      <tr>
      <td width="100%">
      <table width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
      <td width="100%" style="  padding-left:12px; padding-right:12px;">
      <table width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
      <td height="12" style="height:12px; min-height:12px; line-height:12px;"></td>
      </tr>
      <tr>
      <td>
      <div style="line-height:20px;text-align:center;"><span style="color:#979dad;font-family:Roboto,Arial,sans-serif;font-size:15px;line-height:20px;text-align:center;">View in browser</span></div>
      </td>
      </tr>
      <tr>
      <td height="12" style="height:12px; min-height:12px; line-height:12px;"></td>
      </tr>
      </table>
      </td>
      </tr>
      </table>
      </td>
      </tr>
      <tr>
      <td height="8" style="height:8px; min-height:8px; line-height:8px;"></td>
      </tr>
      </table>
      </td>
      </tr>
      </table>
      </td>
      </tr>
      <tr>
      <td width="100%" class="pl-25871984 pr-79383924" style="  padding-left:48px; padding-right:48px;">
      <table width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
      <td height="8" style="height:8px; min-height:8px; line-height:8px;"></td>
      </tr>
      <tr>
      <td width="100%">
      <table width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
      <td width="100%" align="center">
      <table width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
      <td align="center">
      <div style="line-height:20px;text-align:center;"><span style="color:#979dad;font-family:Roboto,Arial,sans-serif;font-size:15px;line-height:20px;text-align:center;">Amigos team</span></div>
      </td>
      </tr>
      <tr>
      <td height="12" style="height:12px; min-height:12px; line-height:12px;"></td>
      </tr>
      <tr>
      <td align="center">
      <div style="line-height:40px;text-align:center;"><span class="text-66174120 text-03252176" style="color:#363a57;font-weight:700;font-family:Roboto,Arial,sans-serif;font-size:36px;line-height:40px;text-align:center;">ATLP E-COMMERCE PROJECT</span></div>
      </td>
      </tr>
      <tr>
      <td height="12" style="height:12px; min-height:12px; line-height:12px;"></td>
      </tr>
      <tr>
      <td align="center">
      <div style="line-height:20px;text-align:center;"><span style="color:#979dad;font-family:Roboto,Arial,sans-serif;font-size:18px;line-height:20px;text-align:center;">${text}</span></div>
      </td>
      </tr>
      <tr>
      <td height="12" style="height:12px; min-height:12px; line-height:12px;"></td>
      </tr>
      </table>
      </td>
      </tr>
      </table>
      </td>
      </tr>
      <tr>
      <td height="8" style="height:8px; min-height:8px; line-height:8px;"></td>
      </tr>
      </table>
      </td>
      </tr>
      <tr>
      <td width="100%" class="pl-45955143 pr-46465126" style="  padding-left:48px; padding-right:48px;">
      <table width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
      <td height="8" style="height:8px; min-height:8px; line-height:8px;"></td>
      </tr>
      <tr>
      <td width="100%">
      <table width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
      <td width="100%">
      <table width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr>
      <td width="100%" align="center">
      <table width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
      <td align="center">
      <table cellspacing="0" cellpadding="0" border="0">
      <tr>
      <td align="center">
      <div>
      <!--[if mso]>
                              <w:anchorlock/>
                              <center style="white-space:nowrap;display:inline-block;text-align:center;color:#ffffff;font-weight:700;font-family:Roboto,Arial,sans-serif;font-size:15px;">${text}</center>
                              </v:roundrect>
                          <![endif]-->
      </div>
      </td>
      </tr>
      </table>
      </td>
      </tr>
      </table>
      </td>
      </tr>
      </table>
      </a>
      </td>
      </tr>
      </table>
      </td>
      </tr>
      <tr>
      <td height="8" style="height:8px; min-height:8px; line-height:8px;"></td>
      </tr>
      </table>
      </td>
      </tr>
      <tr>
      <td width="100%" class="pl-28793807 pr-56785582" style="  padding-left:48px; padding-right:48px;">
      <table width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
      <td height="8" style="height:8px; min-height:8px; line-height:8px;"></td>
      </tr>
      <tr>
      <td width="100%" style="  padding-left:48px; padding-right:48px;">
      <table width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
      <td width="100%">
      <table width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
      <td height="7" style="height:7px; min-height:7px; line-height:7px;"></td>
      </tr>
      <tr>
      <td width="407">
      <td height="1" style="height:1px; min-height:1px; line-height:1px;"></td>
      </td>
      </tr>
      <tr>
      <td height="8" style="height:8px; min-height:8px; line-height:8px;"></td>
      </tr>
      </table>
      </td>
      </tr>
      </table>
      </td>
      </tr>
      <tr>
      <td height="8" style="height:8px; min-height:8px; line-height:8px;"></td>
      </tr>
      </table>
      </td>
      </tr>
      <tr>
      <td width="100%">
      <table width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr>
      <td width="100%" class="pl-72607243 pr-05473819" style="background-color:#f3f2f5;   padding-left:48px; padding-right:48px;" bgcolor="#f3f2f5">
      <table width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
      <td height="8" style="height:8px; min-height:8px; line-height:8px;"></td>
      </tr>
      <tr>
      <td width="100%">
      <table width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
      <td height="12" style="height:12px; min-height:12px; line-height:12px;"></td>
      </tr>
      <tr>
      <td width="100%" align="center">
      <table width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
      <td align="center">
      <div style="line-height:20px;text-align:center;"><span style="color:#979dad;font-family:Roboto,Arial,sans-serif;font-size:15px;line-height:20px;text-align:center;">© Email Generator. All rights reserved. </span></div>
      </td>
      </tr>
      <tr>
      <td height="8" style="height:8px; min-height:8px; line-height:8px;"></td>
      </tr>
      <tr>
      <td align="center">
      <div style="line-height:20px;text-align:center;"><span style="color:#979dad;font-family:Roboto,Arial,sans-serif;font-size:15px;line-height:20px;text-align:center;">If you have any questions please contact us amigomarket@gmail.com</span></div>
      </td>
      </tr>
      <tr>
      <td height="8" style="height:8px; min-height:8px; line-height:8px;"></td>
      </tr>
      <tr>
      <td align="center">
      <div style="line-height:20px;text-align:center;"><span style="color:#979dad;font-family:Roboto,Arial,sans-serif;font-size:15px;line-height:20px;text-align:center;">Our Blog | Store | Support Service</span></div>
      </td>
      </tr>
      <tr>
      <td height="8" style="height:8px; min-height:8px; line-height:8px;"></td>
      </tr>
      <tr>
      <td align="center">
      <div style="line-height:20px;text-align:center;"><span style="color:#979dad;font-family:Roboto,Arial,sans-serif;font-size:15px;line-height:20px;text-align:center;">Unsubscribe</span></div>
      </td>
      </tr>
      </table>
      </td>
      </tr>
      <tr>
      <td height="12" style="height:12px; min-height:12px; line-height:12px;"></td>
      </tr>
      <tr>
      <td width="100%" align="center" style="  padding-left:10px; padding-right:10px;">
      <table width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
      <td height="10" style="height:10px; min-height:10px; line-height:10px;"></td>
      </tr>
      <tr>
      <td align="center">
      <table cellspacing="0" cellpadding="0" border="0">
      <tr>
      <td>
      <table width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
      <td width="32"><img src="https://plugin.markaimg.com/public/7b00b89d/R9a7mk0HHo7m2JjJfCuite6lwNsd9Z.png" width="32" border="0" style="min-width:32px; width:32px;
               min-width:32px; width:32px; height: auto; display: block;"></td>
      <td style="width:20px; min-width:20px;" width="20"></td>
      <td width="32"><img src="https://plugin.markaimg.com/public/7b00b89d/vpgQs2YgmFGeBggTFG2fWNQypKPMGs.png" width="32" border="0" style="min-width:32px; width:32px;
               min-width:32px; width:32px; height: auto; display: block;"></td>
      <td style="width:20px; min-width:20px;" width="20"></td>
      <td width="32"><img src="https://plugin.markaimg.com/public/7b00b89d/BZkjsIsBmpeaPN15Nj4CfmWFZByQ02.png" width="32" border="0" style="min-width:32px; width:32px;
               min-width:32px; width:32px; height: auto; display: block;"></td>
      <td style="width:20px; min-width:20px;" width="20"></td>
      <td width="32"><img src="https://plugin.markaimg.com/public/7b00b89d/BfHDv59wNOnOMSC7bvrDCSrYgL6Ea9.png" width="32" border="0" style="min-width:32px; width:32px;
               min-width:32px; width:32px; height: auto; display: block;"></td>
      <td style="width:20px; min-width:20px;" width="20"></td>
      <td width="32"><img src="https://plugin.markaimg.com/public/7b00b89d/n2EUEGk6KZdur4pxuBfMOk9YLKNNZ3.png" width="32" border="0" style="min-width:32px; width:32px;
               min-width:32px; width:32px; height: auto; display: block;"></td>
      <td style="width:20px; min-width:20px;" width="20"></td>
      <td width="32"><img src="https://plugin.markaimg.com/public/7b00b89d/JozjDyrPwewhJ2DI4DyOpsPBtBtnrE.png" width="32" border="0" style="min-width:32px; width:32px;
               min-width:32px; width:32px; height: auto; display: block;"></td>
      </tr>
      </table>
      </td>
      </tr>
      </table>
      </td>
      </tr>
      <tr>
      <td height="10" style="height:10px; min-height:10px; line-height:10px;"></td>
      </tr>
      </table>
      </td>
      </tr>
      <tr>
      <td height="12" style="height:12px; min-height:12px; line-height:12px;"></td>
      </tr>
      <tr>
      <td width="100%" align="center" style="  padding-left:8px; padding-right:8px;">
      <table width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
      <td height="8" style="height:8px; min-height:8px; line-height:8px;"></td>
      </tr>
      <tr>
      <td align="center">
      <table cellspacing="0" cellpadding="0" border="0">
      <tr>
      <td width="114" align="center"><img src="https://plugin.markaimg.com/public/7b00b89d/RpYFOLYIhbdhtDb5TFiBrskOANoXRp.png" width="114" border="0" style="
               min-width:114px; width:114px; height: auto; display: block;"></td>
      </tr>
      </table>
      </td>
      </tr>
      <tr>
      <td height="8" style="height:8px; min-height:8px; line-height:8px;"></td>
      </tr>
      </table>
      </td>
      </tr>
      <tr>
      <td height="4" style="height:4px; min-height:4px; line-height:4px;"></td>
      </tr>
      </table>
      </td>
      </tr>
      <tr>
      <td height="8" style="height:8px; min-height:8px; line-height:8px;"></td>
      </tr>
      </table>
      </td>
      </tr>
      </table>
      </td>
      </tr>
      </table>
      </td>
      </tr>
      </table>
      </td>
      </tr>
      </table>
      </td>
      </tr>
      </table>
      </div>
      </body>
      
      </html>`,
        };

        transporter.sendMail(mailOption, (error, info) => {
            if (error) {
                console.log(error)
                return reject({ message: 'An error Has occured' });
            }
            resolve({ message: 'Email sent successfully' });
        });
    });
module.exports = { sendEmailToUser };
