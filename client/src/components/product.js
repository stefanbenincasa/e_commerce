//// Product 

import 
	React, 
	{useState, useEffect} 
from 'react'

import { 
	Route,
	Link,
	useParams,
	useHistory
} from 'react-router-dom'
import { 
	withRouter, 
} from 'react-router'

import { 
	Card,
	CardText,
	CardImg,
	CardBody,
	CardTitle,
	Button
} from 'reactstrap' 

export default withRouter(function Product({content}) {

	/// Hooks
	const desiredId = 
		useParams().productId
	const [products, setProducts] = useState(content.products)
	const [output, setOutput] = 
		useState()

	useEffect(() => {
		determineOutput()
		console.log(products)
	}, [])

	/// Functions

	// Search through products with id from url 
	const getProductById = function (desiredId) {
		
		return new Promise((resolve, reject) => {
			if (products === undefined || desiredId === undefined) {
				throw Error('No products available at this time')
			}
			else {
				products.forEach((product, index) => {
					if (product.productId == desiredId) {
						resolve(product)
					}
					if (index === products.length - 1) {
						reject(Error('Desired product absent'))
					}
				})
			}
		})

	}

	// Determine output
	const determineOutput = function () {
		getProductById(desiredId)
		.then(product => {
			setOutput(
				<>
					<img 
					className='thumbnail'
					src={product.thumbnail}
					alt='Thumbnail here...'/>
					<div 
					className='details'>
						<div
						className='headings'> 
							<h2> 
								{product.category} 
							</h2>
						</div>
						<h1> 
							{product.productName} 
						</h1>
						<p 
						className='desc'> 
							{product.description} 
						</p>
						<p> 
							$ {product.price} 
						</p>
						<Button
						className='addToCart'>
								Add To Cart
						</Button>
					</div>
				</>
			)
		})
		.catch(error => {
			setOutput(
				<h1>{error.message}</h1>
			)
		})
	}

	/// Render
	return (
		<div
		className='Product'>
			{output}
		</div>
	)
})
