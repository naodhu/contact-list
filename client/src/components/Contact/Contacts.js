import React, { useEffect, useState } from "react";
import axios from "axios";
import Contact from "./Contact";
import { Container, List, Button, TextField, Fade } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { styled } from "@mui/system";

const CustomAlert = styled(Alert)({
  backgroundColor: "#f0f0f0",
  color: "#333",
});

const URL = "http://localhost:4000/contacts";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => {
      console.log(data.contacts);
      // Sort the contacts by first name
      const sortedContacts = data.contacts.sort((a, b) =>
        a.firstName.localeCompare(b.firstName)
      );
      setContacts(sortedContacts);
    });
  }, []);

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

  // If there are filtered contacts display them, if not display all contacts
  const displayContacts =
    searchTerm && filteredContacts.length === 0
      ? [
          <Fade in={true} key="0">
            <CustomAlert icon={<InfoOutlinedIcon fontSize="inherit" />}>
              <AlertTitle>Search Result</AlertTitle>
              No contacts found with this search term
            </CustomAlert>
          </Fade>,
        ]
      : filteredContacts.length > 0
      ? filteredContacts
      : contacts;

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
        {displayContacts.map((item) =>
          item.hasOwnProperty("firstName") ? (
            <Contact key={item._id.$oid} contact={item} />
          ) : (
            item
          )
        )}
      </List>
    </Container>
  );
};

export default Contacts;
