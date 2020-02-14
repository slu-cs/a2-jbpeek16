// Define a plan for a collection

const mongoose = require('mongoose');

// Schema for a collection of professors
const Voter = new mongoose.Schema({
  name: {firstName: String, lastName: String},
  zip: Number,
  history: String
});

// Speed up queries on all fields
Professor.index({name.firstName: 1});
Professor.index({name.lastName: 1});
Professor.index({zip: 1});
Professor.index({history: 1});

// Compile and export this schema
module.exports = mongoose.model('Voter', Voter);
