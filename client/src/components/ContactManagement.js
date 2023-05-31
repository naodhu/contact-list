import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import AddContact from "./AddContact";
import ImportContacts from "./ImportContact";
import "./assets/styles/ContactManagement.css";

const ContactManagement = () => {
  return (
    <Box mt={8} className="contact-management-container">
      <Grid container direction="column" alignItems="center" spacing={4}>
        <Typography variant="h4" gutterBottom className="section-title">
          Add or Import Contacts
        </Typography>
        <Typography variant="body1" gutterBottom className="section-description">
          You can either manually add a new contact by filling out the form
          below, or you can automatically import contacts from a vCard file.
        </Typography>
        <Grid item xs={12}>
          <AddContact />
        </Grid>
        <Grid item xs={12}>
          <ImportContacts />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactManagement;
