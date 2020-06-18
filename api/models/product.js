/// Modules
const connection = require('./connection')

/// Queries
const getProducts = () => new Promise((resolve, reject) => {
	connection.query(
		`SELECT * FROM PRODUCT`,
		function (error, results) {
			if (error) {
				reject(Error(error))
			}
			else {
				resolve(results)
			} 
		}
	)
})

const getProductCategories = () => new Promise((resolve, reject) => {
	connection.query(
		`SELECT DISTINCT category FROM PRODUCT`,
		function (error, results) {
			if (error) {
				reject(Error(error))
			}
			else {
				resolve(results)
			} 
		}
	)
})

const getProductsByCategory = (name) => new Promise((resolve, reject) => {
	connection.query(
		`SELECT * FROM PRODUCT WHERE category = ?`,
		[ name ], 
		function (error, results) {
			if (error) {
				reject(Error(error))
			}
			else {
				resolve(results)
			} 
		}
	)
})

const getProductById = (id) => new Promise((resolve, reject) => {
	connection.query(
		`SELECT * FROM PRODUCT WHERE productId = ?`,
		[ id ], 
		function (error, results) {
			if (error) {
				reject(Error(error))
			}
			else {
				resolve(results)
			} 
		}
	)
})

const getLatestProducts = () => new Promise((resolve, reject) => {
	connection.query(
		`SELECT * FROM PRODUCT ORDER BY dateAdded DESC;`,
		function (error, results) {
			if (error) {
				reject(Error(error))
			}
			else {
				resolve(results)
			}
		}
	)
})

module.exports = { 
	getProducts, 
	getProductCategories, 
	getLatestProducts,
	getProductById, 
	getProductsByCategory
}
