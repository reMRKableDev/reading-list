/**
 * Sends a response of the new created entity
 * @function
 * @module sendCreatedStatus
 *
 * @param {object} res
 * @param {object} message
 */

module.exports = (res, message) => {
  return ([results, created]) => {
    return created
      ? res.status(200).send(results.dataValues)
      : res.status(409).send(message);
  };
};
