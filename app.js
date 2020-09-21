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
 * @const app                                   Express app
 */
const app = express();

/**
 * Mounts specified middleware function(s) at the specified path
 * @method app.use(*)
 */
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/readList", require("./routes/readingList.routes"));
app.use("/api/books", require("./routes/books.routes"));

/**
 * @module app
 */
module.exports = app;
