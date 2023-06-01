const Contact = require("../model/Contact");
const multer = require("multer");
const vCardParser = require("vcf");
const upload = multer();

const getAllContacts = async (req, res, next) => {
  let contacts;
  try {
    contacts = await Contact.find();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error retrieving contacts" });
  }
  if (!contacts) {
    return res.status(404).json({ message: "Could not find contacts" });
  }
  return res.status(200).json({ contacts });
};

const getContactById = async (req, res, next) => {
  const id = req.params.id;
  let contact;
  try {
    contact = await Contact.findById(id);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error retrieving contact" });
  }
  if (!contact) {
    return res.status(404).json({ message: "Could not find contact" });
  }
  return res.status(200).json({ contact });
};

const addContact = async (req, res, next) => {
  const { firstName, lastName, phoneNumber, email } = req.body;

  let contact;
  try {
    contact = new Contact({
      firstName,
      lastName,
      phoneNumber,
      email,
    });
    await contact.save();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error adding contact" });
  }

  return res.status(200).json({ contact });
};

const updateContact = async (req, res, next) => {
  const id = req.params.id;
  const { firstName, lastName, phoneNumber, email } = req.body;

  let contact;
  try {
    contact = await Contact.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        phoneNumber,
        email,
      },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ message: "Could not find contact" });
    }
    return res.status(200).json({ contact });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating contact" });
  }
};

const deleteContact = async (req, res, next) => {
  const id = req.params.id;

  let contact;
  try {
    contact = await Contact.findByIdAndRemove(id);
    if (!contact) {
      return res.status(404).json({ message: "Could not find contact" });
    }
    return res.status(200).json({ message: "Contact deleted", contact });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error deleting contact" });
  }
};

// Importing contacts function
const importContacts = async (req, res, next) => {
  // check if the file exists
  if (!req.file) {
    return res.status(400).json({ message: "No file received" });
  }

  // Convert the buffer to a string
  const fileContent = req.file.buffer.toString("utf8");

  let vCards;

  // Parse the vCard
  try {
    vCards = vCardParser.parse(fileContent, "utf8");
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: `Failed to parse vCard. Error: ${err.message}` });
  }

  // Loop over each vCard
  for (const vCard of vCards) {
    // Get contact details
    const firstName = vCard.get("n").valueOf().split(";")[1];
    const lastName = vCard.get("n").valueOf().split(";")[0];
    let phoneNumber = vCard.get("tel");
    if (Array.isArray(phoneNumber)) {
      phoneNumber = phoneNumber[0].valueOf();
    } else {
      phoneNumber = phoneNumber ? phoneNumber.valueOf() : null;
    }
    const email = vCard.get("email") ? vCard.get("email").valueOf() : null;

    // Create a new contact
    const contact = new Contact({
      firstName,
      lastName,
      phoneNumber,
      email,
    });

    // Save the contact
    try {
      await contact.save();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to import contact." });
    }
  }

  return res.status(201).json({ message: "Contacts imported successfully." });
};

exports.getAllContacts = getAllContacts;
exports.getContactById = getContactById;
exports.addContact = addContact;
exports.updateContact = updateContact;
exports.deleteContact = deleteContact;
exports.importContacts = importContacts;
