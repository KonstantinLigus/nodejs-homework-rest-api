const express = require("express");

const contactsRouter = express.Router();

const { tryCatchWrapper } = require("../../helpers");

const {
  getContacts,
  getContactByID,
  postContact,
  deleteContact,
  putContact,
} = require("../../controllers/contacts.controllers");
const validationBody = require("../../middleware/validationBody");
const {
  schemaPostContact,
  schemaPutContact,
  schemaPatchContact,
} = require("../../schemas.joi/schema.joi");

contactsRouter.get("/", tryCatchWrapper(getContacts));

contactsRouter.get("/:contactId", tryCatchWrapper(getContactByID));

contactsRouter.post(
  "/",
  validationBody(schemaPostContact),
  tryCatchWrapper(postContact)
);

contactsRouter.delete("/:contactId", tryCatchWrapper(deleteContact));

contactsRouter.put(
  "/:contactId",
  validationBody(schemaPutContact),
  tryCatchWrapper(putContact)
);
contactsRouter.patch(
  "/:contactId/favorite",
  validationBody(schemaPatchContact),
  tryCatchWrapper(putContact)
);

module.exports = contactsRouter;
