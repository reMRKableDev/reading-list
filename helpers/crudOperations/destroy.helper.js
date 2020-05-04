/**
 * @const handleError   Handles errors the occur in the catch.
 */
const handleError = require("./handleError.helper");

/**
 * Deletes a row in the database table.
 * @function
 * @module
 *
 * @param {object} req
 * @param {object} res
 * @param {object} model
 * @param {object} okMessage
 * @param {object} notFoundMessage
 */
module.exports = (req, res, model, okMessage, notFoundMessage) => {
  model
    .destroy({ where: { id: req.params.id } })
    .then((results) => {
      results === 1
        ? res.status(200).send(okMessage)
        : res.status(404).send(notFoundMessage);
    })
    .catch((destroyErr) => handleError(res, destroyErr));
};
