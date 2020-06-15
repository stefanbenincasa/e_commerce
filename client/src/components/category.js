//// Category 

import React, {useState, useEffect} from 'react'

import { 
	Card,
	CardText,
	CardImg,
	CardBody,
	CardTitle,
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

export default withRouter(function Category({content}) {

	/// Variables
	const params = useParams()
	const match = useRouteMatch()

	/// Hooks
	const [products, setProducts] = useState(content.products)

	/// Functions
	const productCards = function() {

		return products.map(product => {
			if (product.category === params.desiredCategory) {  
				return (
					<Card 
					key={product.productId}
					id={product.productId}
					>
						<CardImg top 
						src={product.thumbnail}
						alt='Product image here...'
						/>
						<CardBody>
							<CardTitle>{product.productName}</CardTitle>
							<CardText>{product.description}</CardText>
							<Link to={`/product/${product.productId}`}>
								<Button> View Product </Button>
							</Link>
						</CardBody>
					</Card>
				)
			}
		})
	}

	/// Render
	if ( (products !== undefined) && (params.desiredCategory !== undefined) ) {

		return (
			<div
			className='Category'>
				<h1>Categories</h1>
				<h2>{params.desiredCategory}</h2>
				<div 
				className='products'>
					{productCards()}
				</div>
			</div>
		)

	}
	else {

		return (
			<div
			className='Category'>
				<h1>Categories</h1>
				<h2>{params.desiredCategory}</h2>
				<div>
					No category selected
				</div>
			</div>
		)
		
	}
})
