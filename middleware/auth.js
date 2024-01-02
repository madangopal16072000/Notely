const jwt = require("jsonwebtoken");
const ErrorHandler = require("../util/ErrorHandler");
const Users = require("../models/users");
const Notes = require("../models/notes");
const mongoose = require("mongoose");

module.exports.isAuthenticated = async (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return next(new ErrorHandler("You need to login first", 401));
  }

  const decodedData = await jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SCRET
  );
  req.user = await Users.findById(decodedData._id);
  next();
};

module.exports.isAuthor = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Notes.findById(noteId);
  if (!note) {
    throw next(new ErrorHandler(`no notes exists with id : ${noteId}`, 404));
  }
  if (!note.author.equals(req.user._id)) {
    throw next(new ErrorHandler("You do not have permission to do that", 403));
  }
  next();
};

module.exports.isAuthorized = async (req, res, next) => {
  const { userId } = req.params;
  const id = req.user._id;

  if (mongoose.Types.ObjectId.isValid(userId) && id.equals(userId)) {
    next();
  } else {
    throw next(new ErrorHandler("Not authorized", 403));
  }
};

module.exports.isAdmin = async (req, res, next) => {
  const userId = req.user._id;
  const admin = await Users.findById(userId);
  if (!admin) {
    throw next(new ErrorHandler(`no admin exists with id : ${userId}`, 404));
  }

  if (admin.role === "ADMIN") {
    next();
  } else {
    throw next(new ErrorHandler(`not authorized`, 404));
  }
};
