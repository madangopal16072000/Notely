const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../util/ErrorHandler");

module.exports.register = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const newUser = new Users({
    name,
    email,
    password,
    role,
  });

  let savedUser = await newUser.save();
  savedUser = savedUser.toObject();
  delete savedUser.password;

  const accessToken = jwt.sign(savedUser, process.env.ACCESS_TOKEN_SCRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.status(201).cookie("accessToken", accessToken, options).json({
    status: "success",
    user: savedUser,
  });
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  let user = await Users.findOne({ email }).select("+password");
  if (!user) {
    throw next(new ErrorHandler("Invalid username or password"), 400);
  }

  const isPasswordMatched = user.comparePassword(password);
  if (!isPasswordMatched) {
    throw next(new ErrorHandler("Invalid Password"), 401);
  }
  user = user.toObject();
  delete user.password;

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SCRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(201).cookie("accessToken", accessToken, options).json({
    status: "success",
    user,
  });
};

module.exports.logout = async (req, res, next) => {
  res.cookie("accessToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
    description: "user logged out successfully",
  });
};
