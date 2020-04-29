/* DEPENDENCIES */
const express = require("express");
const router = express.Router();
const db = require("../database/models");
const book = db.book;

/* HELPER FUNCTIONS */
const { isEmpty, isObjectPropertyEmpty, isNotNumber } = require("../helpers");

/* add book to a list */
router.post("/", (req, res) => {
  const incomingData = req.body;

  /* validate incoming data  */
  // check if object is empty
  isEmpty(incomingData) &&
    res.status(400).send({ message: "Input fields cannot be empty" });

  // if any of the properties are null or empty
  if (isObjectPropertyEmpty(incomingData)) {
    res.status(400).send({ message: "Please fill in all the fields" });
  } else {
    book
      .findOrCreate({
        where: { title: incomingData.title },
        defaults: {
          author: incomingData.author,
          readingListId: incomingData.readingListId,
        },
      })
      .then(([results, created]) =>
        created
          ? res.status(200).send(results.dataValues)
          : res.status(409).send({
              message: "A book with this name already exists",
            })
      )
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

/* get all books */
router.get("/", (req, res) => {
  book
    .findAll()
    .then((results) => {
      const dataValues = results.map((element) => element.dataValues);
      dataValues.length > 0
        ? res.status(200).send(dataValues)
        : res
            .status(200)
            .send({ message: "There are no books saved at this moment!" });
    })
    .catch((findAllErr) => {
      if (createErr) {
        console.error(`Error when finding: ${findAllErr}`);

        res.status(500).send({
          message:
            "Sorry! We are currently having server difficulties. Try again later",
        });
      }
    });
});

/* GET (one) - Reads one reading list saved in the database */
router.get("/:id", (req, res) => {
  if (isNotNumber(req.params.id)) {
    res.status(400).send({ message: "The given id was not a number!" });
  } else {
    book
      .findOne({ where: { id: req.params.id } })
      .then((results) =>
        results === null
          ? res.status(404).send({ message: "Couldn't find that book!" })
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

/* GET (books from reading list) - Reads all books from one reading list*/
router.get("/readList/:id", (req, res) => {
  if (isNotNumber(req.params.id)) {
    res.status(400).send({ message: "The given id was not a number!" });
  } else {
    book
      .findAll({ where: { readingListId: req.params.id } })
      .then((results) => {
        const dataValues = results.map((element) => element.dataValues);
        dataValues.length > 0
          ? res.status(200).send(dataValues)
          : res.status(200).send({
              message:
                "There are no books connected to this reading list at this moment!",
            });
      })
      .catch((findAllErr) => {
        if (createErr) {
          console.error(`Error when finding: ${findAllErr}`);

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

  isEmpty(incomingData) &&
    res.status(400).send({ message: "Input fields cannot be empty" });

  if (isObjectPropertyEmpty(incomingData)) {
    res.status(400).send({ message: "Please fill in all the fields" });
  } else if (isNotNumber(req.params.id)) {
    res.status(400).send({ message: "The given id was not a number!" });
  } else {
    // updating the title if title exists in the incomingData
    incomingData.title &&
      book
        .update({ title: incomingData.title }, { where: { id: req.params.id } })
        .then((results) =>
          results[0] === 1
            ? res
                .status(200)
                .send({ message: "The book title has been updated" })
            : res.status(404).send({ message: "Couldn't find that book" })
        )
        .catch((updateErr) => {
          if (updateErr) {
            console.error(`Error when updating title: ${updateErr}`);

            res.status(500).send({
              message:
                "Sorry! We are currently having server difficulties. Try again later",
            });
          }
        });

    // updating the author, if author exists in the incomingData
    incomingData.author &&
      book
        .update(
          { author: incomingData.author },
          { where: { id: req.params.id } }
        )
        .then((results) =>
          results[0] === 1
            ? res
                .status(200)
                .send({ message: "The book author has been updated" })
            : res.status(404).send({ message: "Couldn't find that book" })
        )
        .catch((updateErr) => {
          if (updateErr) {
            console.error(`Error when updating author: ${updateErr}`);

            res.status(500).send({
              message:
                "Sorry! We are currently having server difficulties. Try again later",
            });
          }
        });

    // updating the readingListId, if readingListId exists in the incomingData
    incomingData.readingListId &&
      book
        .update(
          { readingListId: incomingData.readingListId },
          { where: { id: req.params.id } }
        )
        .then((results) =>
          results[0] === 1
            ? res
                .status(200)
                .send({ message: "The book readListId has been updated" })
            : res.status(404).send({ message: "Couldn't find that book" })
        )
        .catch((updateErr) => {
          if (updateErr) {
            console.error(`Error when updating readListId: ${updateErr}`);

            res.status(500).send({
              message:
                "Sorry! We are currently having server difficulties. Try again later",
            });
          }
        });
  }
});

/* DELETE (one) - Deletes a book  */
router.delete("/:id", (req, res) => {
  if (isNotNumber(req.params.id)) {
    res.status(400).send({ message: "The given id was not a number!" });
  } else {
    book
      .destroy({ where: { id: req.params.id } })
      .then((results) =>
        results === 1
          ? res.status(200).send({ message: "The book has been deleted" })
          : res.status(404).send({ message: "Couldn't find that book" })
      )
      .catch((destroyErr) => {
        if (destroyErr) {
          console.error(`Error when deleting: ${destroyErr}`);

          res.status(500).send({
            message:
              "Sorry! We are currently having server difficulties. Try again later",
          });
        }
      });
  }
});
module.exports = router;
