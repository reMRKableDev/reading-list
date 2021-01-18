const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/readList", require("./routes/readingList.routes"));
app.use("/api/books", require("./routes/books.routes"));

module.exports = app;
