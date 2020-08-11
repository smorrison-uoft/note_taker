const router = require ("express").Router();
const Store = require ("../db/Store")

//make a router. method for each type of addNote, getNotes and removve notes
router.get("/notes", function(req, res){
    Store.getNotes().then(notes => res.json(notes)).catch(err =>res.status(500).json(err))
});

router.post("/notes", function (req, res) {
    store
        .addNote(req.body)
        .then((notes) => res.json(notes))
        .catch(err => res.status(500).json(err))
});

router.delete("/notes/:title", function (req, res) {
    store
        .deleteNotes(req.params.title)
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(500).json(err))
});


module.exports= router;
