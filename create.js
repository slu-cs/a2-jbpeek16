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

connect(); // To the database

const quick = [
  splitVoterArray[0],
  splitVoterArray[1],
  splitVoterArray[2],
  splitVoterArray[3],
  splitVoterArray[4],
  splitVoterArray[5],
  splitVoterArray[6],
]

async function writeVoters () {
  const voters = quick.map(async voter => {
    if (voter.length >= 3) {
      const voterHistory = (voter.length === 4) ? voter[3] : ""
      const currVoter = new Voter({
        firstName: voter[0], 
        lastName: voter[1],
        zip: voter[2],
        history: voterHistory
      })
      console.log(currVoter);
      const response = await currVoter.save();
      return response;
    } else {return null}
  });
  return voters;
}

// Reset the data
console.log()
mongoose.connection.dropDatabase()
  .then(
    quick.map(async voter => {
      if (voter.length >= 3) {
        const voterHistory = (voter.length === 4) ? voter[3] : ""
        const currVoter = new Voter({
          firstName: voter[0], 
          lastName: voter[1],
          zip: voter[2],
          history: voterHistory
        })
        try {
          return currVoter.save();
        }
        catch (error) {
          return console.error(error.stack);
        }
      }
    })
  )
  .then(() => mongoose.connection.close())
  .then(() => console.log('Database is ready.'))
  .catch(error => console.error(error.stack));
