if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const notesRouter = require("./routes/notes");
const usersRouter = require("./routes/users");
const cookieParser = require("cookie-parser");
const adminRouter = require("./routes/admin");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("My name is Madan Gopal");
});
// notes route
// app.use("/api/v1/users/:userId/notes", notesRouter);
app.use("/api/v1/notes", notesRouter);
// users route
app.use("/api/v1/users", usersRouter);
// admin route
app.use("/api/v1/admin", adminRouter);
//error handling middleware
app.use(errorMiddleware);

module.exports = app;
