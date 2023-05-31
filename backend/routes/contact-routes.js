const express = require("express");
const multer = require("multer");
const upload = multer();

const router = express.Router();

const Contact = require("../model/Contact");
const contactController = require("../controllers/contact-controller");

router.get("/", contactController.getAllContacts);
router.post("/", contactController.addContact);
router.post(
  "/import",
  upload.single("vCard"),
  contactController.importContacts
);
router.get("/:id", contactController.getContactById);
router.put("/:id", contactController.updateContact);
router.delete("/:id", contactController.deleteContact);

module.exports = router;
