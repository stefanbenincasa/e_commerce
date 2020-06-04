/// Modules
const connection = require('./connection');

/// Queries
const getProducts = () => {
	connection.query(
		`SELECT * FROM PRODUCT`,
		function (error, results) {
			if (error) {
				throw error;
			}
			else {
				return results;
			} 
		}
	); 
} 

const getProductsById = (id) => {
	connection.query(
		`SELECT * FROM PRODUCT WHERE productId ${connection.escape(id)}`,
		function (error, results) {
			if (error) {
				throw error;
			}
			else {
				return results;
			} 
		}
	); 
} 

const getProductCategories = () => {
	connection.query(
		`SELECT DISTINCT category FROM PRODUCT;`,
		function (error, results) {
			if (error) {
				throw error;
			}
			else {
				return results;
			} 
		}
	);
}

module.exports = { getProducts , getProductsById }
