/**
 * @const express                               Imports express dependency
 * @requires module:express
 *
 * @const morgan                                Imports morgan dependency
 * @requires module:morgan
 */
const express = require("express");
const morgan = require("morgan");

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
