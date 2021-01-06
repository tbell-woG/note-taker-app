// Require the modules
const fs = require("fs");

// API Routes
module.exports = (app) => {
    
    // This is the GET method that will return all the saved notes as JSON
    let noteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

    app.get("/api/notes", (req, res) => {
        return res.json(noteList);
    });

    // This is the POST method that add new notes
    app.post('/api/notes', (req, res) => {
        
        // Get the last existing note's ID
        let lastId;
        if (noteList.length) {
            lastId = Math.max(...(noteList.map(note => note.id)));
        
            // Or just set it to zero
        } else {
            lastId = 0;
        }
        // Start the ID's at one
        const id = lastId + 1;

        // Pushes the body to a JSON array
        noteList.push({ id, ...req.body });
        
        // Deletes the last index
        res.json(noteList.slice(-1));
    });
    
    // This is the DELETE method that deletes a note with a specific ID
    app.delete('/api/notes/:id', (req, res) => {
        // Searches for the note by its ID and converts it into a string
        let findNote = noteList.find(({ id }) => id === JSON.parse(req.params.id));

        // Deletes note that matches the index of the note's ID
        noteList.splice(noteList.indexOf(findNote), 1);
        res.end("Note was deleted");
    });
    
};