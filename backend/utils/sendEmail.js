const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transpoter = nodemailer.createTransport({
    service: process.env.SMPT_SERVICE,
    auth: {
      user: user.process.env.SMPT_MAIL,
      pass: user.process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    message: options.message,
  };

  await transpoter.sendMail(mailOptions);
};

module.exports = sendEmail;
