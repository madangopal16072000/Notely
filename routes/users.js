const express = require("express");
const router = express.Router();
const catchAsyncError = require("../util/catchAsyncError");
const { register, login, logout } = require("../controllers/users");

router.route("/register").post(catchAsyncError(register));
router.route("/login").post(catchAsyncError(login));
router.route("/logout").get(catchAsyncError(logout));

module.exports = router;
