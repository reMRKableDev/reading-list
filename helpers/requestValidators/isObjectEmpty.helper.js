/**
 * Checks if incoming object is empty
 * @function
 * @module isObjectEmpty/helper
 *
 * @param {object} object
 * @returns {boolean}
 */
module.exports = (incomingObject) => Object.keys(incomingObject).length === 0;
