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
		console.log(desiredId)
	const [product, setProduct] = 
		useState()

	/// Functions
	useEffect(() => {
		if (products === undefined || desiredId === undefined) return  
		getProductById(desiredId)
		.then(product => {
			setProduct(product)
		})
		.catch(error => {
			setProduct(undefined)
			console.error(error.message)
		})
	}, [desiredId])

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

	/// Render
	if (product === undefined) {
		return (
			<h1> No product </h1>
		)
	}
	else {
		return ( 
			<div>
				<h1> {product.productName} </h1>
			</div>
		)
	}

})
