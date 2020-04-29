/* DEPENDENCIES */
const express = require("express");
const router = express.Router();
const db = require("../database/models");
const readingList = db.readingList;

const { isEmpty, isObjectPropertyEmpty, isNotNumber } = require("../helpers/");

/* POST */
router.post("/", (req, res) => {
  const incomingData = req.body;

  // check if object is empty
  isEmpty(incomingData) &&
    res.status(400).send({ message: "Object cannot be empty" });

  // check each property
  if (isObjectPropertyEmpty(incomingData)) {
    res.status(400).send({ message: "Please fill in all the fields" });
  } else {
    readingList
      .findOrCreate({
        where: { name: incomingData.name },
        defaults: { type: incomingData.type },
      })
      .then(([results, created]) => {
        created
          ? res.status(200).send(results.dataValues)
          : res.status(409).send({
              message: "A reading list with this name already exists",
            });
      })
      .catch((createErr) => {
        if (createErr) {
          console.error(`Error when creating: ${createErr}`);

          res.status(500).send({
            message:
              "Sorry! We are currently having server difficulties. Try again later",
          });
        }
      });
  }
});

/* GET all the reading list */
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
    .catch((findAllErr) => {
      if (findAllErr) {
        console.error(`Error when finding all: ${findAllErr}`);

        res.status(500).send({
          message:
            "Sorry! We are currently having server difficulties. Try again later",
        });
      }
    });
});

/* GET SPECIFIC */
router.get("/:id", (req, res) => {
  if (isNotNumber(req.params.id)) {
    res
      .status(400)
      .send({ message: "The given id was not a number! Please use a number" });
  } else {
    readingList
      .findOne({ where: { id: req.params.id } })
      .then((results) =>
        results === null
          ? res
              .status(404)
              .send({ message: "Couldn't find that reading list!" })
          : res.status(200).send(results.dataValues)
      )
      .catch((findOneErr) => {
        if (findOneErr) {
          console.error(`Error when finding one: ${findOneErr}`);

          res.status(500).send({
            message:
              "Sorry! We are currently having server difficulties. Try again later",
          });
        }
      });
  }
});

/* PUT */
router.put("/:id", (req, res) => {
  const incomingData = req.body;

  // check if object is empty
  isEmpty(incomingData) &&
    res.status(400).send({ message: "Object cannot be empty" });

  if (isObjectPropertyEmpty(incomingData)) {
    res.status(400).send({ message: "Please fill in all the fields" });
  } else if (isNotNumber(req.params.id)) {
    res
      .status(400)
      .send({ message: "The given id was not a number! Please use a number" });
  } else {
    // changing name
    incomingData.name &&
      readingList
        .update({ name: incomingData.name }, { where: { id: req.params.id } })
        .then((results) => {
          results[0] === 1
            ? res
                .status(200)
                .send({ message: "The reading list name has been updated" })
            : res
                .status(404)
                .send({ message: "Couldn't find that reading list" });
        })
        .catch((updateErr) => {
          if (updateErr) {
            console.error(`Error when updating: ${updateErr}`);

            res.status(500).send({
              message:
                "Sorry! We are currently having server difficulties. Try again later",
            });
          }
        });

    // changing type
    incomingData.type &&
      readingList
        .update({ type: incomingData.type }, { where: { id: req.params.id } })
        .then((results) => {
          results[0] === 1
            ? res
                .status(200)
                .send({ message: "The reading list name has been updated" })
            : res
                .status(404)
                .send({ message: "Couldn't find that reading list" });
        })
        .catch((updateErr) => {
          if (updateErr) {
            console.error(`Error when updating: ${updateErr}`);

            res.status(500).send({
              message:
                "Sorry! We are currently having server difficulties. Try again later",
            });
          }
        });
  }
});

/* DELETE */
router.delete("/:id", (req, res) => {
  if (isNotNumber(req.params.id)) {
    res.status(400).send({ message: "The given id was not a number!" });
  } else {
    readingList
      .destroy({ where: { id: req.params.id } })
      .then((results) => {
        results === 1
          ? res
              .status(200)
              .send({ message: "The reading list name has been deleted" })
          : res
              .status(404)
              .send({ message: "Couldn't find that reading list" });
      })
      .catch();
  }
});
module.exports = router;
