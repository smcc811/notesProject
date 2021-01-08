const router = require("express").Router();
const Notes = require("../db/Notes");

// GET all notes (localhost:8080/api/notes)
router.get("/notes", (req, res) => {
  Notes.getNotes()
    .then((notes) => res.json(notes))
    .catch((err) => res.json(err));
});

// POST add new note to db.json (localhost:8080/api/notes)
router.post("/notes", (req, res) => {
  console.log(req.body);
  Notes.addNote(req.body)
    .then(() => res.status(200).json({ success: true }))
    .catch((err) => res.status(500).json(err));
});

// DELETE localhost:8080/api/notes/421352w5w
router.delete("/notes/:id", (req, res) => {
  Notes.deleteNote(req.params.id)
    .then(() => res.json({ OK: true }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
