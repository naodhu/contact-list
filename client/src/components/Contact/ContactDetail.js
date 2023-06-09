import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { FormControl } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

const ContactDetail = () => {
  const [inputs, setInputs] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();

  // this useEffect is used to fetch the contact with the id from the url
  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        // fetch the contact with the id from the url
        .get(`http://localhost:4000/contacts/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.contact));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    // update function
    await axios
      .put(`http://localhost:4000/contacts/${id}`, {
        firstName: String(inputs.firstName),
        lastName: String(inputs.lastName),
        email: String(inputs.email),
        phoneNumber: String(inputs.phoneNumber),
      })
      .then((res) => res.data);
  };

  const deleteHandler = async () => {
    // delete function
    await axios
      .delete(`http://localhost:4000/contacts/${id}`)
      .then((res) => res.data)
      .then(() => navigate("/"))
      .then(() => navigate("/"));
  };

  const handleSubmit = (e) => {
    // submit function
    e.preventDefault();
    sendRequest().then(() => navigate("/"));
  };

  // this function handles the change of the input fields
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box sx={{ flexGrow: 1, m: 4 }}>
            <Grid container spacing={3} direction="column">
              <FormControl fullWidth margin="normal">
                <TextField
                  value={inputs.firstName || ""}
                  onChange={handleChange}
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  value={inputs.lastName || ""}
                  onChange={handleChange}
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  value={inputs.email || ""}
                  onChange={handleChange}
                  name="email"
                  label="Email"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  value={inputs.phoneNumber || ""}
                  onChange={handleChange}
                  type="tel"
                  name="phoneNumber"
                  label="Phone Number"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={handleSubmit}
                sx={{ mt: 2 }}
              >
                Update Contact
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={deleteHandler}
                sx={{ mt: 2 }}
              >
                Delete Contact
              </Button>
            </Grid>
          </Box>
        </form>
      )}
    </div>
  );
};

export default ContactDetail;
