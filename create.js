// Store some data in the faculty database

const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');
const fs = require('fs')

// read the file
const file = fs.readFileSync('./voters.csv', 'utf-8')

// check if we have the file then split on the new line
let voterArray = [];
if (file) voterArray = file.split(/\r?\n/);

// split each line in to an array by splitting on commas
let splitVoterArray = [];
voterArray.forEach(voter => splitVoterArray.push(voter.split(",")));

// build the voters array
const voters = splitVoterArray.map(voter => {
  if (voter.length >= 3) {
    const voterHistory = (voter.length === 4) ? voter[3] : ""
    return new Voter({
      firstName: voter[0], 
      lastName: voter[1],
      zip: voter[2],
      history: voterHistory
    })
  }
})


connect(); // To the database

// Reset the data
mongoose.connection.dropDatabase()
  // start writing
  .then(console.log('Writing voter data to the database.'))
  // asyncronously call save on each voter and have that resolve right when
  // it can, then start the next async call.
  .then(async function() {
    await voters.reduce(async (previousPromise, nextVoter) => {
      await previousPromise;
      if (nextVoter) {
        result = await nextVoter.save();
      }
    }, Promise.resolve());
  })
  // close connection
  .then(() => mongoose.connection.close())
  .then(() => console.log('Database is ready.'))
  .catch(error => console.error(error.stack));
