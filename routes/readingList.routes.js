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
 * @function createNewReadingList             Creates new reading list entity
 * @function readAllReadingLists              Reads all reading list entities
 * @function readOneReadingList               Reads one reading list entity
 * @function updateReadingList                Reads all reading list entities in a reading list
 * @function deleteReadingList                Updates a reading list entity
 */
const {
  createNewReadingList,
  readAllReadingLists,
  readOneReadingList,
  updateReadingList,
  deleteReadingList,
} = require("../controllers/readingList.controllers");

/**
 * Implements POST
 * @method router.post
 * @param {string} path
 * @param {function} createNewReadingList
 */
router.post("/", createNewReadingList);

/**
 * Implements GET
 * @method router.get
 * @param {string} path
 * @param {function} readAllReadingLists
 */
router.get("/", readAllReadingLists);

/**
 * Implements GET
 * @method router.get
 * @param {string} path
 * @param {function} readOneReadingList
 */
router.get("/:id", readOneReadingList);

/**
 * Implements PUT
 * @method router.get
 * @param {string} path
 * @param {function} updateReadingList
 */
router.put("/:id", updateReadingList);

/**
 * Implements DELETE
 * @method router.get
 * @param {string} path
 * @param {function} deleteBook
 */
router.delete("/:id", deleteReadingList);

/**
 * @module router
 */
module.exports = router;
