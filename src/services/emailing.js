const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const smtpConfig = require("../config/smtp");

const transport = nodemailer.createTransport(
  smtpTransport({
    host: smtpConfig.SMTP_HOST,
    port: smtpConfig.SMTP_PORT,
    secure: true,
    auth: {
      user: smtpConfig.SMTP_EMAIL,
      pass: smtpConfig.SMTP_PASSWORD,
    },
  })
);

const send = (to, subject, text) => {
  const message = {
    from: `${process.env.APP_NAME} <${smtpConfig.SMTP_EMAIL}>`,
    to,
    subject,
    text,
  };

  return new Promise((resolve, reject) => {
    transport.sendMail(message, (err, info) => {
      if (err) {
        reject(Error("Sending email error"));
      } else {
        resolve(info);
      }
    });
  });
};

module.exports = {
  send,
};
