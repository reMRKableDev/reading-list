/**
 * @const express                             Imports express dependency
 * @requires module:express
 */
const express = require("express");

/**
 * Creates a new router object
 * @method express.Router
 * @const router
 */
const router = express.Router();

/**
 * @const {Object} book.controllers.js        Controllers
 * @function createNewBook                    Creates new book entity
 * @function readAllBooks                     Reads all book entities
 * @function readOneBook                      Reads one book entity
 * @function readAllBooksInReadingList        Reads all book entities in a reading list
 * @function updateBook                       Updates a book entity
 * @function deleteBook                       Delete a book entity
 */
const {
  createNewBook,
  readAllBooks,
  readOneBook,
  readAllBooksInReadingList,
  updateBook,
  deleteBook,
} = require("../controllers/book.controllers");

/**
 * 
 */

router.post("/", createNewBook);

router.get("/", readAllBooks);

router.get("/:id", readOneBook);

router.get("/readList/:id", readAllBooksInReadingList);

router.put("/:id", updateBook);

router.delete("/:id", deleteBook);

module.exports = router;
