/**
 * @const express                               Imports express dependency
 * @requires module:express
 *
 * @const morgan                                Imports morgan dependency
 * @requires module:morgan
 *
 * @const connector                             Retrieves database connector
 * @type {Sequelize.model}
 */
const express = require("express");
const morgan = require("morgan");
const { connector } = require("./database/models");

/**
 * @const readingListRouter                     Declares route for readingList
 * @requires module:readingList.routes.js
 *
 * @const booksRouter                           Declares route for books
 * @requires module:books.routes.js
 */
const readingListRouter = require("./routes/readingList.routes");
const booksRouter = require("./routes/books.routes");

/**
 * @const app                                   Express app
 */
const app = express();

/**
 * Sync all defined models to the database.
 * @method connector.sync()
 * @returns {Promise}
 */
connector
  .sync()
  .then(() => console.log("Creating tables for database"))
  .catch((err) => console.error(`Sync failed: ${err}`));

/**
 * Mounts specified middleware function(s) at the specified path
 * @method app.use(*)
 */
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/readList", readingListRouter);
app.use("/api/books", booksRouter);

/**
 * @module app
 */
module.exports = app;
