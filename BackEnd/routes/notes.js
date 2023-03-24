const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/notes");
// Router 1: Get a User Data using  : GET "/api/notes/getuser".Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Internal server error");
  }
});
// Router 2: Add a new notes using:POSt "/api/notes/addnotse".Login required
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 5 }),
    body("description", "Description must be atleast 8 Characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // If There are Errors,return bad request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await notes.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(400).send("Internal server error");
    }
  }
);
// Router 3:Update notes  using:PUT "/api/notes/updatenotse".Login required
router.put("/updatenotes/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    // Create a newNotes object
    const newNotes = {};
    if (title) {
      newNotes.title = title;
    }
    if (description) {
      newNotes.description = description;
    }
    if (tag) {
      newNotes.tag = tag;
    }
    // Find The Note to updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(400).send("not allowed");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNotes },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Internal server error");
  }
});
// Router 3:Delete notes  using:DELET "/api/notes/deletenots".Login required
router.delete("/deletenots/:id", fetchuser, async (req, res) => {
  try {
    // Find The Note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }
    // allow deletion only if user is authenticated
    if (note.user.toString() !== req.user.id) {
      return res.status(400).send("not allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Notes Has Been Deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Internal server error");
  }
});
module.exports = router;
