/// Module importation
const product = require('./models/product')
const http = require('http') 
const fs = require('fs') 

/// Commence server
const port = process.env.PORT || 5000
http.createServer( async (req, res) => {

	/// Determine core aspects of the over DB Model
	let url = req.url

	switch (url) { 
		case '/':
			index(req, res)
			break 
		default:
			index(req, res)
			break
	}

}).listen(port, console.log(`Server listening on port : ${port}`)) 

/// Functions

// Routes
function index(req, res) {

	product.getProductCategories(req, res) 
	.then(products => {
		let response = {brand: 'Stop N Shop', products: products}
		res.writeHead(200, defaultHeaders('application/json'))
		res.end(JSON.stringify(response), console.log(response))
	})
	.catch(error => {
		res.writeHead(200, defaultHeaders('application/json'))
		res.end(JSON.stringify(error), console.error(error))
	})
		
}

// Helpers
function defaultHeaders(contentType) {
	return {
		'Content-Type': contentType,
		'Access-Control-Allow-Origin': '*'
	}
}
