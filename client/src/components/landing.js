import React, {useState, useEffect} from 'react'
import ProductPreview from './productPreview'

import { 
	Nav, 
	Spinner,
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

export default function Landing({encode, decode}) {

	/// Hooks
	const [latestProducts, setLatestProducts] = useState()

	useEffect(() => {

		setLatestProducts(
			<Spinner 
			style={{position: 'absolute', left: '50%', top: '50%'}}
			type='grow' 
			color='primary'/>
		)

		setTimeout(() => {
			fetch(`http://localhost:5000/landing`)
			.then(res => res.json())
			.then(latestProducts => setLatestProducts(getLatestCards(latestProducts)))
			.catch(error => console.error(error.message))
		}, 1000)

	}, [setLatestProducts])

	/// Functions
	const getLatestCards = function (latestProducts) {
		return latestProducts.map(product => {
			return (
				<ProductPreview
				key={product.productId}
				productId={product.productId}
				productName={product.productName}
				description={product.description}
				thumbnail={product.thumbnail}
				/>
			)
		})
	}

	/// Render
	return (
		<div
		className='Landing'>

			<Jumbotron
			id='landingBanner'
			className='banner'>
				<h1>
					The <span className='highlight'>best</span>
					<br></br>
					the market has to offer
				</h1>
				<h2>
					Peruse the latest selection of quality wares from producers around
					the world and your local community.
				</h2>
				<div className='overlay'></div>
			</Jumbotron>

			<h3> Latest Products </h3>
			<div
			id='latestItems'>
				{latestProducts}
			</div>
			
		</div>
	)
}
