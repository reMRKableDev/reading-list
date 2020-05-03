/* DEPENDENCIES */
const express = require("express");
const router = express.Router();

const {
  createNewReadingList,
  readAllReadingLists,
  readOneReadingList,
  updateReadingList,
  deleteReadingList,
} = require("../controllers/readingList.controllers");

/* POST(CREATE) - Add a new reading list */
router.post("/", createNewReadingList);

/* GET(READ) - Retrieve all reading lists */
router.get("/", readAllReadingLists);

/* GET(READ) ONE - Retrieve one reading list  */
router.get("/:id", readOneReadingList);

/* PUT(UPDATE) - Modify one reading list  */
router.put("/:id", updateReadingList);

/* DELETE(DELETE) - Deletes one reading list  */
router.delete("/:id", deleteReadingList);
module.exports = router;
