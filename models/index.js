const Contact = require("./schemas/contacts");
const User = require("./schemas/users");

const listContacts = async (req) => {
  const contacts = await Contact.find({ owner: req.user._id });
  return contacts;
};
const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

const listFavoriteContacts = async (req) => {
  const contacts = await Contact.find({ owner: req.user._id, favorite: true });
  return contacts;
};

const removeContact = async (contactId) => {
  const deletedContact = await Contact.findByIdAndDelete(contactId);
  return deletedContact;
};

const addContact = async (contact) => {
  const newContact = await Contact.create(contact);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  return updatedContact;
};

// Auth

const addUser = async (user) => {
  const newUser = await User.create(user);
  return newUser;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};
const updateUser = async (id, body) => {
  const user = await User.findByIdAndUpdate(id, body, {
    new: true,
  });
  return user;
};
const getUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};
const getUserByVerificationToken = async (verificationToken) => {
  const user = await User.findOneAndUpdate(
    { verificationToken },
    { verificationToken: null, verify: true }
  );
  return user;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  addUser,
  getUserByEmail,
  updateUser,
  getUserById,
  getUserByVerificationToken,
  listFavoriteContacts,
};
