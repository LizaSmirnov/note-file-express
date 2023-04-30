const express = require('express');
const router = express.Router();
const fs = require('fs')
let noteFile = require('../db/db.json');
const { v4: uuivd4 } = require('uuid');

// 4. create a get route for api/notes
// -- get all the data from the db.json
// -- send that json data back to the user

router.get('/notes', (req, res) => {
    res.json(noteFile)
  });
  // 5. create a post route for api/notes
  router.post('/notes', (req, res) =>{
      console.log(req.body);

      const { title, text } = req.body;
      
      if(title && text) {
          const newNote = {
              title,
              text,
              id: uuivd4(),
            };
            noteFile.push(newNote);

            let notesString = JSON.stringify(noteFile, null, 3);

            //rewrite file with new notes
            fs.writeFile(`./db/db.json`, notesString, (err) => {
                err ? console.error(err): console.log(`New notes added!`) 
            }
            );
            
        res.status(200).json(newNote);
    } else {
        res.status(404).json('Notes not added sorry')
    }
});

// -- look at the data the user sent you
// -- *bonus* give that note an ID
// -- add that data to the json file
// -- return that note back to the user

module.exports = router;