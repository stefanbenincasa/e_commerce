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
	const [categories, setCategories] = useState()
	const [dropdownOpen, setDropdownOpen] = useState(false)

	// Data from server 
	useEffect(() => {

		fetch('http://localhost:5000/')
		.then(res => res.json())
		.then(data =>  {
			setCategories(getCategories(data.products))
		})

		return () => setDropdownOpen(false)
		
	}, [])

	/// Functions

	const toggleDropdown = () => setDropdownOpen(prevState => !prevState)

	const getCategories = (products) => {
		return products.map(product => {
			return (
				<DropdownItem
				className='default'
				key={product.productId}>
					<Link 
					to={`/category/${product.category}`}>
						{decode(product.category)}
					</Link>
				</DropdownItem>
			)
		})
	}

	// Insert underscore delimiter 
	const encode = function(string) {
		return string.replace(/ /, '_').toLowerCase() 
	} 

	// Remove underscore delimiter 
	const decode = function(string) {
		
		let capital, suffix
		const formated = string.split('_').map(word => {
			capital = word.split('').shift().toUpperCase()
			suffix = word.substring(1, word.length) 
			return capital.concat(suffix)
		}).join(' ')
	
		return formated
			
	} 

	// Display error

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
						{categories !== undefined && categories}
					</DropdownMenu>
				</Dropdown>
			</Nav>

			<Switch>

				<Route 
				exact path='/category/:name'
				render={
					() =>
					<Category 
					encode={encode}
					decode={decode}
					/>
				}
				/>
				<Redirect from='/category' to='/' />

				<Route 
				exact path='/product/:productId'
				render={
					() => 
					<Product 
					encode={encode}
					decode={decode}
					/>
				}
				/>
				<Redirect from='/product' to='/' />

				<Route 
				exact path='/'
				render={ 
					() => 
					<Landing /> 
				}
				/>

			</Switch>

		</div>
	)
})
