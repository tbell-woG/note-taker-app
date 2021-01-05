// Basic property for the express server
const express = require('express');

// Sets up the inital port
const PORT = process.env.PORT || 8000;

//Test using the db.json
const dbJson = require('./db/db.json')

// Sets up the express server
const app = express();

// Sets up the express app to manage parsing the data in the '/public' folder
app.use(express.static(__dirname + '/public'));
app.use(express.static("./"));

// Reads the URL or JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Includes the route.js files
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

// Makes the server listen to the port
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});