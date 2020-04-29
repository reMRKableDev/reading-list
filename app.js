/* IMPORT DEPENDENCIES */
const express = require("express");
const morgan = require("morgan");
const { connector } = require("./database/models");

/* IMPORT ROUTES */
const readingListRouter = require("./routes/readingList.routes");

/* INSTANTIATE TO USE EXPRESS METHODS */
const app = express();

/* DATABASE CONNECTOR */
connector
  .sync()
  .then(() => console.log("Creating tables for database"))
  .catch((err) => console.error(`Sync failed: ${err}`));

/* MIDDLEWARE */
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* SETUP ROUTES */
app.use("/api/newList", readingListRouter);

module.exports = app;
