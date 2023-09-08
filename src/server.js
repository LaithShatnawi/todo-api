"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const authRouter = require("./auth/routes");

// App Level MW
app.use(cors());
app.use(express.json());

// Routes
app.use(authRouter);


app.get("/", (req, res) => {
  res.status(200).send("Welcome to the ToDo API!");
});

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
