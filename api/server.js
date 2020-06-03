/// Module importation
const http = require('http'); 
const connection = require('./models/connection');

/// Database
connection.connect();

/// Listen for requests

