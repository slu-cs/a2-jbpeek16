// Store some data in the faculty database

const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');
const fs = require('fs')

let file;
let voterArray = [];
fs.readFile('./voters.csv', 'utf-8', (error, data) => {
    if (error) throw error;
    file = data; 
})

if (file) file.split(/\r?\n/).split(",");

let voterObjectArray = [];

voterArray.forEach(voter => {
  if (voter.length === 4) {
    voterObjectArray.push(new Voter({
      name: {first: voter[0], last: voter[1]},
      zip: voter[2],
      history: voter[3]
    }))
  }
});

connect(); // To the database

// Reset the data
mongoose.connection.dropDatabase()
  .then(() => {
    Promise.all(
      voterObjectArray.map(voterObject =>
        voterObject.save()
      )
    )
  })
  .then(() => mongoose.connection.close())
  .then(() => console.log('Database is ready.'))
  .catch(error => console.error(error.stack));
