// Dependencies
const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/'+ 'human-resources';
const db = mongoose.connection;
mongoose.connect( mongoURI );


// Connection Status Messages
db.on('error', (err) => console.log(err.message + ' is mongod not running?'))
db.on('connected', () => console.log('mongo connected: ', mongoURI))
db.on('disconnected', () => console.log('mongo disconnected'))
