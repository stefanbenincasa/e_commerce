//// Application 

import React, {useState, useEffect} from 'react'
import Product from './product'
import Landing from './landing'
import Category from './category'
import '../stylesheets/app.css'

import { 
	Nav, 
	NavItem, 
	NavLink, 
	Dropdown, 
	DropdownItem, 
	DropdownToggle, 
	DropdownMenu
} 
from 'reactstrap'

import { 
	withRouter 
} from 'react-router'
import { 
	useHistory,
	useParams,
	useRouteMatch, 
	Redirect,
	Switch,
	Route,
	Link
} from 'react-router-dom'

export default withRouter(function App() {

	/// Hooks

	// Basic 
	const [content, setContent] = useState({})
	const [dropdownOpen, setDropdownOpen] = useState(false)

	// Data from server 
	useEffect(() => {
		fetch('http://localhost:5000/')
		.then(res => res.json())
		.then(data => setContent(data))
		return () => setDropdownOpen(false)
	}, [])

	/// Functions

	const toggleDropdown = () => setDropdownOpen(prevState => !prevState)

	const categories = () => {
		return content.products.map(product => {
			return (
				<DropdownItem
				className='default'
				key={product.productId}>
					<Link to={`/category/${product.category}`}>
						{product.category}
					</Link>
				</DropdownItem>
			)
		})
	}

	/// Render
	return (
		<div className="App">

			<Nav>
				<p
				className='default'
				id='nav_header'>
					Stop N Shop
				</p>
				<Dropdown
				nav
				className='default'
				isOpen={dropdownOpen}
				toggle={toggleDropdown}>
					<DropdownToggle nav caret>
						Products	
					</DropdownToggle>
					<DropdownMenu children>
						{content.products !== undefined && categories()}
					</DropdownMenu>
				</Dropdown>
			</Nav>

			<Switch>

				<Route 
				exact path='/category/:desiredCategory'
				render={
					() => 
					<Category 
					content={content}
					/>
				}
				/>
				<Redirect from='/category' to='/' />

				<Route 
				exact path='/product/:productId'
				render={ 
					() => 
					<Product 
					content={content} 
					/> 
				}
				/>
				<Redirect from='/product' to='/' />

				<Route 
				exact path='/'
				render={ 
					() => 
					<Landing 
					content={content} 
					/> 
				}
				/>

			</Switch>

		</div>
	)
})
