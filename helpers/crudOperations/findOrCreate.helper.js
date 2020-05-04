/**
 * @const handleError   Handles errors the occur in the catch.
 */
const handleError = require("./handleError.helper");

/**
 * Searches table for existing row, if not found, creates new entity.
 * @function
 * @module
 *
 * @param {object} res
 * @param {object} incomingData
 * @param {object} model
 * @param {object} message
 */
module.exports = (res, incomingData, model, message) => {
  incomingData.name
    ? model
        .findOrCreate({
          where: { name: incomingData.name },
          defaults: { type: incomingData.type },
        })
        .then(sendCreatedStatus(res, message))
        .catch(createErrHandler(res))
    : model
        .findOrCreate({
          where: { title: incomingData.title },
          defaults: {
            author: incomingData.author,
            readingListId: incomingData.readingListId,
          },
        })
        .then(sendCreatedStatus(res, message))
        .catch(createErrHandler(res));
};

const createErrHandler = (res) => {
  return (createErr) => {
    handleError(res, createErr);
  };
};

const sendCreatedStatus = (res, message) => {
  return ([results, created]) => {
    created
      ? res.status(200).send(results.dataValues)
      : res.status(409).send(message);
  };
};
