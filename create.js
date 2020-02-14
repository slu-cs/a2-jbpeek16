// Store some data in the faculty database

const mongoose = require('mongoose');
const connect = require('./db');
const Professor = require('./schema');
const fs = require('fs') 

fs.readFile('./voters.csv', 'utf-8', (err, data) => { 
    if (err) throw err; 
  
    // Converting Raw Buffer to text 
    // data using tostring function. 
    console.log(data); 
}) 


// connect(); // To the database
//
// // Create some faculty
//
// const harcourt = new Professor({
//   name: 'Ed Harcourt',
//   rank: 'Full',
//   started: 2003,
//   courses: [140, 220, 345, 362, 364]
// });
//
// const torrey = new Professor({
//   name: 'Lisa Torrey',
//   rank: 'Associate',
//   started: 2009,
//   courses: [140, 219, 332, 362, 374, 380]
// });
//
// const lee = new Professor({
//   name: 'Choong-Soo Lee',
//   rank: 'Associate',
//   started: 2010,
//   courses: [140, 219, 256, 321, 370]
// });
//
// // Reset the data
// mongoose.connection.dropDatabase()
//   .then(() => harcourt.save())
//   .then(() => torrey.save())
//   .then(() => lee.save())
//   .then(() => mongoose.connection.close())
//   .then(() => console.log('Database is ready.'))
//   .catch(error => console.error(error.stack));
