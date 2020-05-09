/**
 * @const updateBook     Updates book
 */
const updateBook = require("./update.helper");

/**
 * @const handleError   Handles errors the occur in the catch.
 */
const handleError = require("./handleError.helper");

/**
 * Finds a data from a row in database table and updates the value of the readingListId column.
 * @function
 * @module updateBookReadingListId/helper
 *
 * @param {object} req
 * @param {object} res
 * @param {object} readingListId
 * @param {object} updateReadingListIdValue
 * @param {object} readingListModel
 * @param {object} bookModel
 * @param {object} okMessage
 * @param {object} notFoundMessage
 */

module.exports = (
  req,
  res,
  readingListId,
  updateReadingListIdValue,
  readingListModel,
  bookModel,
  okMessage,
  notFoundMessage
) => {
  readingListModel
    .findOne({ where: { id: readingListId } })
    .then((results) => {
      if (results === null) {
        res.status(404).send({ message: "the readingListId does not exist" });
      } else {
        updateBook(
          req,
          res,
          updateReadingListIdValue,
          bookModel,
          okMessage,
          notFoundMessage
        );
      }
    })
    .catch((findErr) => {
      handleError(res, findErr);
    });
};
