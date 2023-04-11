const nodemailer = require("nodemailer");
const { GMAIL, GMAIL_PASS } = require("../configs/mail.config");

module.exports = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: GMAIL,
    pass: GMAIL_PASS,
  },
});
