/// Module importation
const PRODUCT = require('./models/product')
const HTTP = require('http') 
const URL = require('url')
const QUERYSTRING = require('querystring')
const FS = require('fs') 

/// Commence server
const port = process.env.PORT || 5000
HTTP.createServer((req, res) => {

	// Routing
	const url = URL.parse(req.url)

	switch (url.pathname) {

		case '/' :

			index(req, res, url)
			break

		case '/landing' :

			landing(req, res, url)
			break 
		
		case '/category' :

			category(req, res, url)
			break

		case '/product' :
		
			product(req, res, url)
			break 

		case '/cart' :

			break 

		case '/checkout' :

			break 

		default :
			
			index(req, res, url)
			break
	}

}).listen(port, console.log(`Server listening on port : ${port}`)) 


// Route handlers 
function index(req, res, url) {
	PRODUCT.getProducts()
	.then(allProducts => {
		res.writeHead(200, defaultHeaders('application/json'))
		res.end(JSON.stringify(allProducts))
	})
	.catch(error => {
		res.writeHead(200, defaultHeaders('application/json'))
		res.end(JSON.stringify(error))
	})
}

function landing(req, res, url) {
	PRODUCT.getLatestProducts()
	.then(latestProducts => {
		res.writeHead(200, defaultHeaders('application/json'))
		res.end(JSON.stringify(latestProducts))
	})
	.catch(error => {
		res.writeHead(200, defaultHeaders('application/json'))
		res.end(JSON.stringify(error))
	})
}

// Parse query params and ping database accordingly
function category(req, res, url) {
	parseQuery(url)
	.then(parsedQuery => {
		return PRODUCT.getProductsByCategory(parsedQuery.name) 
	})
	.then(products => {
		res.writeHead(200, defaultHeaders('application/json'))
		res.end(JSON.stringify(products))
	})
	.catch(error => {
		console.error(error) // Reroute user to '/' : perhaps for all errors on FE
	})
}

function product(req, res, url) {
	parseQuery(url)
	.then(parsedQuery => {
		return PRODUCT.getProductById(parsedQuery.id) 
	})
	.then(product => {
		res.writeHead(200, defaultHeaders('application/json'))
		res.end(JSON.stringify(product))
	})
	.catch(error => {
		console.error(error) // Reroute user to '/' : perhaps for all errors on FE
	})
}

// Helpers
function defaultHeaders(contentType) {
	return {
		'Content-Type': contentType,
		'Access-Control-Allow-Origin': '*'
	}
}

function parseQuery(url) {

	// As various promises within fire off handle them in appropriate sequence
	return new Promise((resolve, reject) => {
		try {
			const rawQuery = url.query
			const parsedQuery = QUERYSTRING.parse(rawQuery)
			resolve(parsedQuery)
		} catch (error) {
			reject(error.message)
		}
	})	
}
