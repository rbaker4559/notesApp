const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

//helpers
const notes = require('./db/db.json'); //how does this work w/o a module export
console.log(notes);

const fs = require('fs');
const router = express.Router();

//middleware
app.use(express.static('public'));

app.get("/", (req, res) => res.send('index.html')); //need to check work here

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})
