/// Module importation
const product = require('./models/product');
const http = require('http'); 
const fs = require('fs'); 

/// Commence server
const port = process.env.PORT || 5000;
http.createServer((req, res) => {

	/// Determine core aspects of the over DB Model 
	const data = {
		brand: 'Stop N Shop',
		categories: [
			{
				key: 1234,
				item: 'Hand Tools' // These will come from DB eventually 
			}, 
			{
				key: 2341,
				item: 'Power Tools' // These will come from DB eventually 
			} 
		] 
	} 

  res.writeHead(200, {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*'
	});

	res.end(JSON.stringify(data));

}).listen(port, console.log(`Server listening on port : ${port}`)); 
