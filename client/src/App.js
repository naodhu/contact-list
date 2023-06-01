import React from "react";
import Header from "./components/Header.js";
import { Routes, Route } from "react-router-dom";
// import Home from "./components/Home.js";
import Contacts from "./components/Contact/Contacts.js";
import ContactManagement from "./components/ContactManagement.js";
import ContactDetail from "./components/Contact/ContactDetail.js";

function App() {
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {/* <Route path="/" element={<Home />} exact /> */}
          <Route path="/contacts" element={<Contacts />} exact />
          <Route path="/manageContacts" element={<ContactManagement />} exact />
          <Route path="/contacts/:id" element={<ContactDetail />} exact />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
