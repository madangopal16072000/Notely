if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const notesRouter = require("./routes/notes");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const cookieParser = require("cookie-parser");
const adminRouter = require("./routes/admin");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/notely");
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("My name is Madan Gopal");
});
// notes route
app.use("/api/v1/notes", notesRouter);
// users route
app.use("/api/v1/users", usersRouter);
// admin route
app.use("/api/v1/admin", adminRouter);
//error handling middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server Listening on Port : ${PORT}`);
});
