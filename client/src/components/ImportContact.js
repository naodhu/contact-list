import React, { useState } from "react";
import { Button, Typography, Grid, Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { useNavigate } from 'react-router-dom';  
import "./assets/styles/ImportContacts.css";

const ImportContacts = () => {
  const [selectedFile, setSelectedFile] = useState();
  const navigate = useNavigate(); // Use useHistory

  const submitFile = async () => {
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append("vCard", selectedFile);

      const response = await axios.post(
        "http://localhost:4000/contacts/import",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status < 400) {
        // Modified condition
        alert("Contacts imported successfully");
        navigate('/contacts'); // Navigate to contacts page
      } else {
        alert("Failed to import contacts");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className="import-container"
    >
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
          className="import-input-file"
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
