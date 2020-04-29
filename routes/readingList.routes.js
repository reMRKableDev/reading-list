const express = require("express");
const router = express.Router();
const db = require("../database/models");
const readingList = db.readingList;
const { isEmpty, isPropEmpty, isNotNumber } = require("../helpers");

router.post("/", (req, res) => {
  const incomingData = JSON.parse(JSON.stringify(req.body));

  /* validate incoming data  */
  // check if object is empty
  isEmpty(incomingData) &&
    res.status(400).send({ message: "Input fields cannot be empty" });

  // if any of the properties are null or empty
  if (isPropEmpty(incomingData)) {
    res.status(400).send({ message: "Please fill in all the fields" });
  } else {
    readingList
      .findOrCreate({
        where: { name: incomingData.name },
        defaults: { type: incomingData.type },
      })
      .then(([results, created]) =>
        created
          ? res.status(200).send(results.dataValues)
          : res.status(409).send({
              message: "A reading list with this name already exists",
            })
      )
      .catch((createErr) =>
        console.error(`Couldn't create in db: ${createErr}`)
      );
  }
});

router.get("/", (req, res) => {
  readingList
    .findAll()
    .then((results) => {
      const dataValues = results.map((element) => element.dataValues);
      dataValues.length > 0
        ? res.status(200).send(dataValues)
        : res
            .status(200)
            .send({ message: "Reading list is empty at this moment!" });
    })
    .catch((findAllErr) => console.error(`Error when finding: ${findAllErr}`));
});

router.get("/:id", (req, res) => {
  if (isNotNumber(req.params.id)) {
    res.status(400).send({ message: "The given id was not a number!" });
  } else {
    readingList
      .findOne({ where: { id: req.params.id } })
      .then((results) =>
        results === null
          ? res.status(404).send({ message: "Couldn't find that playlist!" })
          : res.status(200).send(results.dataValues)
      )
      .catch((findOneErr) =>
        console.error(`Error when finding: ${findOneErr}`)
      );
  }
});

router.put("/:id", (req, res) => {
  const incomingData = JSON.parse(JSON.stringify(req.body));

  isEmpty(incomingData) &&
    res.status(400).send({ message: "Input fields cannot be empty" });

  if (isPropEmpty(incomingData)) {
    res.status(400).send({ message: "Please fill in all the fields" });
  } else if (isNotNumber(req.params.id)) {
    res.status(400).send({ message: "The given id was not a number!" });
  } else {
    readingList
      .update({ name: incomingData.name }, { where: { id: req.params.id } })
      .then((results) =>
        results[0] === 1
          ? res
              .status(200)
              .send({ message: "The playlist name has been updated" })
          : res.status(404).send({ message: "Couldn't find that playlist" })
      )
      .catch((updateErr) => console.error(`Couldn't update: ${updateErr}`));
  }
});

router.delete("/:id", (req, res) => {
  if (isNotNumber(req.params.id)) {
    res.status(400).send({ message: "The given id was not a number!" });
  } else {
    readingList
      .destroy({ where: { id: req.params.id } })
      .then((results) =>
        results === 1
          ? res
              .status(200)
              .send({ message: "The playlist name has been deleted" })
          : res.status(404).send({ message: "Couldn't find that playlist" })
      )
      .catch((destroyErr) => console.error(`Deleting error: ${destroyErr}`));
  }
});

module.exports = router;
