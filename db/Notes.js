const util = require("util");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// makes the read and write file functions a promise
const readDBFile = util.promisify(fs.readFile);
const writeDBFile = util.promisify(fs.writeFile);

class Notes {
  write(note) {
    return writeDBFile("db/db.json", JSON.stringify(note));
  }
  getNotes() {
    return readDBFile("db/db.json", "utf-8").then((notes) => {
      return JSON.parse(notes);
    });
  }

  addNote(note) {
    const { title, text } = note;

    const newNote = {
      title, // same as title: title (es6)
      text,
      id: uuidv4(),
    };

    // first retrieve existing notes from db.json
    return (
      this.getNotes()
        // make an array with existing notes plus or new note
        .then((notes) => [...notes, newNote])
        // writing this newly created array to db.json
        .then((updatedNotes) => {
          console.log(updatedNotes);
          this.write(updatedNotes);
        })
        // finally send them back the new note that was created
        .then(() => newNote)
    );
  }

  deleteNote(id) {
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((updatedNotes) => {
        this.write(updatedNotes);
      });
  }
}

module.exports = new Notes();
