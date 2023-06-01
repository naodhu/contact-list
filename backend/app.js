require("dotenv").config();
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
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .then(() => {
    app.listen(4000, () => console.log("Server is running..."));
  })
  .catch((err) => console.log(err));
