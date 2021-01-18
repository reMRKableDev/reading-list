/**
 * @const handleError   Handles errors the occur in the catch.
 */
const handleError = require("./handleError.helper");

/**
 * @param {object} res
 */
module.exports = (res) => (createErr) => {
  handleError(res, createErr);
};
