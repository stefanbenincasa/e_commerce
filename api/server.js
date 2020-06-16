/// Module importation
const PRODUCT = require('./models/product')
const HTTP = require('http') 
const URL = require('url')
const QUERYSTRING = require('querystring')
const FS = require('fs') 

/// Commence server
const port = process.env.PORT || 5000
HTTP.createServer( async (req, res) => {

	// Routing
	const url = URL.parse(req.url)

	switch (url.pathname) {

		case '/' :

			// Grab Landing page data from db
			landing(req, res, url)
			break
		
		case '/category' :

			// Grab Category page data from db; assume query is present due to RR
			category(req, res, url)
			break

		case '/product' :
		
			// Grab Product page data from db; assume query is present due to RR
			product(req, res, url)
			break 

		case '/cart' :

			// Grab Cart page data from db
			break 

		case '/checkout' :

			// Grab Checkout page data from db
			break 

		default :
			
			// Redirect to Landing in case of unknown URL
			landing(req, res, url)
			break
	}

}).listen(port, console.log(`Server listening on port : ${port}`)) 


// Route handlers 
function landing(req, res, url) {
	PRODUCT.getProducts(req, res) 
		.then(products => {
			let response = {products: products}
			console.log(response)
			res.writeHead(200, defaultHeaders('application/json'))
			res.end(JSON.stringify(response), console.log('Landing page response...'))
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
			console.log(products)
			res.writeHead(200, defaultHeaders('application/json'))
			res.end(JSON.stringify(products), console.log('Category page response..'))
		})
		.catch(error => {
			console.error(error) // Reroute user to '/' : perhaps for all errors on FE
		})

}

function product(req, res, url) {

	parseQuery(url)
		.then(parsedQuery => {
			console.log(parsedQuery)
			return PRODUCT.getProductById(parsedQuery.productId) 
		})
		.then(product => {
			console.log(product)
			res.writeHead(200, defaultHeaders('application/json'))
			res.end(JSON.stringify(product), console.log('Category page response..'))
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
