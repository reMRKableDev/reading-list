const handleError = require("./handleError.helper");

module.exports = (req, res, model, okMessage, notFoundMessage) => {
  model
    .destroy({ where: { id: req.params.id } })
    .then((results) => {
      results === 1
        ? res.status(200).send(okMessage)
        : res.status(404).send(notFoundMessage);
    })
    .catch((destroyErr) => handleError(res, destroyErr));
};
