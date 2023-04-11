const cron = require("node-cron");
const mailGenerator = require("../utils/mailGenearator");
const User = require("../models/user.model");
const EmailTransporter = require("../notifier/emailService");
const constants = require("../utils/constants");
const { GMAIL } = require("../configs/mail.config");

cron.schedule("*/30 * * * * *", async () => {
  /**
   * Logic inside this to search the db every 30 seconds and send the emails for any new request
   */

  const users = await User.find({
    sentWelcomeEmailStatus: constants.mailStatus.unsent,
  });

  console.log(users.length);

  users.forEach((user) => {
    const emailBody = {
      body: {
        name: user.name,
        intro: "Welcome to Heylack! We are excited to have you on board.",
        action: {
          instructions: "To get started with Heylack, please click here:",
          button: {
            color: "#22BC66",
            text: "Confirm your account",
            link: "https://twitter.com/Hey_lack",
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    const message = {
      from: GMAIL,
      to: user.email,
      subject: "Welcome to Heylack",
      text: mailGenerator.generatePlaintext(emailBody),
      html: mailGenerator.generate(emailBody),
    };

    EmailTransporter.sendMail(message, async function (err, info) {
      if (err) {
        console.log(err.message);
      } else {
        console.log({
          info: info.messageId,
        });

        //Update the DB
        user.sentWelcomeEmailStatus = constants.mailStatus.sent;
        await user.save();
      }
    });
  });
});
