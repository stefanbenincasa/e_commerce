import React, {useState, useEffect} from 'react';

import { 
	Jumbotron,
	Button
} 
from 'reactstrap';

import { 
	Switch,
	Route,
	Link
} from 'react-router-dom';

export default function Category({desiredCategory, products}) {

	/// Variables

	/// Hooks

	/// Functions
	const productCards = function() {
		return products.map(product => {
			return <p key={product.productId}>{product.productName}</p>
		})
	}


	/// Render
	if ( (products !== undefined) && (desiredCategory !== undefined) ) {

		return (
			<div
			className='Category'>
				<h1>{desiredCategory}</h1>
				<div>
					{productCards()}
				</div>
			</div>
		)

	}
	else {

		return (
			<div
			className='Category'>
				<h1>{desiredCategory}</h1>
				<div>
					No category selected
				</div>
			</div>
		)
		
	}
}
