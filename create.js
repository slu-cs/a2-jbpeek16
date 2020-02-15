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

const quick = [
  splitVoterArray[0],
  splitVoterArray[1],
  splitVoterArray[2],
  splitVoterArray[3],
  splitVoterArray[4],
  splitVoterArray[5],
  splitVoterArray[6],
]

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
  .then(console.log('Writing voter data to the database.'))
  .then(async function() {
    await voters.reduce(async (previousPromise, nextVoter) => {
      await previousPromise;
      if (nextVoter) {
        result = await nextVoter.save();
      }
    }, Promise.resolve());
  })
  .then(() => mongoose.connection.close())
  .then(() => console.log('Database is ready.'))
  .catch(error => console.error(error.stack));
