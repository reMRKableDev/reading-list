/**
 * @const handleError   Handles errors the occur in the catch.
 */
const handleError = require("./handleError.helper");

/**
 * Updates a row in the database table.
 * @function
 * @module update/helper
 *
 * @param {object} req
 * @param {object} res
 * @param {object} column
 * @param {object} model
 * @param {object} okMessage
 * @param {object} notFoundMessage
 */
module.exports = (req, res, column, model, okMessage, notFoundMessage) => {
  model
    .update(column, { where: { id: req.params.id } })
    .then((results) => {
      results[0] === 1
        ? res.status(200).send(okMessage)
        : res.status(404).send(notFoundMessage);
    })
    .catch((updateErr) => handleError(res, updateErr));
};
