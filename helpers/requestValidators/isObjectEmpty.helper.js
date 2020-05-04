/**
 * Checks if incoming object is empty
 * @function
 * @module
 *
 * @param {object} object
 * @returns {boolean}
 */
module.exports = (object) => {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};
