const util = require("util");
const fs = require("fs");
const uuidv1 = require("uuid/v1");

const readFileAsync = util.promisify(fs.readFile);

const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFileAsync("db/db.json", "utf-8")
    }
    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }
    getNotes() {
        return this.read().then(notes => {
            let readNotes;
            try {
                readNotes = [].concat(JSON.parse(notes))
            } catch (error) {
                readNotes = [];
            }
            return readNotes

        })
    }
    addNote(note) {
        const { title, text } = note;
        if (!title || !text) {
            throw new Error("title amd text cannot be blank")
        }

        const newNote = { title, text, id: uuidv1() }

        return this.getNotes().then((notes) => [...notes, newNote]).then(updatedNotes=> this.write(updatedNotes)).then(() => newNote)
    }

    removeNote(id) {
        return this.getNotes().then(notes => notes.filter((note) => note.id !== id)).then(refreshNotes => this.write(refreshNotes))
    }

}


module.exports = new Store()