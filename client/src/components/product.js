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

export default function Product
({image, category, productName, description, price}) {

	/// Variables

	/// Hooks

	/// Functions
	const propsReady = function() {
		if (image == undefined) console.log(true)
	}

	/// Render
	propsReady()
	return (
		<div>Test</div>
	)
}
