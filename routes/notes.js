const express = require("express");
const catchAsyncError = require("../util/catchAsyncError");
const router = express.Router();
const {
  createNote,
  getAllNotes,
  getNote,
  updateNote,
  deleteNote,
} = require("../controllers/notes");

router.route("/").get(catchAsyncError(getAllNotes));
router
  .route("/:id")
  .get(catchAsyncError(getNote))
  .patch(catchAsyncError(updateNote))
  .delete(catchAsyncError(deleteNote));
router.route("/create").post(catchAsyncError(createNote));

module.exports = router;
