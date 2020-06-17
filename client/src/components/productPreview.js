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
				<CardTitle>{productName}</CardTitle>
				<CardText>{description}</CardText>
				<Link to={`/product/${productId}`}>
					<Button> View Product </Button>
				</Link>
			</CardBody>
		</Card>
	)

})
