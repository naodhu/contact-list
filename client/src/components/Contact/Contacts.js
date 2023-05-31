import React, { useEffect, useState } from "react";
import axios from "axios";
import Contact from "./Contact";
import { Container, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);

    if (e.target.value === "") {
      setFilteredContacts([]);
      return;
    }

    const filtered = contacts.filter((contact) =>
      contact.firstName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredContacts(filtered);
  };

  const displayContacts =
    filteredContacts.length > 0 ? filteredContacts : contacts;

  return (
    <Container>
      <form style={{ width: "70%", margin: "auto" }}>
        <TextField
          onChange={handleSearch}
          fullWidth
          placeholder="Search by contact name..."
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
      </form>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {displayContacts.map((contact, i) => (
          <Contact key={i} contact={contact} />
        ))}
      </Box>
    </Container>
  );
};

export default Contacts;
