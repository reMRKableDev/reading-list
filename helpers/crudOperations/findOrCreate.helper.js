const sendCreatedStatus = require("./sendCreatedStatus.helper");

const createErrHandler = require("./createErrHandler.helper");

/**
 * Searches table for existing row, if not found, creates new entity.
 * @function
 * @module findOrCreate/helper
 *
 * @param {object} res
 * @param {object} incomingData
 * @param {object} model
 * @param {object} message
 */
module.exports = (res, incomingData, model, message) => {
  return incomingData.name
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
