// Store some data in the faculty database

const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');
const fs = require('fs')

let voterArray = [];
const file = fs.readFileSync('./voters.csv', 'utf-8')

if (file) voterArray = file.split(/\r?\n/);

let splitVoterArray = [];
voterArray.forEach(voter => splitVoterArray.push(voter.split(",")));

let voterObjectArray = [];
voterArray.forEach(voter => {
  const voterHistory = (voter.length === 4) ? voter[3] : ""
  voterObjectArray.push(new Voter({
    name: {first: voter[0], last: voter[1]},
    zip: voter[2],
    history: voterHistory
  }))
});

connect(); // To the database

// Reset the data
mongoose.connection.dropDatabase()
  .then(splitVoterArray => {
    Promise.all(
      splitVoterArray.map(voter =>
        new Voter({
          name: {first: voter[0], last: voter[1]},
          zip: voter[2],
          history: voterHistory
        }).save()
      )
    )
  })
  .then(() => mongoose.connection.close())
  .then(() => console.log('Database is ready.'))
  .catch(error => console.error(error.stack));
