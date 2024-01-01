const ErrorHandler = require("../util/ErrorHandler");

const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went Wrong";

  if (err.name === "ValidationError") {
    err = new ErrorHandler(err.message, 400);
  }
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  res.status(statusCode).json({
    status: "failed",
    description: err.message,
  });
};
module.exports = errorMiddleware;
