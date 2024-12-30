import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.mailersend.net",
    port: 587, // or 465 for SSL
    secure: false, // set to true if you're using port 465
    auth: {
      user: process.env.MAILERSEND_USERNAME, // Your MailerSend API Key as username
      pass: process.env.MAILERSEND_PASSWORD, // Your MailerSend API Key as password
    },
});

export const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.MAILERSEND_FROM_EMAIL,
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};
