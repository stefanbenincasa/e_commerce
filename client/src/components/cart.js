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

		if (cart === undefined) {
			return
		}
		else if (cart.length == 0) {
			setOutput(<p>No items in Cart</p>)
		}
		else {
			setOutput(getMainView())
		}

		return () => {
			console.log('Unmounting...') 
		}

	}, [cart])

	/// Functions

	// Product view 
	const getMainView = function () {
		return (
			<>
				<h1 style={{color: 'pink'}}> 
					Shopping Cart 
				</h1>
				<div className='cards'> 
					{getProductCards()} 
				</div>
				<div className='actions'>
					<p> <strong>Total</strong> {getPriceSum()} </p>
					<Button color='primary'>
						<Link to='/checkout' style={{color: 'white'}}> Checkout</Link>
					</Button>	
				</div>
			</>
		)
	}

	// Product cards
	const getProductCards = function () {
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
					<CardTitle>
						{product.productName} 
					</CardTitle>
					<CardText>
						$ {product.price} 
					</CardText>
					<Button 
					color='secondary'
					onClick={() => removeFromCart(product.productId)} >
						Remove 
					</Button>
				</Card>
			)
		})
	}

	// Determine spinner output for interim or null output
	const getNoItems = function () {
		return (
			<>
				<h1> No products in Cart. </h1>
				<h2> Please go back and continue browsing. </h2>
			</>
		)
	}
	
	const getPriceSum = function () {

		let sum = 0
		cart.forEach(product => {
			sum += product.price 	
		})
		sum = parseFloat(sum).toFixed(2)

		return `$ ${sum}`
	}

	/// Render
	return (
		<div className='Cart'>
			{output}
		</div>
	)

})
