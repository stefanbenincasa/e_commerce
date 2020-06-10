/// Module importation
const product = require('./models/product')
const http = require('http') 
const fs = require('fs') 

/// Commence server
const port = process.env.PORT || 5000
http.createServer( async (req, res) => {

	product.getProducts(req, res) 
	.then(products => {
		let response = {products: products}
		res.writeHead(200, defaultHeaders('application/json'))
		res.end(JSON.stringify(response), console.log(response))
	})
	.catch(error => {
		res.writeHead(200, defaultHeaders('application/json'))
		res.end(JSON.stringify(error), console.error(error))
	})

}).listen(port, console.log(`Server listening on port : ${port}`)) 

// Helpers
function defaultHeaders(contentType) {
	return {
		'Content-Type': contentType,
		'Access-Control-Allow-Origin': '*'
	}
}
