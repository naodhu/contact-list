import React from "react";
import { ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import "./Contact.css";

const Contact = ({ contact }) => {
  const { _id, firstName, lastName } = contact;

  return (
    <ListItem component={Link} to={`/contacts/${_id}`} className="contact-item">
      <ListItemText
        primary={`${firstName} ${lastName}`}
        className="contact-name"
      />
    </ListItem>
  );
};

export default Contact;
