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

	/// Variables

	/// Hooks
	const desiredId = useParams()
	const [product, setProduct] = useState()

	useEffect(() => {
		getProductById()
		.then(console.log)
		.catch(console.error)
	}, [])

	/// Functions

	// Search through products with id from url 
	const getProductById = function () {
		return new Promise((resolve, reject) => {
			products.forEach((product, index) => {
				if (product.productId == desiredId) resolve(product)
				if (index == products.length - 1) reject(Error('Product not found.'))
			})
		})
	}

	/// Render
	return (
		<div>
			{products !== undefined ? getProductById() : null}
		</div>
	)
})
