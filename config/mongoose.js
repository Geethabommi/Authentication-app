const mongoose = require('mongoose');
const env = require('./environment');

// mongoose.connect(`mongodb://localhost/${env.db}`);
mongoose.connect(`${env.mongodb_uri}${env.db}`);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB'));

db.once('open', function () {
  console.log('Connected to Database :: MongoDB');
});

module.exports = db;