const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: [4, "To Small Title"],
  },
  content: {
    type: String,
    required: true,
    minLength: [6, "Content length must be more than 6"],
    trim: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
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

const Notes = mongoose.model("notes", notesSchema);
module.exports = Notes;
