//// Category 

import React, {useState, useEffect} from 'react'

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

import { 
	Switch,
	Route,
	Link
} from 'react-router-dom';

export default function Category({desiredCategory, products, toProduct}) {

	/// Variables

	/// Hooks

	/// Functions
	const productCards = function() {

		return products.map(product => {
			if (product.category === desiredCategory) {  
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
							<Button onClick={toProduct}>View Product</Button>
						</CardBody>
					</Card>
				)
			}
		})
	}


	/// Render
	if ( (products !== undefined) && (desiredCategory !== undefined) ) {

		return (
			<div
			className='Category'>
				<h1>Categories</h1>
				<h2>{desiredCategory}</h2>
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
				<h2>{desiredCategory}</h2>
				<div>
					No category selected
				</div>
			</div>
		)
		
	}
}
