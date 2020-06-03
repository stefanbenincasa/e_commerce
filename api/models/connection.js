/// Module importation
const mysql = require('mysql');

/// Database
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'STEFAN',
	password: 'password',
	database: 'E_COMMERCE'
});

module.exports = connection;
