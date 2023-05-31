const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/contact-routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

//Middlewares
app.use("/contacts", router);

mongoose
  .connect(
    "mongodb+srv://naodhunde:naodhunde@cluster0.wkctxr9.mongodb.net/contactList?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB Atlas"))
  .then(() => {
    app.listen(4000, () => console.log("Server is running..."));
  })
  .catch((err) => console.log(err));
