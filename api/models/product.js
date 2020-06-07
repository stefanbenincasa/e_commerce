/// Modules
const connection = require('./connection')

/// Queries
const getProducts = (req, res) => {
	return new Promise((resolve, reject) => {
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
} 

const getProductCategories = (req, res) => {
	return new Promise((resolve, reject) => {
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
}

module.exports = { getProducts , getProductCategories }
