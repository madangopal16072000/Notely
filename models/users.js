const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email must be unique"],
    validate: {
      validator: function (value) {
        // Regular expression to validate email format
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Please provide a valid email address",
    },
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minLength: [8, "password must be of 8 or more characters"],
    select: false,
  },
  role: {
    type: String,
    uppercase: true,
    enum: ["USER", "ADMIN"],
    default: "USER",
    validate: {
      validator: function (v) {
        return ["USER", "ADMIN"].includes(v);
      },
      message: "Role must be either ADMIN or USER",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  modifiedAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const Users = mongoose.model("users", userSchema);
module.exports = Users;
