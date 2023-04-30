// 1. set up express
const express = require('express');
const fs = require("fs");
const app = express();
const path = require('path'); //path mod providies utli for working with file and dir paths

const apiRouter = require('./routes/api.js')
//middleware for parsing JSON and urlencoded form data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
const PORT = process.env.port || 4444;

app.use("/api", apiRouter);

// 2. create a get route to return the notes.html file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});
// 3. create a get route to return the index.html file

app.get('/index', (req , res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

//wild card

app.get('*', (req, res) =>{
    res.status(404).send('404 page is not found...rip')
});


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));




