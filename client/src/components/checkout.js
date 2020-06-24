//// Checkout 

import React, {useState, useEffect} from 'react'

import { 
	Card,
	CardBody,
	CardTitle,
	CardText,
	Spinner,
	Button,
 	Form, 
	FormGroup, 
	Label, 
	Input, 
	FormText 
} 
from 'reactstrap'

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

export default withRouter(function Checkout({encode, decode, cart}) {

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
				setOutput(getForm())
			}, 3000)
		}
		else {
			setOutput(getNoItems())
		}

	}, [cart])

	/// Functions

	// Handle form submission
	const handleSubmit = function (e) {
		e.preventDefault()
		setOutput(getOrderComplete())
	}

	// Form validation
	const formValidation = function (e, section) {

		const inputText = e.target.value
		const regexes = { 
			name: /^[a-zA-Z]{2,10}$/,
			email: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
			address: /^[a-zA-Z]{2,20}$/,
			city: /^[a-zA-Z]{2,20}$/,
			country: /^[a-zA-Z]{2,20}$/,
			postcode: /^[a-zA-Z]{4,4}$/,
			cardNumber: /^[0-9]{16,16}$/,
			securityCode: /^[0-9]{3,3}$/
		} 

		// If text of input passes respective test, add/remove error indication to
		// to element accordingly
		let output
		for (let regex in regexes) {
			output = regex === section && regexes[regex].test(inputText)
		}
		console.log(output)

	}

	// Determine spinner output for interim or null output
	const getNoItems = function () {
		return (
			<>
				<h1> No products in Checkout. </h1>
				<h2> Please go back and continue browsing. </h2>
			</>
		)
	}

	// Get JSX for completion of order 
	const getOrderComplete = function () {
		setTimeout(() => setOutput(getForm()), 3000)
		return (
			<>
				<h1> Order complete </h1> 
			</>
		)
	}

	// Form for address and payment input 
	const getForm = function () {
		return (
			<>
				<Form>
					<Card>
					<CardTitle> Order Details </CardTitle>
						<FormGroup className='names'>
							<FormGroup>
								<Label
								for='firstName'>
									First Name
								</Label>
								<Input 
								type='text'
								name='firstName'
								id='firstName'
								onChange={e => formValidation(e, 'name')} 
								/>
							</FormGroup>
							<FormGroup>
								<Label
								for='lastName'>
									Last Name
								</Label>
								<Input 
								type='text'
								name='lastName'
								id='lastName'
								onChange={e => formValidation(e, 'name')} 
								/>
							</FormGroup>
						</FormGroup>

						<FormGroup className='email'>
							<Label for='email'> Email </Label>
							<Input 
							type='email'
							name='email'
							id='email'
							onChange={e => formValidation(e, 'email')} 
							/>
						</FormGroup>

						<FormGroup className='address'>
							<FormGroup 
							style={{gridColumn: '1/4'}}>
								<Label for='address'> Address </Label>
								<Input
								type='text'
								name='address'
								id='address'
								onChange={e => formValidation(e, 'address')} 
								/>
							</FormGroup> 
							<FormGroup
							style={{gridColumn: '1/4'}}>
								<Label for='city'> City </Label>
								<Input
								type='text'
								name='city'
								id='city'
								onChange={e => formValidation(e, 'city')} 
								/>
							</FormGroup> 
							<FormGroup
							style={{gridColumn: '1/3'}}>
								<Label for='country'> Country </Label>
								<Input
								type='text'
								name='country'
								id='country'
								onChange={e => formValidation(e, 'country')} 
								/>
							</FormGroup> 
							<FormGroup>
								<Label for='postcode'> Postcode </Label>
								<Input
								type='text'
								name='postcode'
								id='postcode'
								onChange={e => formValidation(e, 'postcode')} 
								/>
							</FormGroup> 
						</FormGroup>

						<FormGroup className='payment'>
							<FormGroup>
								<Label for='cardNumber'> Card Number </Label>
								<Input
								type='text'
								name='cardNumber'
								id='cardNumber'
								onChange={e => formValidation(e, 'cardNumber')} 
								/>
							</FormGroup>
							<FormGroup>
								<Label for='securityCode'> Security Code </Label>
								<Input
								type='text'
								name='securityCode'
								id='securityCode'
								onChange={e => formValidation(e, 'securityCode')} 
								/>
							</FormGroup>
						</FormGroup>

						<Button 
						style={{width: '75%'}}
						className='placeOrder'
						color='primary'
						> 
							Place Order 
						</Button>

					</Card>
				</Form>
			</>
		)
	}

	/// Render
	return (
		<div className='Checkout'>
			{output}
		</div>
	)

})
