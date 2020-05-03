const handleError = require("./handleError.helper");

module.exports = (req, res, model, message) => {
  model
    .findOne({ where: { id: req.params.id } })
    .then((results) =>
      results === null
        ? res.status(404).send(message)
        : res.status(200).send(results.dataValues)
    )
    .catch((findOneErr) => {
      handleError(res, findOneErr);
    });
};
