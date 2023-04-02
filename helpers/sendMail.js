const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const {SENDGRID_API_KEY} = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (data) => {
  const mail = {...data, from: 'serhiimatiiv@gmail.com'};
  try {
    await sgMail.send(mail);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendMail;

// const mail = {
//   to: "test@mail.com",
//   from: "serhiimatiiv@gmail.com",
//   subject: "New letter 💌",
//   html: "<p>New letter you got 💌</p>",
// };

// sendMail
//   .send(mail)
//   .then(() => console.log("Mail send successfully"))
//   .catch((error) => console.log(error.message));

//
//
//
//
//

// const nodemailer = require("nodemailer");

// const { META_PASSWORD } = process.env;

// const nodemailerConfig = {
//   host: "smtp.meta.ua",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "developer333@meta.ua",
//     pass: META_PASSWORD,
//   },
// };

// const transport = nodemailer.createTransport(nodemailerConfig);

// const mail = {
//   to: "test@mail.com",
//   from: "developer333@meta.ua",
//   subject: "New letter 💌",
//   html: "<p>New letter you got 💌</p>",
// };

// transport
//   .sendMail(mail)
//   .then(() => console.log("Mail send successfully"))
//   .catch((error) => console.log(error.message));
