import React from "react";
import { AppBar, Typography, Toolbar, Tabs, Tab } from "@mui/material";
import ContactsIcon from "@mui/icons-material/Contacts";
import { NavLink } from "react-router-dom";

const Header = () => {
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
          >
            <Tab LinkComponent={NavLink} to="/contacts" label="Contacts" />
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
