/* IMPORT DEPENDENCIES */
const express = require("express");
const morgan = require("morgan");
const { connector } = require("./database/models");

/* IMPORT ROUTES */
const readingListRouter = require("./routes/readingList.routes");
const booksRouter = require("./routes/books.routes");

/* INSTANTIATE TO USE EXPRESS METHODS */
const app = express();

/* DATABASE CONNECTOR */
connector
  .sync()
  .then(() => console.log("Creating tables for database"))
  .catch((err) => console.error(`Sync failed: ${err}`));

/* MIDDLEWARE */
app.use(morgan("dev"));
app.use(express.json());

/* SETUP ROUTES */
app.use("/api/readList", readingListRouter);
app.use("/api/books", booksRouter);

module.exports = app;
