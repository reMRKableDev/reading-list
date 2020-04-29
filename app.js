const express = require("express");
const morgan = require("morgan");
const { connector } = require("./database/models");

const readingListRouter = require("./routes/readingList.routes");

const app = express();

connector
  .sync()
  .then(() => console.log("Creating tables for database"))
  .catch((err) => console.error(`Sync failed: ${err}`));

/* MIDDLEWARE */
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/newList", readingListRouter);

module.exports = app;
