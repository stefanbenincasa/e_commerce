//// Product Preview 

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

export default withRouter(function ProductPreview({
	productId, productName, description, thumbnail 
}) {

	/// Hooks 
	const params = useParams()

	// Functions 
	const decode = function(string) {
		
		let capital, suffix
		const formated = string.split('_').map(word => {
			capital = word.split('').shift().toUpperCase()
			suffix = word.substring(1, word.length) 
			return capital.concat(suffix)
		}).join(' ')
	
		return formated
			
	} 

	/// Render
	return (
		<Card 
		key={productId}
		id={productId}
		>
			<CardImg top 
			src={thumbnail}
			alt='Product image here...'
			/>
			<CardBody>
				<CardTitle style={{textAlign: 'center'}}>
					{decode(productName)}
				</CardTitle>
				<Link to={`/product/${productId}`}>
					<Button> View Product </Button>
				</Link>
			</CardBody>
		</Card>
	)

})
