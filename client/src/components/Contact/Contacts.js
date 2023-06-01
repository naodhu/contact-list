import React, { useEffect, useState } from "react";
import axios from "axios";
import Contact from "./Contact";
import { Container, List, Button, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const URL = "http://localhost:4000/contacts";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setContacts(data.contacts));
  }, []);

  // this function will be called every time the user types in the search bar
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);

    if (e.target.value === "") {
      setFilteredContacts([]);
      return;
    }

    const lowerCaseSearchTerm = e.target.value.toLowerCase();

    const filtered = contacts.filter((contact) => {
      const lowerCaseFirstName = contact.firstName?.toLowerCase() || "";
      const lowerCaseLastName = contact.lastName?.toLowerCase() || "";
      const lowerCaseEmail = contact.email?.toLowerCase() || "";
      const phoneNumber = contact.phoneNumber || "";

      return (
        lowerCaseFirstName.includes(lowerCaseSearchTerm) ||
        lowerCaseLastName.includes(lowerCaseSearchTerm) ||
        lowerCaseEmail.includes(lowerCaseSearchTerm) ||
        phoneNumber.includes(e.target.value)
      );
    });

    setFilteredContacts(filtered.length > 0 ? filtered : []);
  };
  // this will display the filtered contacts if there are any, otherwise it will display all contacts
  const displayContacts =
    filteredContacts.length > 0 ? filteredContacts : contacts;

  return (
    <Container>
      <h1>Contact List</h1>
      <TextField
        onChange={handleSearch}
        fullWidth
        placeholder="Search for contact..."
        value={searchTerm}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        component={Link}
        to="/manageContacts"
      >
        New
      </Button>
      <List>
        {displayContacts.map((contact, i) => (
          <Contact key={i} contact={contact} />
        ))}
      </List>
    </Container>
  );
};

export default Contacts;
