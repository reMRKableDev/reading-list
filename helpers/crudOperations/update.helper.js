const handleError = require("./handleError.helper");

module.exports = (req, res, column, model, okMessage, notFoundMessage) => {
  model
    .update(column, { where: { id: req.params.id } })
    .then((results) => {
      results[0] === 1
        ? res.status(200).send(okMessage)
        : res.status(404).send(notFoundMessage);
    })
    .catch((updateErr) => handleError(res, updateErr));
};
