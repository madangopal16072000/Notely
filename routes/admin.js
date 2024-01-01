const express = require("express");
const catchAsyncError = require("../util/catchAsyncError");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const {
  getAllUsers,
  updateUser,
  deleteUser,
  getUserDetails,
} = require("../controllers/users");
const {
  adminGetAllNotes,
  getNote,
  updateNote,
  deleteNote,
} = require("../controllers/notes");
const router = express.Router();

router
  .route("/users")
  .get(
    catchAsyncError(isAuthenticated),
    catchAsyncError(isAdmin),
    catchAsyncError(getAllUsers)
  );

router
  .route("/users/:userId")
  .get(
    catchAsyncError(isAuthenticated),
    catchAsyncError(isAdmin),
    catchAsyncError(getUserDetails)
  )
  .put(
    catchAsyncError(isAuthenticated),
    catchAsyncError(isAdmin),
    catchAsyncError(updateUser)
  )
  .delete(
    catchAsyncError(isAuthenticated),
    catchAsyncError(isAdmin),
    catchAsyncError(deleteUser)
  );

router
  .route("/notes")
  .get(
    catchAsyncError(isAuthenticated),
    catchAsyncError(isAdmin),
    catchAsyncError(adminGetAllNotes)
  );

router
  .route("/notes/:noteId")
  .get(
    catchAsyncError(isAuthenticated),
    catchAsyncError(isAdmin),
    catchAsyncError(getNote)
  )
  .put(
    catchAsyncError(isAuthenticated),
    catchAsyncError(isAdmin),
    catchAsyncError(updateNote)
  )
  .delete(
    catchAsyncError(isAuthenticated),
    catchAsyncError(isAdmin),
    catchAsyncError(deleteNote)
  );
module.exports = router;
