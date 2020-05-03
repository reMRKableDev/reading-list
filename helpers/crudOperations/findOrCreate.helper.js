const handleError = require("./handleError.helper");

module.exports = (res, incomingData, model, message) => {
  model
    .findOrCreate({
      where: { name: incomingData.name },
      defaults: { type: incomingData.type },
    })
    .then(([results, created]) => {
      created
        ? res.status(200).send(results.dataValues)
        : res.status(409).send(message);
    })
    .catch((createErr) => {
      handleError(res, createErr);
    });
};
