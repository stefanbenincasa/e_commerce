import React, {useState, useEffect} from 'react';

import { 
	Jumbotron,
	Button
} 
from 'reactstrap';

import { 
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from 'react-router-dom';

export default function Landing({products}) {

	/// Variables

	/// Hooks

	/// Functions

	/// Render
	return (
		<div
		className='Landing'>
			<Jumbotron
			id='landingBanner'
			className='banner'>
				<h1>
					The <span className='highlight'>latest</span><br></br>
					the market has to offer
				</h1>
				<h2>
					Peruse the latest selection of quality wares producers from around
					the world and your local community.
				</h2>
				<div className='overlay'></div>
			</Jumbotron>
			<div
			id='latestItems'>
				// Cards of products here; ordered latest to oldest
			</div>
		</div>
	)
}
