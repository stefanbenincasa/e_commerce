//// Product 

import 
	React, 
	{useState, useEffect} 
from 'react'

import { 
	useParams,
	useHistory
} from 'react-router-dom'
import { 
	withRouter, 
} from 'react-router'

import { 
	Jumbotron,
	Card,
	CardText,
	CardImg,
	CardBody,
	CardTitle,
	Button
} 
from 'reactstrap';

export default withRouter(function Product({products}) {

	/// Hooks
	const desiredId = 
		useParams().productId
	const [output, setOutput] = 
		useState()

	useEffect(() => {
		determineOutput()
	})

	/// Functions

	// Search through products with id from url 
	const getProductById = function (desiredId) {
		
		return new Promise((resolve, reject) => {
			products.forEach((product, index) => {
				if (product.productId == desiredId) {
					resolve(product)
				}
				if (index == products.length - 1) {
					reject(Error('Desired product absent'))
				}
			})
		})

	}

	// Determine output
	const determineOutput = function () {
		if (products === undefined || desiredId === undefined) return  
		else {
			getProductById(desiredId)
			.then(product => {
				setOutput(
					<h1> {product.productName} </h1>
				)
			})
			.catch(error => {
				console.error(error.message)
				setOutput(
					<h1>No Product</h1>
				)
			})
		}
	}

	/// Render
	return (
		<div>
			{output}
		</div>
	)
})
