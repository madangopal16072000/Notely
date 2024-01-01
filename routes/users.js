const express = require("express");
const router = express.Router();
const catchAsyncError = require("../util/catchAsyncError");
const {
  register,
  login,
  logout,
  getUserDetails,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const { isAuthenticated, isAuthorized } = require("../middleware/auth");

router.route("/register").post(catchAsyncError(register));
router.route("/login").post(catchAsyncError(login));
router
  .route("/logout")
  .get(catchAsyncError(isAuthenticated), catchAsyncError(logout));
router
  .route("/:userId")
  .get(catchAsyncError(getUserDetails))
  .patch(
    catchAsyncError(isAuthenticated),
    catchAsyncError(isAuthorized),
    catchAsyncError(updateUser)
  )
  .delete(
    catchAsyncError(isAuthenticated),
    catchAsyncError(isAuthorized),
    catchAsyncError(deleteUser)
  );
module.exports = router;
