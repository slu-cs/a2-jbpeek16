// Query the faculty database

const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');

connect(); // To the database

/*// What documents are in the collection?
const query = Professor.find();
query.exec(function(error, professors) {
  if (error) console.error(error.stack);
  console.log(professors);
});*/

const queries = [

  // How many registered voters live in the Canton zip code (13617)?
  Voter.find().where('zip').equals(13617).countDocuments(),

  // What are the full names of all the registered voters whose first-name is STARR?
  Voter.find().where('firstName').equals('STARR'),

  // How many people voted in the 2016 general election (GE16)?
  Voter.find({'history': {$regex: 'GE16'}}).countDocuments(),

  // What is the last-name that comes last in the county in alphabetical order?
  Voter.find().sort('-lastName').limit(1),

  // How many zip codes does the county contain?
  Voter.distinct('zip')

];

// Run the queries in parallel
Promise.all(queries)
  .then(function(results) {
    console.log('There are ', results[0], ' resgistered voters in Canton');
    console.log(
      'The full names of all voters with the first name Starr are: ',
      results[1].map(p => p.firstName + " " + p.lastName)
    );
    console.log(results[2], ' people voted in the 2016 general election.');
    console.log(results[3].map(p => p.lastName), ' is the last name in the county alphabetically.');
    console.log('There are ', results[4].length, ' zip codes in St. Lawrence County.');
    mongoose.connection.close();
  }).catch(error => console.error(error.stack));
