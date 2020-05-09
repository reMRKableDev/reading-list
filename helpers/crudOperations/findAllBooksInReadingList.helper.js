/**
 * @const handleError   Handles errors the occur in the catch.
 */
const handleError = require("./handleError.helper");

/**
 * Finds all the books in a reading list.
 * @function
 * @module findAllBooksInReadingListId/helper
 *
 * @param {object} req
 * @param {object} res
 * @param {object} bookModel
 */
module.exports = (req, res, bookModel) => {
  bookModel
    .findAll({ where: { readingListId: req.params.id } })
    .then((results) => {
      const dataValues = results.map((element) => element.dataValues);

      return dataValues.length > 0
        ? res.status(200).send(dataValues)
        : res.status(200).send({
            message:
              "There are no books connected to this reading list at this moment!",
          });
    })
    .catch((findAllErr) => {
      handleError(res, findAllErr);
    });
};
