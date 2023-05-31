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

const AddContact = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const handlChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history("/contacts"));
  };

  return (
    <Grid container direction="column" alignItems="center">
      <form style={{ width: "100%", maxWidth: 400 }} onSubmit={handleSubmit}>
        <FormLabel>First Name</FormLabel>
        <TextField
          value={inputs.firstName}
          onChange={handlChange}
          margin="normal"
          label="First Name"
          fullWidth
          variant="outlined"
          name="firstName"
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
        <FormLabel>Last Name</FormLabel>
        <TextField
          value={inputs.lastName}
          onChange={handlChange}
          margin="normal"
          label="Last Name"
          fullWidth
          variant="outlined"
          name="lastName"
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
        <FormLabel>Email</FormLabel>
        <TextField
          value={inputs.email}
          onChange={handlChange}
          margin="normal"
          label="Email"
          fullWidth
          variant="outlined"
          name="email"
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
        <FormLabel> Phone Number </FormLabel>
        <TextField
          value={inputs.phoneNumber}
          onChange={handlChange}
          type="tel"
          margin="normal"
          label="Phone Number"
          fullWidth
          variant="outlined"
          name="phoneNumber"
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
          color="primary"
          endIcon={<SendIcon />}
          style={{ marginTop: "1rem" }}
        >
          Add Contact
        </Button>
      </form>
    </Grid>
  );
};

export default AddContact;
