import React, { useState } from "react";
import { AppBar, Typography, Toolbar, Tabs, Tab } from "@mui/material";
import ContactsIcon from "@mui/icons-material/Contacts";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [value, setValue] = useState();

  return (
    <div>
      <AppBar sx={{ background: "#232F3D" }} position="static">
        <Toolbar>
          <Typography>
            <ContactsIcon />
          </Typography>
          <Tabs
            sx={{ ml: "auto" }}
            textColor="inherit"
            indicatorColor="secondary"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab LinkComponent={NavLink} to="/contacts" label="Contacts" />
            <Tab
              LinkComponent={NavLink}
              to="/manageContacts"
              label="Add/Import Contacts"
            />
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
