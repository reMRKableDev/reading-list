/**
 * Database & model imports.
 *
 * @const db                                 Database connector.
 * @const book                               Model for table books in the database.
 * @const readingList                        Model for table reading_lists in the database.
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
 * @const findOneBook                        Implements READ (FOR JUST ONE).
 * @const updateBook                         Implements UPDATE.
 * @const deleteBook                         Implements DELETE.
 */
const findOrCreateBook = require("../helpers/crudOperations/findOrCreate.helper");
const findAllBooks = require("../helpers/crudOperations/findAll.helper");
const findOneBook = require("../helpers/crudOperations/findOne.helper");
const updateBook = require("../helpers/crudOperations/update.helper");
const deleteBook = require("../helpers/crudOperations/destroy.helper");

/**
 * Controllers for reading list.
 * @module books/controllers
 */
module.exports = {
  /**
   * @function createNewBook                 Takes in request object, runs validations, and sends back response.
   * @param {object} req                     Client request.
   * @param {object} res                     Server response.
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
   * @param {object} req                     Client request.
   * @param {object} res                     Server response.
   */
  readAllBooks: (_req, res) => {
    findAllBooks(res, book, {
      message: "There are no books saved at this moment!",
    });
  },

  /**
   * @function readOneBook                   Takes in request value, runs validations, and returns data from one row from table in database.
   * @param {object} req                     Client request.
   * @param {object} res                     Server response.
   */
  readOneBook: (req, res) =>
    isNotNumber(req.params.id)
      ? res.status(400).send({ message: "The given id was not a number!" })
      : findOneBook(req, res, book, { message: "Couldn't find that book!" }),

  /**
   * @function readAllBooksInReadingList     Takes in request value, runs validations, and returns data from one row from table in database.
   * @param {object} req                     Client request.
   * @param {object} res                     Server response.
   */
  readAllBooksInReadingList: (req, res) => {
    if (isNotNumber(req.params.id)) {
      res.status(400).send({ message: "The given id was not a number!" });
    } else {
      book
        .findAll({ where: { readingListId: req.params.id } })
        .then((results) => {
          const dataValues = results.map((element) => element.dataValues);

          return dataValues.length > 0
            ? res.status(200).send(dataValues)
            : res.status(200).send({
                message:
                  "There are no books connected to this reading list at this moment!",
              });
        })
        .catch((findAllErr) => {
          if (findAllErr) {
            console.error(`Error when finding: ${findAllErr}`);

            res.status(500).send({
              message:
                "Sorry! We are currently having server difficulties. Try again later",
            });
          }
        });
    }
  },

  /**
   * @function updateBook             Takes in request value, runs validations, and updates a row in table.
   * @param {object} req              Client request.
   * @param {object} res              Server response.
   */
  updateBook: (req, res) => {
    const incomingData = req.body;

    isObjectEmpty(incomingData) &&
      res.status(400).send({ message: "Object cannot be empty" });

    if (isObjectPropertyEmpty(incomingData)) {
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

      incomingData.title &&
        updateBook(
          req,
          res,
          updateTitleValue,
          book,
          okMessage,
          notFoundMessage
        );

      incomingData.author &&
        updateBook(
          req,
          res,
          updateAuthorValue,
          book,
          okMessage,
          notFoundMessage
        );

      incomingData.readingListId &&
        readingList
          .findOne({ where: { id: incomingData.readingListId } })
          .then((results) => {
            if (results === null) {
              res
                .status(404)
                .send({ message: "the readingListId does not exist" });
            } else {
              updateBook(
                req,
                res,
                updateReadingListIdValue,
                book,
                okMessage,
                notFoundMessage
              );
            }
          })
          .catch((findErr) => {
            if (findErr) {
              console.error(`Error when updating: ${findErr}`);

              res.status(500).send({
                message:
                  "Sorry! We are currently having server difficulties. Try again later",
              });
            }
          });
    }
  },

  /**
   * @function deleteBook             Takes in request value, runs validations, and deletes a row in table.
   * @param {object} req              Client request.
   * @param {object} res              Server response.
   */
  deleteBook: (req, res) => {
    const okMessage = { message: "The book has been deleted" };
    const notFoundMessage = { message: "Couldn't find that book" };

    return isNotNumber(req.params.id)
      ? res.status(400).send({ message: "The given id was not a number!" })
      : deleteBook(req, res, book, okMessage, notFoundMessage);
  },
};
