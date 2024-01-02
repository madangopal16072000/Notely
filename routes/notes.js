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
const { isAuthenticated, isAuthor } = require("../middleware/auth");

router
  .route("/user")
  .get(catchAsyncError(isAuthenticated), catchAsyncError(getAllNotes));

router
  .route("/:noteId")
  .get(
    catchAsyncError(isAuthenticated),
    catchAsyncError(isAuthor),
    catchAsyncError(getNote)
  )
  .patch(
    catchAsyncError(isAuthenticated),
    catchAsyncError(isAuthor),
    catchAsyncError(updateNote)
  )
  .delete(
    catchAsyncError(isAuthenticated),
    catchAsyncError(isAuthor),
    catchAsyncError(deleteNote)
  );

router
  .route("/create")
  .post(catchAsyncError(isAuthenticated), catchAsyncError(createNote));

module.exports = router;
