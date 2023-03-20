require("dotenv").config();
const { PORT, SEND_GRID_EMAIL_API_KEY, EMAIL_FROM } = process.env;
const sgMail = require("@sendgrid/mail");

const USERS_BASE_URL = "https://phonebook-api-xnds.onrender.com";

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
      html: `<a href="http://${USERS_BASE_URL}/users/verify/${verificationToken}">Verify</a>`,
    };
    await sgMail.send(msg);
  } catch (error) {
    console.error("sendGridError", error);
  }
};

module.exports = { tryCatchWrapper, sendEmail };
