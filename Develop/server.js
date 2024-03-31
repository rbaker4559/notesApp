const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

//helpers
const fs = require('fs');
const router = express.Router();

//middleware
app.use(express.json());
app.use(express.static('public'));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html'))); //need to check work here

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
});

app.get("/api/notes", (req,res) => {
    fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf8',  (err, data) => {
        if(err){
            console.error(err);
            res.status(500).send('internal server error');
            return;
        }
        const notes = JSON.parse(data);
        res.json(notes);
    });
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (err, data) => {
        if(err){
            console.error(err);
            res.status(500).send('internal server error');
            return;
        }
        const notes = JSON.parse(data);
        newNote.id = Math.floor(Math.random() * 1000000);
        notes.push(newNote);
        fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes), 'utf8', (err, data) => {
            if(err){
                console.error(err);
                res.status(500).send('internal server error');
                return;    
            }
            res.json(newNote);
        });
    });
});

app.delete('/api/notes/:id', (req, res) => {
    const noteID = req.params.id;
    fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (err, data) => {
        if(err){
            console.error(err);
            res.status(500).send('internal server error');
            return;
        }
        let notes = JSON.parse(data);
        notes = notes.filter(note => note.id != noteID);
        fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes), 'utf8', (err) => {
            if(err){
                console.error(err);
                res.status(500).send('internal server error');
                return;
            }
            res.sendStatus(200)
        });
    });
});


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})
