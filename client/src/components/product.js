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

export default withRouter(function Product({encode, decode, cart, addToCart}) {

	/// Hooks
	const desiredId = useParams().productId
	const [output, setOutput] = useState()

	useEffect(() => {

		// Fetch from appropriate endpoint
		fetch(`http://localhost:5000/product?id=${desiredId}`)
		.then(res => {
			return res.json()
		})
		.then(product => {
			setOutput(getBody(product[0])) // Res is type array
		})
		.catch(error => {
			setOutput( <h1>{error.message}</h1> ) 
		})

	}, [desiredId, cart])

	/// Functions

	// Determine output
	const getBody = function (product) {
		return (
			<>
				<img 
				className='thumbnail'
				src={product.thumbnail} />

				<div
				className='details'
				>
					<h2 className='subheading'> 
						{decode(product.category)} 
					</h2>
					<h1 className='heading'> 
						{decode(product.productName)} 
					</h1>
					<p className='description'> 
						{product.description} 
					</p>
					<div className='footer'>
						<p className='price'> 
							$ {product.price} 
						</p>
							<Button 
							id='addToCart' 
							onClick={ () => addToCart(desiredId, cart) }
							>
								Add To Cart
							</Button>
					</div> 
				</div>
			</>
		)
	}

	/// Render
	return (
		<div
		className='Product'>
			{output}
		</div>
	)
})
