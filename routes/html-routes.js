var path = require("path");

module.exports = (app) => {    
    // This is the route to go to the notes page
    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "./public/notes.html"));
    });
    // This is the route to go to the index page
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "./public/index.html"));
    });
};