/**
 * Database & model imports.
 *
 * @const db                        Database connector.
 * @const readingList               Model for table reading_lists in the database.
 */

const db = require("../database/models");
const readingList = db.readingList;

/**
 * Helper functions for validating incoming request values.
 *
 * @const isObjectEmpty             Checks if incoming object is empty.
 * @const isObjectPropertyEmpty     Checks if any of the properties of incoming object are empty / null.
 * @const isNotNumber               Checks if incoming value is not a number.
 */

const isObjectEmpty = require("../helpers/requestValidators/isObjectEmpty.helper");
const isObjectPropertyEmpty = require("../helpers/requestValidators/isObjectPropertyEmpty.helper");
const isNotNumber = require("../helpers/requestValidators/isNotNumber.helper");

/**
 * Helper functions for handling / implementing Sequelize methods.
 *
 * @const findOrCreateReadingList   Implements CREATE.
 * @const findAllReadingLists       Implements READ.
 * @const findOneReadingList        Implements READ (FOR JUST ONE).
 * @const updateReadingList         Implements UPDATE.
 * @const destroyReadingList        Implements DELETE.
 */

const findOrCreateReadingList = require("../helpers/crudOperations/findOrCreate.helper");
const findAllReadingLists = require("../helpers/crudOperations/findAll.helper");
const findOneReadingList = require("../helpers/crudOperations/findOne.helper");
const updateReadingList = require("../helpers/crudOperations/update.helper");
const destroyReadingList = require("../helpers/crudOperations/destroy.helper");

/**
 * Controllers for reading list.
 * @module readingList/controllers
 */
module.exports = {
  /**
   * @function createNewReadingList   Takes in request object, runs validations, and sends back response.
   * @param {object} req              Client request.
   * @param {object} res              Server response.
   */

  createNewReadingList: (req, res) => {
    const incomingData = req.body;

    if (isObjectEmpty(incomingData)) {
      res.status(400).send({ message: "Object cannot be empty" });
    } else if (isObjectPropertyEmpty(incomingData)) {
      res.status(400).send({ message: "Please fill in all the fields" });
    } else {
      findOrCreateReadingList(res, incomingData, readingList, {
        message: "A reading list with this name already exists",
      });
    }
  },

  /**
   * @function readAllReadingLists    Retrieves all data from table in database.
   * @param {object} req              Client request.
   * @param {object} res              Server response.
   */

  readAllReadingLists: (_req, res) => {
    findAllReadingLists(res, readingList, {
      message: "Reading list is empty at this moment!",
    });
  },

  /**
   * @function readOneReadingList     Takes in request value, runs validations, and returns data from one row from table in database.
   * @param {object} req              Client request.
   * @param {object} res              Server response.
   */

  readOneReadingList: (req, res) => {
    if (isNotNumber(req.params.id)) {
      res.status(400).send({
        message: "The given id was not a number! Please use a number",
      });
    } else {
      findOneReadingList(req, res, readingList, {
        message: "Couldn't find that reading list!",
      });
    }
  },

  /**
   * @function updateReadingList      Takes in request value, runs validations, and updates a row in table.
   * @param {object} req              Client request.
   * @param {object} res              Server response.
   */

  updateReadingList: (req, res) => {
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
      const okMessage = { message: "The reading list name has been updated" };
      const notFoundMessage = { message: "Couldn't find that reading list" };
      const updateNameValue = { name: incomingData.name };
      const updateTypeValue = { type: incomingData.type };

      incomingData.name &&
        updateReadingList(
          req,
          res,
          updateNameValue,
          readingList,
          okMessage,
          notFoundMessage
        );

      incomingData.type &&
        updateReadingList(
          req,
          res,
          updateTypeValue,
          readingList,
          okMessage,
          notFoundMessage
        );
    }
  },

  /**
   * @function deleteReadingList      Takes in request value, runs validations, and deletes a row in table.
   * @param {object} req              Client request.
   * @param {object} res              Server response.
   */

  deleteReadingList: (req, res) => {
    const okMessage = {
      message: "The reading list has been deleted",
    };
    const notFoundMessage = { message: "Couldn't find that reading list" };

    isNotNumber(req.params.id)
      ? res.status(400).send({ message: "The given id was not a number!" })
      : destroyReadingList(req, res, readingList, okMessage, notFoundMessage);
  },
};
