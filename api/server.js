/// Module importation
const http = require('http'); 
const connection = require('./models/connection');

/// Database
connection.connect();

/// Commence server
const port = process.env.PORT || 5000;
http.createServer((req, res) => {
  res.writeHead(200, {
		'Content-Type': 'text/plain',
		'Access-Control-Allow-Origin': '*'
	});
	res.end('Test');
}).listen(port, console.log(`Server listening on port : ${port}`)); 
