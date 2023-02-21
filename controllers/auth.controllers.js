const path = require("path");
const fs = require("fs/promises");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const { v4: uuid } = require("uuid");
const {
  addUser,
  getUserByEmail,
  updateUser,
  getUserByVerificationToken,
} = require("../models");
const { sendEmail } = require("../helpers");
require("dotenv").config();
const { PORT } = process.env;

const userRegistration = async (req, res, next) => {
  const { password, email } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  req.body.password = hashedPassword;
  req.body.avatarURL = gravatar.url(email);
  const verificationToken = uuid();
  req.body.verificationToken = verificationToken;
  try {
    const user = await addUser(req.body);
    // sendEmail({ email, verificationToken });
    res.status(201).json({
      user: {
        name: user.name,
        email: user.email,
        subscription: user.subscription,
      },
      token: verificationToken,
    });
  } catch (error) {
    console.log(error);
    error.status = 409;
    error.message = "Email in use";
    throw error;
  }
};

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const userFromDB = await getUserByEmail(email);
  if (!userFromDB) {
    const error = new Error("Email is wrong");
    error.status = 401;
    throw error;
  }
  const isComparedPasswordTheSame = await bcrypt.compare(
    password,
    userFromDB.password
  );
  if (!isComparedPasswordTheSame) {
    const error = new Error("Password is wrong");
    error.status = 401;
    throw error;
  }
  // if (!userFromDB.verify) {
  //   const error = new Error("The user's email was not verified");
  //   error.status = 401;
  //   throw error;
  // }

  const token = jwt.sign({ _id: userFromDB._id }, process.env.JWT_SECRET);
  await updateUser(userFromDB._id, { token });

  res.status(200).json({
    user: {
      name: userFromDB.name,
      email: userFromDB.email,
      subscription: userFromDB.subscription,
    },
    token,
  });
};

const userLogout = async (req, res, next) => {
  // проверка токена в предыдущем мидлваре
  let { _id, token } = req.user;
  token = null;
  const user = await updateUser(_id, { token });
  console.log(user);
  res.status(204).json();
};

const userCurrent = async (req, res, next) => {
  // проверка токена в предыдущем мидлваре
  const { name, email, subscription } = req.user;
  res.status(200).json({ name, email, subscription });
};

const modifyUserAvatar = async (req, res, next) => {
  const avatarFile = await Jimp.read(req.file.path);
  const fileName = uuid() + "." + avatarFile.getExtension();
  const newPath = path.join("public/avatars", fileName);
  avatarFile.resize(250, 250).write(newPath);
  await fs.unlink("tmp/" + req.file.filename);
  const avatarURL = `http://localhost:${PORT}/avatars/${fileName}`;
  const userFromBD = await updateUser(req.user._id, { avatarURL });
  res.status(200).json({ avatarURL: userFromBD.avatarURL });
};

const verifyUser = async (req, res, next) => {
  const userFromBD = await getUserByVerificationToken(
    req.params.verificationToken
  );
  if (!userFromBD) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }
  res.status(200).json({ message: "Verification successful" });
};

const verifyUserRepeat = async (req, res, next) => {
  const email = req.body.email;
  const userFromBD = await getUserByEmail(email);
  if (userFromBD.verify) {
    const error = new Error("Verification has already been passed");
    error.status = 400;
    throw error;
  }
  sendEmail({ email, verificationToken: userFromBD.verificationToken });
  res.status(200).json({ message: "Verification email sent" });
};
module.exports = {
  userRegistration,
  userLogin,
  userLogout,
  userCurrent,
  modifyUserAvatar,
  verifyUser,
  verifyUserRepeat,
};
