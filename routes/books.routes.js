const express = require("express");
const router = express.Router();

const {
  createNewBook,
  readAllBooks,
  readOneBook,
  readAllBooksInReadingList,
  updateBook,
  deleteBook,
} = require("../controllers/book.controllers");

router.post("/", createNewBook);

router.get("/", readAllBooks);

router.get("/:id", readOneBook);

router.get("/readList/:id", readAllBooksInReadingList);

router.put("/:id", updateBook);

router.delete("/:id", deleteBook);

module.exports = router;
