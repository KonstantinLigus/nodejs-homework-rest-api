const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  listFavoriteContacts,
} = require("../models");

const getContacts = async (req, res, next) => {
  const contacts = await listContacts(req);
  res.status(200).json(contacts);
};
const getContactByID = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(
      contactId
    ); /* выбросит ошибку если contactId не валиден, вернет null, если валидный contactId не найден */
    if (!contact) {
      throw new Error("contact's id is not found");
    }
    res.status(200).json({ contact });
  } catch (error) {
    error.status = 404;
    throw error;
  }
};
const getFavoritesContacts = async (req, res, next) => {
  const contacts = await listFavoriteContacts(req);
  res.status(200).json(contacts);
};
const postContact = async (req, res, next) => {
  const { id } = req.user;
  const newContact = { ...req.body, owner: id };
  const createdContact = await addContact(newContact);
  res.status(201).json({ createdContact });
};
const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const deletedContact = await removeContact(
      contactId
    ); /* выбросит ошибку если contactId не валиден, вернет null, если валидный contactId не найден */
    if (!deletedContact) {
      throw new Error("contact's id is not found");
    }
    res.status(200).json({ deletedContact, message: "contact deleted" });
  } catch (error) {
    error.status = 404;
    throw error;
  }
};
const patchContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const updatedContact = await updateContact(
      contactId,
      req.body
    ); /* выбросит ошибку если contactId не валиден, вернет null, если валидный contactId не найден */
    if (!updatedContact) {
      throw new Error("contact's id is not found");
    }
    res.status(200).json({ updatedContact });
  } catch (error) {
    error.status = 404;
    throw error;
  }
};

module.exports = {
  getContacts,
  getContactByID,
  postContact,
  deleteContact,
  patchContact,
  getFavoritesContacts,
};
