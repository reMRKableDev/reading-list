/**
 * @const handleError   Handles errors the occur in the catch.
 */
const handleError = require("./handleError.helper");

/**
 * Selects all rows from database table that match the passed condition.
 * @function
 * @module findOne/helper
 *
 * @param {object} req
 * @param {object} res
 * @param {object} model
 * @param {object} message
 */
module.exports = (req, res, model, message) => {
  model
    .findOne({ where: { id: req.params.id } })
    .then((results) =>
      results === null
        ? res.status(404).send(message)
        : res.status(200).send(results.dataValues)
    )
    .catch((findOneErr) => {
      handleError(res, findOneErr);
    });
};
