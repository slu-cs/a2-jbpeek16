// Define a plan for a collection

const mongoose = require('mongoose');

// Schema for a collection of professors
const Voter = new mongoose.Schema({
  firstName: String, 
  lastName: String,
  zip: Number,
  history: String
});

// Speed up queries on all fields
Voter.index({firstName: 1});
Voter.index({lastName: 1});
Voter.index({zip: 1});
Voter.index({history: 1});

// Compile and export this schema
module.exports = mongoose.model('Voter', Voter);
