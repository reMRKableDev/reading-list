const handleError = require("./handleError.helper");

module.exports = (res, model, message) => {
  model
    .findAll()
    .then((results) => {
      const dataValues = results.map((element) => element.dataValues);

      dataValues.length > 0
        ? res.status(200).send(dataValues)
        : res.status(200).send(message);
    })
    .catch((findAllErr) => {
      handleError(res, findAllErr);
    });
};
