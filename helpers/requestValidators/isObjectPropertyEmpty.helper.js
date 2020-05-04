/**
 * Checks if any properties in incoming object have empty values.
 * @function
 * @module
 *
 * @param {object} object
 * @returns {boolean}
 */
module.exports = (object) =>
  Object.values(object).some((key) => key === null || key === "");
