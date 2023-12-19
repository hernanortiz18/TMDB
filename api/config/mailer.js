const nodemailer = require("nodemailer");
require("dotenv").config();

const mailerHost = process.env.MAILER_HOST;
const mailerUser = process.env.MAILER_USER;
const mailerPass = process.env.MAILER_PASS;

const transporter = nodemailer.createTransport({
  host: mailerHost,
  port: 465,
  secure: true,
  auth: {
    user: mailerUser,
    pass: mailerPass,
  },
});

transporter.verify().then(() => {
  console.log("Ready for send mail");
});

module.exports = { transporter };
