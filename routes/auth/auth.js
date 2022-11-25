const express = require("express");
const authRouter = express.Router();
const tryCatchWrapper = require("../../helpers");
const validationBody = require("../../middleware/validationBody");
const { schemaReg } = require("../../schemas.joi/schema.joi.auth");
const {
  userRegistration,
  userLogin,
  userLogout,
  userCurrent,
  modifyUserAvatar,
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
  validationBody(schemaReg),
  tryCatchWrapper(userLogin)
);
authRouter.post("/current", validationToken, tryCatchWrapper(userCurrent));
authRouter.post("/logout", validationToken, tryCatchWrapper(userLogout));
authRouter.patch(
  "/avatars",
  validationToken,
  tryCatchWrapper(upload.single("avatar")),
  tryCatchWrapper(modifyUserAvatar)
);

module.exports = authRouter;
