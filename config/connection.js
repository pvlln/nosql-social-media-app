// Import mongoose connect/connection
const { connect, connection } = require('mongoose');
// Creating MongoDB connection
const connString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:3001/project';

connect(connString);

module.exports = connection;