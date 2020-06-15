import React, {useState, useEffect} from 'react'

import { 
	Nav, 
	NavItem, 
	NavLink, 
	Jumbotron,
	Dropdown, 
	DropdownItem, 
	DropdownToggle, 
	DropdownMenu
} 
from 'reactstrap'

import { 
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams
} from 'react-router-dom'
import { 
	withRouter 
} from 'react-router'

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
					Peruse the latest selection of quality wares from producers around
					the world and your local community.
				</h2>
				<div className='overlay'></div>
			</Jumbotron>
			<div
			id='latestItems'>
				// Cards of products here ordered latest to oldest
			</div>
		</div>
	)
}
