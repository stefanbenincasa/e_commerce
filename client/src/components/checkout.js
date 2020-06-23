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

		if (cart === undefined && cart.length <= 0) {
			setOutput(getNoItems())
		}
		else {
			setTimeout(() => {
				setOutput(getForm())
			}, 3000)
		}

	}, [cart])

	/// Functions

	// Determine spinner output for interim or null output
	const getNoItems = function () {
		return (
			<>
				<h1> No products in Checkout. </h1>
				<h2> Please go back and continue browsing. </h2>
			</>
		)
	}

	// Form for address and payment input 
	const getForm = function () {
		return (
			<>
				<Card>
					<CardTitle> Order Details </CardTitle>
					<Form>

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
								/>
							</FormGroup>
						</FormGroup>

						<FormGroup className='email'>
							<Label for='email'> Email </Label>
							<Input 
							type='email'
							name='email'
							id='email'
							/>
						</FormGroup>

						<FormGroup className='address'>
							<FormGroup 
							style={{gridColumn: '1/3'}}>
								<Label for='address'> Address </Label>
								<Input
								type='text'
								name='address'
								id='address'
								/>
							</FormGroup> 
							<FormGroup
							style={{gridColumn: '1/3'}}>
								<Label for='city'> City </Label>
								<Input
								type='text'
								name='city'
								id='city'
								/>
							</FormGroup> 
							<FormGroup>
								<Label for='country'> Country </Label>
								<Input
								type='text'
								name='country'
								id='country'
								/>
							</FormGroup> 
							<FormGroup>
								<Label for='postcode'> Postcode </Label>
								<Input
								type='text'
								name='postcode'
								id='postcode'
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
								/>
							</FormGroup>
							<FormGroup>
								<Label for='securityCode'> Security Code </Label>
								<Input
								type='text'
								name='securityCode'
								id='securityCode'
								/>
							</FormGroup>
						</FormGroup>

					</Form>
				</Card>
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
