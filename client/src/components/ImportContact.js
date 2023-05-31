// ImportContacts.js

import React, { useState } from "react";
import { Button, Typography, Grid, Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios"; // Import axios
import "./assets/styles/ImportContacts.css";

const ImportContacts = () => {
  const [selectedFile, setSelectedFile] = useState();

  const submitFile = async () => {
    if (!selectedFile) return;

    try {
      const vCardString = await readFileAsync(selectedFile);
      const formData = new FormData();
      formData.append("vCard", vCardString);

      const response = await axios.post(
        "http://localhost:4000/contacts/import",
        formData
      );

      if (response.status === 200) {
        alert("Contacts imported successfully");
      } else {
        alert("Failed to import contacts");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.onerror = (event) => {
        reject(new Error("Error reading file"));
      };

      reader.readAsText(file);
    });
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Typography variant="h5" gutterBottom className="import-title">
        Import Contacts from vCard
      </Typography>
      <Box className="file-input-container">
        <input
          accept=".vcf"
          style={{ display: "none" }}
          id="contained-button-file"
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="outlined"
            component="span"
            startIcon={<CloudUploadIcon />}
            className="choose-file-button"
          >
            Choose File
          </Button>
        </label>
      </Box>
      {selectedFile && (
        <Typography color="textSecondary" className="selected-file">
          {selectedFile.name}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={submitFile}
        className="import-button"
      >
        Import
      </Button>
    </Grid>
  );
};

export default ImportContacts;
