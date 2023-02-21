const express = require("express");
const authRouter = express.Router();
const { tryCatchWrapper } = require("../../helpers");
const validationBody = require("../../middleware/validationBody");
const { schemaReg, schemaLogIn } = require("../../schemas.joi/schema.joi.auth");
const { schemaEmail } = require("../../schemas.joi/schema.joi.email");
const {
  userRegistration,
  userLogin,
  userLogout,
  userCurrent,
  modifyUserAvatar,
  verifyUser,
  verifyUserRepeat,
} = require("../../controllers/auth.controllers");
const validationToken = require("../../middleware/validationToken");
const { upload } = require("../../middleware/UploadFile");

authRouter.post(
  "/signup",
  validationBody(schemaReg),
  tryCatchWrapper(userRegistration)
);
authRouter.post(
  "/login",
  validationBody(schemaLogIn),
  tryCatchWrapper(userLogin)
);
authRouter.get("/current", validationToken, tryCatchWrapper(userCurrent));
authRouter.post("/logout", validationToken, tryCatchWrapper(userLogout));
authRouter.patch(
  "/avatars",
  validationToken,
  tryCatchWrapper(upload.single("avatar")),
  tryCatchWrapper(modifyUserAvatar)
);
authRouter.get("/verify/:verificationToken", tryCatchWrapper(verifyUser));
authRouter.post(
  "/verify",
  validationBody(schemaEmail),
  tryCatchWrapper(verifyUserRepeat)
);
module.exports = authRouter;
