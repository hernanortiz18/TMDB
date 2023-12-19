const { transporter } = require("../config/mailer");
const url = "http://localhost:5173/change-pass";

const recoverPass = (email) => {
  return new Promise((resolve, reject) => {
    transporter
      .sendMail({
        from: `HMO - TMDB <hmo.tmdb@gmail.com>`,
        to: email,
        subject: `Recover e-mail`,
        html: `<p> To change your password and recover your account, please click on the following link: <a href="${url}">RECOVER ACCOUNT</a></p>`,
      })
      .then(() => {
        console.log("E-mail sent");
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

module.exports = { recoverPass };
