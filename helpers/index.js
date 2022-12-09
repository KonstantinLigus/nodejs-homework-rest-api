require("dotenv").config();
const { PORT, EMAIL_API_KEY, EMAIL_FROM } = process.env;
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
  sgMail.setApiKey(EMAIL_API_KEY);
  const msg = {
    to: email,
    from: EMAIL_FROM,
    subject: "User verificaton",
    html: `<a href="http://localhost:${PORT}/api/users/verify/${verificationToken}">Verify</a>`,
  };
  await sgMail.send(msg);
};

module.exports = { tryCatchWrapper, sendEmail };
