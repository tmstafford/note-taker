const router = require('express').Router();
const fs = require('fs');
const path = require('path');
// uuid to generate unique id for each note 
const { v4: uuidv4 } = require('uuid');

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));
});

router.get('/notes/:id', (req, res) => {
    let allNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let idNote = (req.params.id).toString();
    // filter through notes to get matching note id
    let result = allNotes.filter(val => val.id == idNote);
    res.json(result);
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

router.delete('/notes/:id', (req, res) => {
    let allNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let selectedId = (req.params.id).toString();
    // filter through notes for id of note to be deleted
    allNotes = allNotes.filter(selectNote => {
        return selectNote.id != selectedId;
    });
    // write file (db) with updated notes
    fs.writeFile('./db/db.json', JSON.stringify(allNotes, null, 2), err => {
        if (err) throw err;
        res.json(allNotes);
    });
});

module.exports = router;