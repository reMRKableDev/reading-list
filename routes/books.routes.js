/* DEPENDENCIES */
const express = require("express");
const router = express.Router();
const db = require("../database/models");
const book = db.book;
const readingList = db.readingList;

/* HELPER FUNCTIONS */
const { isEmpty, isObjectPropertyEmpty, isNotNumber } = require("../helpers");

/* POST(CREATE) -  Add a new book */
router.post("/", (req, res) => {
  const incomingData = req.body;

  // check if object is empty
  isEmpty(incomingData) &&
    res.status(400).send({ message: "Object cannot be empty" });

  // check each property
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
      .then(([results, created]) => {
        created
          ? res.status(200).send(results.dataValues)
          : res.status(409).send({
              message: "A book with this title already exists",
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

/* GET(READ) -  Retrieve all the books */
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
      if (findAllErr) {
        console.error(`Error when finding all: ${findAllErr}`);

        res.status(500).send({
          message:
            "Sorry! We are currently having server difficulties. Try again later",
        });
      }
    });
});

/* GET(READ) ONE- Retrieve one book */
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

/* GET(READ) - Retrieve all books from one reading list */
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
        if (findAllErr) {
          console.error(`Error when finding: ${findAllErr}`);

          res.status(500).send({
            message:
              "Sorry! We are currently having server difficulties. Try again later",
          });
        }
      });
  }
});

/* PUT(UPDATE) - Modify one book */
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
    // changing title
    incomingData.title &&
      book
        .update({ title: incomingData.title }, { where: { id: req.params.id } })
        .then((results) => {
          results[0] === 1
            ? res
                .status(200)
                .send({ message: "The book title has been updated" })
            : res.status(404).send({ message: "Couldn't find that book" });
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

    // changing author
    incomingData.author &&
      book
        .update(
          { author: incomingData.author },
          { where: { id: req.params.id } }
        )
        .then((results) => {
          results[0] === 1
            ? res
                .status(200)
                .send({ message: "The book author has been updated" })
            : res.status(404).send({ message: "Couldn't find that book" });
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

    // changing readingListId
    incomingData.readingListId &&
      readingList
        .findOne({ where: { id: incomingData.readingListId } })
        .then((results) => {
          if (results === null) {
            res
              .status(404)
              .send({ message: "the readingListId does not exist" });
          } else {
            book
              .update(
                { readingListId: incomingData.readingListId },
                { where: { id: req.params.id } }
              )
              .then((results) => {
                results[0] === 1
                  ? res.status(200).send({
                      message: "The book readingListId has been updated",
                    })
                  : res
                      .status(404)
                      .send({ message: "Couldn't find that book" });
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
        })
        .catch((findErr) => {
          if (findErr) {
            console.error(`Error when updating: ${findErr}`);

            res.status(500).send({
              message:
                "Sorry! We are currently having server difficulties. Try again later",
            });
          }
        });
  }
});

/* DELETE(DELETE) - Deletes one book  */
router.delete("/:id", (req, res) => {
  if (isNotNumber(req.params.id)) {
    res.status(400).send({ message: "The given id was not a number!" });
  } else {
    book
      .destroy({ where: { id: req.params.id } })
      .then((results) => {
        results === 1
          ? res.status(200).send({ message: "The book has been deleted" })
          : res.status(404).send({ message: "Couldn't find that book" });
      })
      .catch();
  }
});

module.exports = router;
