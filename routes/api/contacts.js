const express = require("express");

const contactsRouter = express.Router();

const { tryCatchWrapper } = require("../../helpers");

const {
  getContacts,
  getContactByID,
  postContact,
  deleteContact,
  patchContact,
  getFavoritesContacts,
} = require("../../controllers/contacts.controllers");
const validationBody = require("../../middleware/validationBody");
const {
  schemaPostContact,
  // schemaPutContact,
  schemaPatchContact,
} = require("../../schemas.joi/schema.joi");

contactsRouter.get("/", tryCatchWrapper(getContacts));

contactsRouter.get("/:contactId", tryCatchWrapper(getContactByID));

contactsRouter.get("/fetch/favorites", tryCatchWrapper(getFavoritesContacts));

contactsRouter.post(
  "/",
  validationBody(schemaPostContact),
  tryCatchWrapper(postContact)
);

contactsRouter.delete("/:contactId", tryCatchWrapper(deleteContact));

contactsRouter.patch(
  "/:contactId",
  validationBody(schemaPatchContact),
  tryCatchWrapper(patchContact)
);
// contactsRouter.patch(
//   "/:contactId/favorite",
//   validationBody(schemaPatchContact),
//   tryCatchWrapper(patchContact)
// );

module.exports = contactsRouter;
