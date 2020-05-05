/**
 * @const handleError   Handles errors the occur in the catch.
 */
const handleError = require("./handleError.helper");

/**
 * Selects all rows from database table.
 * @function
 * @module findAll/helper
 *
 * @param {object} res
 * @param {object} model
 * @param {object} message
 */
module.exports = (res, model, message) => {
  model
    .findAll()
    .then((results) => {
      const dataValues = results.map((element) => element.dataValues);

      dataValues.length > 0
        ? res.status(200).send(dataValues)
        : res.status(200).send(message);
    })
    .catch((findAllErr) => {
      handleError(res, findAllErr);
    });
};
