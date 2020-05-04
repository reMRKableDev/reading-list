
const express = require("express");
const router = express.Router();

const {
  createNewReadingList,
  readAllReadingLists,
  readOneReadingList,
  updateReadingList,
  deleteReadingList,
} = require("../controllers/readingList.controllers");

router.post("/", createNewReadingList);

router.get("/", readAllReadingLists);

router.get("/:id", readOneReadingList);

router.put("/:id", updateReadingList);

router.delete("/:id", deleteReadingList);

module.exports = router;
