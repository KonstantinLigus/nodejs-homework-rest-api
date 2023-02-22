const mongoose = require("mongoose");

const contact = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  phone: {
    type: String,
    required: [true, "Set phone for contact"],
  },
  email: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const Contact = mongoose.model("contact", contact);

module.exports = Contact;
