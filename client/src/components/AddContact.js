import React, { useState } from "react";
import {
  TextField,
  FormLabel,
  IconButton,
  InputAdornment,
  Grid,
  Button,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./assets/styles/AddContact.css"; // Import your CSS

const AddContact = () => {
  const history = useNavigate();

  // i used the useState hook to store the inputs from the form in the state of the component and then send them to the server
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // this function is used to send the request to the server to add a new contact to the database
  const sendRequest = async () => {
    axios
      .post("http://localhost:4000/contacts", {
        firstName: String(inputs.firstName),
        lastName: String(inputs.lastName),
        email: String(inputs.email),
        phoneNumber: String(inputs.phoneNumber),
      })
      .then((res) => res.data);
  };
  // this function is used to send the request to the server to add a new contact to the database and then redirect to the contacts page
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history("/contacts"));
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className="container"
    >
      <form className="form" onSubmit={handleSubmit}>
        <FormLabel className="form-label">First Name</FormLabel>
        <TextField
          value={inputs.firstName}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="firstName"
          className="input-field"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <PersonIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormLabel className="form-label">Last Name</FormLabel>
        <TextField
          value={inputs.lastName}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="lastName"
          className="input-field"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <PersonIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormLabel className="form-label">Email</FormLabel>
        <TextField
          value={inputs.email}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="email"
          className="input-field"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <EmailIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormLabel className="form-label">Phone Number</FormLabel>
        <TextField
          value={inputs.phoneNumber}
          onChange={handleChange}
          type="tel"
          margin="normal"
          fullWidth
          variant="outlined"
          name="phoneNumber"
          className="input-field"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <PhoneIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          style={{ backgroundColor: "#007bff" }}
          endIcon={<SendIcon />}
          className="button-submit"
        >
          Add Contact
        </Button>
      </form>
    </Grid>
  );
};

export default AddContact;
