const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    //writeToFile,
    deleteFromFile
} = require('../helpers/fsUtils');


// GET Route for retrieving all the notes
router.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// GET Route for a specific note
router.get('/:id', (req, res) => {
    const noteId = req.params.id;
    console.log("noteId in router.get" + noteId);
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id === noteId);
            return result.length > 0
                ? res.json(result)
                : res.json('No note with that ID');
        });
});
// POST Route for a new UX/UI note
router.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully 🚀`);
    } else {
        res.error('Error in adding Note');
    }
});



// DELETE Route for a specific note
router.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    console.log("noteId in roter.delete:" + noteId);

    deleteFromFile(noteId, './db/db.json');

    // Respond to the DELETE request
    res.json(`Note ${noteId} has been deleted 🗑️`);

});



module.exports = router;
