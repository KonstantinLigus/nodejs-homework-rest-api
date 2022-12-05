const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

const { HOST_DB, PORT } = process.env;
async function main() {
  try {
    await mongoose.connect(HOST_DB);
    console.log("Database connection successful");

    app.listen(PORT, (error) => {
      if (error) {
        throw error;
      }
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}
main();
// -------
// 1. Make sure you have the prerequisites
// Our library requires Node.js version 0.10, 0.12, or 4.
// -------
// 2. Create an API key
// contactsKeyEmail = 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
// -------
// 3. Create an environment variable
// echo "export SENDGRID_API_KEY='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'" > sendgrid.env
// echo "sendgrid.env" >> .gitignore
// source ./sendgrid.env
// ------
// 4. Install the package
// npm install --save @sendgrid/mail
// ------
// 5. Send your first email
// The following is the minimum needed code to send an email:
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// javascript
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// const msg = {
//   to: 'test@example.com', // Change to your recipient
//   from: 'test@example.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })
