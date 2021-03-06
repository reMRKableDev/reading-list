/**
 * Database & model imports.
 *
 * @const db                                 Database connector.
 * @requires module:db.config.js
 *
 * @const book                               Model for table books in the database.
 * @type {Sequelize.model}
 *
 * @const readingList                        Model for table reading_lists in the database.
 * @type {Sequelize.model}
 *
 */
const db = require("../database/models");

const { book } = db;
const { readingList } = db;

/**
 * Helper functions for validating incoming request values.
 *
 * @const isObjectEmpty                      Checks if incoming object is empty.
 * @const isObjectPropertyEmpty              Checks if any of the properties of incoming object are empty / null.
 * @const isNotNumber                        Checks if incoming value is not a number.
 */
const isObjectEmpty = require("../helpers/requestValidators/isObjectEmpty.helper");
const isObjectPropertyEmpty = require("../helpers/requestValidators/isObjectPropertyEmpty.helper");
const isNotNumber = require("../helpers/requestValidators/isNotNumber.helper");

/**
 * Helper functions for handling / implementing Sequelize methods.
 *
 * @const findOrCreateBook                   Implements CREATE.
 * @const findAllBooks                       Implements READ.
 * @const findAllBooksInReadingList          Implements READ (FOR ALL BOOKS IN A READING LIST).
 * @const findOneBook                        Implements READ (FOR JUST ONE).
 * @const updateBook                         Implements UPDATE.
 * @const updateBookReadingListId            Implements UPDATE (FOR A BOOK'S FOREIGN KEY).
 * @const deleteBook                         Implements DELETE.
 */
const findOrCreateBook = require("../helpers/crudOperations/findOrCreate.helper");
const findAllBooks = require("../helpers/crudOperations/findAll.helper");
const findAllBooksInReadingList = require("../helpers/crudOperations/findAllBooksInReadingList.helper");
const findOneBook = require("../helpers/crudOperations/findOne.helper");
const updateBook = require("../helpers/crudOperations/update.helper");
const updateBookReadingListId = require("../helpers/crudOperations/updateBookReadingListId.helper");
const deleteBook = require("../helpers/crudOperations/destroy.helper");

/**
 * Controllers for reading list.
 * @module books/controllers
 */
module.exports = {
  /**
   * @function createNewBook                 Takes in request object, runs validations, and sends back response.
   * @param {express.Request} req            Client request.
   * @param {express.Response} res           Server response.
   */
  createNewBook: (req, res) => {
    const incomingData = req.body;

    if (isObjectEmpty(incomingData)) {
      res.status(400).send({ message: "Object cannot be empty" });
    } else if (isObjectPropertyEmpty(incomingData)) {
      res.status(400).send({ message: "Please fill in all the fields" });
    } else {
      findOrCreateBook(res, incomingData, book, {
        message: "A book with this title already exists",
      });
    }
  },

  /**
   * @function readAllBooks                  Retrieves all data from table in database.
   * @param {express.Request} req            Client request.
   * @param {express.Response} res           Server response.
   */
  readAllBooks: (_req, res) => {
    findAllBooks(res, book, {
      message: "There are no books saved at this moment!",
    });
  },

  /**
   * @function readOneBook                   Takes in request value, runs validations, and returns data from one row from table in database.
   * @param {express.Request} req            Client request.
   * @param {express.Response} res           Server response.
   */
  readOneBook: (req, res) =>
    isNotNumber(req.params.id)
      ? res.status(400).send({
          message: "The given id was not a number! Please use a number",
        })
      : findOneBook(req, res, book, { message: "Couldn't find that book!" }),

  /**
   * @function readAllBooksInReadingList     Takes in request value, runs validations, and returns data from one row from table in database.
   * @param {express.Request} req            Client request.
   * @param {express.Response} res           Server response.
   */
  readAllBooksInReadingList: (req, res) => {
    isNotNumber(req.params.id)
      ? res.status(400).send({
          message: "The given id was not a number! Please use a number",
        })
      : findAllBooksInReadingList(req, res, book);
  },

  /**
   * @function updateBook                    Takes in request value, runs validations, and updates a row in table.
   * @param {express.Request} req            Client request.
   * @param {express.Response} res           Server response.
   */
  updateBook: (req, res) => {
    const incomingData = req.body;

    if (isObjectEmpty(incomingData)) {
      res.status(400).send({ message: "Object cannot be empty" });
    } else if (isObjectPropertyEmpty(incomingData)) {
      res.status(400).send({ message: "Please fill in all the fields" });
    } else if (isNotNumber(req.params.id)) {
      res.status(400).send({
        message: "The given id was not a number! Please use a number",
      });
    } else {
      const okMessage = { message: "The book has been updated" };
      const notFoundMessage = { message: "Couldn't find that book" };
      const updateTitleValue = { title: incomingData.title };
      const updateAuthorValue = { author: incomingData.author };
      const updateReadingListIdValue = {
        readingListId: incomingData.readingListId,
      };

      if (incomingData.title) {
        updateBook(
          req,
          res,
          updateTitleValue,
          book,
          okMessage,
          notFoundMessage
        );
      } else if (incomingData.author) {
        updateBook(
          req,
          res,
          updateAuthorValue,
          book,
          okMessage,
          notFoundMessage
        );
      } else {
        updateBookReadingListId(
          req,
          res,
          incomingData.readingListId,
          updateReadingListIdValue,
          readingList,
          book,
          okMessage,
          notFoundMessage
        );
      }
    }
  },

  /**
   * @function deleteBook             Takes in request value, runs validations, and deletes a row in table.
   * @param {express.Request} req            Client request.
   * @param {express.Response} res           Server response.
   */
  deleteBook: (req, res) => {
    const okMessage = { message: "The book has been deleted" };
    const notFoundMessage = { message: "Couldn't find that book" };

    return isNotNumber(req.params.id)
      ? res.status(400).send({
          message: "The given id was not a number! Please use a number",
        })
      : deleteBook(req, res, book, okMessage, notFoundMessage);
  },
};
