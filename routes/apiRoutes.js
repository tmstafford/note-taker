const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const { v4: uuidv4 } = require('uuid');

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));
});

router.get('/notes/:id', (req, res) => {
    let allNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    res.json(allNotes[req.params.id]);
});

router.post('/notes', (req, res) => {
    let noteId = uuidv4();
    let allNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let newNote = {
        title: req.body.title,
        text: req.body.text
    };
    // assign random id to each new note then push to all notes
    newNote.id = noteId;
    allNotes.push(newNote);

    fs.writeFile('./db/db.json', JSON.stringify(allNotes, null, 2), err => {
        if (err) throw err;
        res.json(allNotes);
        console.log('New note created!');
        console.log(allNotes);
    });
});

module.exports = router;