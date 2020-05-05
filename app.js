const express = require("express");
const morgan = require("morgan");
const { connector } = require("./database/models");

const readingListRouter = require("./routes/readingList.routes");
const booksRouter = require("./routes/books.routes");

const app = express();

connector
  .sync()
  .then(() => console.log("Creating tables for database"))
  .catch((err) => console.error(`Sync failed: ${err}`));

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/readList", readingListRouter);
app.use("/api/books", booksRouter);

module.exports = app;
