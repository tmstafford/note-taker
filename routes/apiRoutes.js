const router = require('express').Router();
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');
const db = require('../db/db.json');

router.get('/notes', (req, res) => {
    res.json(db);
});

router.post('/notes', (req, res) => {
    let noteId = uuidv4();
    let newNote = {
        id: noteId,
        title: req.body.title,
        text: req.body.text
    };
    
    let allNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    allNotes.push(newNote);

    fs.writeFile('./db/db.json', JSON.stringify(allNotes, null, 2), err => {
        if (err) throw err;
        res.json(allNotes);
        console.log('New note created!');
        console.log(allNotes);
    });
});

module.exports = router;