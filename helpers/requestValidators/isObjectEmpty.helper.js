/**
 * Checks if incoming object is empty
 * @function
 * @module isObjectEmpty/helper
 *
 * @param {object} object
 * @returns {boolean}
 */
module.exports = (object) => Object.keys(object).length === 0;
