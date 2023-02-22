require("dotenv").config();
const { PORT, SEND_GRID_EMAIL_API_KEY, EMAIL_FROM } = process.env;
const sgMail = require("@sendgrid/mail");

const tryCatchWrapper = (callback) => {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

const sendEmail = async ({ email, verificationToken }) => {
  try {
    sgMail.setApiKey(SEND_GRID_EMAIL_API_KEY);
    const msg = {
      to: email,
      from: EMAIL_FROM,
      subject: "User verificaton",
      html: `<a href="http://localhost:${PORT}/users/verify/${verificationToken}">Verify</a>`,
    };
    await sgMail.send(msg);
  } catch (error) {
    console.error("sendGridError", error);
  }
};

module.exports = { tryCatchWrapper, sendEmail };
// kostya1989com@gmail.com
// kostya12345
