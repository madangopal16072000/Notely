const Notes = require("../models/notes");
const ErrorHandler = require("../util/ErrorHandler");

const createNote = async (req, res, next) => {
  const { title, content } = req.body;
  const author = req.user._id;
  const newNote = new Notes({ title, content, author });

  const savedNote = await newNote.save();
  res.status(201).json({
    status: "success",
    note: savedNote,
  });
};

const getAllNotes = async (req, res, next) => {
  const userId = req.user._id;
  const notes = await Notes.find({ author: userId });
  res.status(200).json({
    status: "success",
    notes,
  });
};

const getNote = async (req, res, next) => {
  const { noteId } = req.params;

  const note = await Notes.findById(noteId);

  if (!note) {
    throw next(
      new ErrorHandler(`no notes exists with given id : ${noteId}`, 404)
    );
  }
  res.status(200).json({
    status: "success",
    note,
  });
};

const updateNote = async (req, res, next) => {
  const { noteId } = req.params;
  const updateFields = req.body;

  if (Object.keys(updateFields).length === 0) {
    throw next(new ErrorHandler("provide some data for updation!", 400));
  }

  updateFields.modifiedAt = Date.now();
  const updatedNote = await Notes.findByIdAndUpdate(noteId, updateFields, {
    new: true,
    runValidators: true,
  });

  if (!updatedNote) {
    throw new next(
      new ErrorHandler(`note with id : ${noteId} doesn't exists!`, 404)
    );
  }

  res.status(200).json({
    status: "success",
    description: "note updated successfully",
    note: updatedNote,
  });
};

const deleteNote = async (req, res, next) => {
  const { noteId } = req.params;
  const deletedNote = await Notes.findByIdAndDelete(noteId);

  if (!deletedNote) {
    throw next(
      new ErrorHandler(`note with id : ${noteId} doesn't exists`, 404)
    );
  }
  res.status(200).json({
    status: "success",
    note: deletedNote,
  });
};

module.exports = {
  createNote,
  getAllNotes,
  getNote,
  updateNote,
  deleteNote,
};

//admin
module.exports.adminGetAllNotes = async (req, res, next) => {
  const notes = await Notes.find({});
  res.status(200).json({
    status: "success",
    description: "fetched all notes successfully",
    notes,
  });
};
