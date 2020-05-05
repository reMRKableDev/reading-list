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
 * Implements POST
 * @method router.post
 * @param {string} path
 * @param {function} createNewBook
 */
router.post("/", createNewBook);

/**
 * Implements GET
 * @method router.get
 * @param {string} path
 * @param {function} readAllBooks
 */
router.get("/", readAllBooks);

/**
 * Implements GET
 * @method router.get
 * @param {string} path
 * @param {function} readOneBook
 */
router.get("/:id", readOneBook);

/**
 * Implements GET
 * @method router.get
 * @param {string} path
 * @param {function} readAllBooksInReadingList
 */
router.get("/readList/:id", readAllBooksInReadingList);

/**
 * Implements GET
 * @method router.get
 * @param {string} path
 * @param {function} updateBook
 */
router.put("/:id", updateBook);

/**
 * Implements GET
 * @method router.get
 * @param {string} path
 * @param {function} deleteBook
 */
router.delete("/:id", deleteBook);

/**
 * @module router
 */
module.exports = router;
