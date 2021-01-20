/**
 * Checks if any properties in incoming object have empty values.
 * @function
 * @module isObjectPropertyEmpty/helper
 *
 * @param {object} object
 * @returns {boolean}
 */
module.exports = (incomingObject) =>
  Object.values(incomingObject).some((key) => key === null || key === "");
