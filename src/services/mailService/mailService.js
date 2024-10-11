import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// var mailOptions = {
//   pool: true,
//   service: "gmail",
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   tls: {
//     servername: "smtp.gmail.com",
//   },
//   auth: {
//     user: process.env.emailSend,
//     pass: process.env.emailSendPass,
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// };


// const myOAuth2Client = new OAuth2Client(
//   process.env.GOOGLE_MAILER_CLIENT_ID,
//   process.env.GOOGLE_MAILER_CLIENT_SECRET
// );
// myOAuth2Client.setCredentials({
//   refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
// });

// const sendMail = async (req, res) => {
//   try {
//     const { email, subject, content } = req.body;
//     if (!email || !subject || !content)
//       throw new Error("Please provide email, subject and content!");
//     const myAccessTokenObject = await myOAuth2Client.getAccessToken();
//     const myAccessToken = myAccessTokenObject?.token;
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: process.env.ADMIN_EMAIL,
//         clientId: process.env.GOOGLE_MAILER_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_MAILER_CLIENT_SECRET,
//         refreshToken: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
//         accessToken: myAccessToken,
//       },
//     });
//     const mailOptions = {
//       to: email,
//       subject: subject,
//       html: `<h3>${content}</h3>`,
//     };
//     await transporter.sendMail(mailOptions);
//     return res.status(200).json({ message: "Email sent successfully" });
//   } catch (e) {
//     console.log(e);
//     return res.status(500).json({ errors: error.message });
//   }
// };

const transporter = nodemailer.createTransport({
  secure: true,
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: process.env.GOOGLE_NODEMAILER_GMAIL,
    pass: process.env.GOOGLE_NODEMAILER_PASS
  },
  tls: { rejectUnauthorized: false }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatePath = path.join(__dirname, 'emailTemplate.ejs');

// Gửi email với EJS template và chèn hình ảnh
function sendMail(to, subject, templateData) {
  ejs.renderFile(templatePath, templateData, (err, htmlContent) => {
    if (err) {
      return console.log(err);
    }

    transporter.sendMail({
      to: to,
      subject: subject,
      html: htmlContent,
      attachments: [
        {
          filename: 'InivitatingCard.png',
          path: path.join(__dirname, '../../../public/images/emailTemplate/InivitatingCard.png'), // Path to the image
          cid: 'invitationCardImage' // Same cid value as in the HTML
        }
      ]
    }, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Email sent: ' + info.response);
    });
  });
}

// Gửi email với dữ liệu động
sendMail('ductrong1313@gmail.com', 'Anniversary Invitation', {
  subject: 'Invitation Email',
  name: 'LeThao',
  message: 'Here some thing, we want to let you know. Thank you for your attention!',
});

export { sendMail };
