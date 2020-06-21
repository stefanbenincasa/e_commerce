//// Cart 

import React, {useState, useEffect} from 'react'

import { 
	Card,
	CardText,
	CardImg,
	CardBody,
	CardTitle,
	Spinner,
	Button,
} 
from 'reactstrap';

import { 
	useHistory,
	useParams,
	useRouteMatch,
	Switch,
	Route,
	Link
} from 'react-router-dom';
import { 
	withRouter 
} from 'react-router'

export default withRouter(function Cart({encode, decode, cart, removeFromCart}) {

	/// Hooks 
	const params = useParams()
	const [output, setOutput] = useState()


	useEffect(() => {

		setOutput(
			<Spinner 
			style={{position: 'absolute', top: '50%', left: '50%'}}
			color='primary' 
			type='grow' 
			/>
		)

		if (cart !== undefined && cart.length > 0) {
			setTimeout(() => {
				setOutput(getCartProducts())
			}, 3000)
		}
		else {
			setOutput(defaultOutput())
		}

	}, [cart])

	/// Functions

	// Products in cart output
	const getCartProducts = function () {
		return cart.map(product => {
			return (
				<Card
				id={product.productId}
				key={product.productId}>
					<CardImg 
					width='50%' 
					src={product.thumbnail}
					alt='Product image...'
					/>
					<CardTitle> {product.productName} </CardTitle>
					<CardText> $ {product.price} </CardText>
				</Card>
			)
		})
	}

	// Determine spinner output for interim or null output
	const defaultOutput = function () {
		return (
			<>
				<h1> No products in Cart. </h1>
				<h2> Please go back and continue browsing. </h2>
			</>
		)
	}
	

	/// Render
	return (
		<div className='Cart'>
			{output}
		</div>
	)

})
