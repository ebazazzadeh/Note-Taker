const express = require('express');
const path = require('path');
const routes = require('./routes');


const app = express();

const PORT = process.env.PORT || 3000;


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);
app.use(express.static(path.join(__dirname, 'public')));


// GET Route for note page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Wildcard route to direct users to a 404 page
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/pages/404.html'))
);


// if all good, list the location
app.listen(PORT, function () {
    console.log(`Listening on: http://localhost:${PORT}`);
});

