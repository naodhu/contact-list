const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    email: { type: String, required: false },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
