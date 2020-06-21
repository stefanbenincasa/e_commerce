//// Application 

import React, {useState, useEffect} from 'react'
import Product from './product'
import Landing from './landing'
import Category from './category'
import Cart from './cart'

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
	const [categories, setCategories] = useState()
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const [cart, setCart] = useState([])
	const [cartBadge, setCartBadge] = useState(false)

	// Initial setup on load || App mount
	useEffect(() => {

		// Set Cart from localStorage, tracks state over page reload
		let storage = sessionStorage.getItem('cart') 
		if (storage !== null) {
			storage = JSON.parse(storage)
			storage.forEach(product => {
				setCart(prevState => prevState.concat(product))
			})
		}

		// Fetch categories for Dropdown from server
		fetch('http://localhost:5000/')
		.then(res => res.json())
		.then(allProducts =>  {
			setCategories(getCategories(allProducts))
		})

		// Reset visible state of Dropdown
		return () => {
			setDropdownOpen(false)
		}
		
	}, [setCart])

	// Cart onChange
	useEffect(() => {
		cart.length > 0 ? alterCartBadge('add') : alterCartBadge('remove')	
	}, [cart])

	/// Functions

	// Add or remove badge to cart icon based on status
	const alterCartBadge = function (action) {
		if (action === 'add') {
			setCartBadge(true)
		}
		else if (action === 'remove') {
			setCartBadge(false)
		}
	}

	const toggleDropdown = () => setDropdownOpen(prevState => !prevState)

	// Append to sessionStorage if data present, else set intial
	const addToSession = (product) => {

		let cart = []
		if (sessionStorage.getItem('cart') !== null) {
			cart = JSON.parse(sessionStorage.getItem('cart'))
			cart.push(product)
			sessionStorage.setItem('cart', JSON.stringify(cart))
		}
		else {
			cart.push(product)
			sessionStorage.setItem('cart', JSON.stringify(cart))
		}

	}

	const getCategories = (allProducts) => {
		return allProducts.map(product => {
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

	// Add to cart
	const addToCart = function (productId) {
		fetch(`http://localhost:5000/product?id=${productId}`)
		.then(res => res.json())
		.then(product => {
			setCart(currentProducts => currentProducts.concat(product))
			addToSession(product)
		})
		.catch(console.error) 
	}

	// Remove from cart
	const removeFromCart = function (productId) {
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

	/// Render
	return (
		<div className="App">

			<Nav>
				<p
				id='nav_header'>
					Stop N Shop
				</p>
				<div 
				id='navigation'>
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
					<a 
					id='cart_icon'
					href='/cart'>
						{cartBadge && <span id='cart_badge'>{cart.length}</span>}
						<i className='fas fa-shopping-cart'></i>
					</a>
				</div>
			</Nav>

			<Switch>

				<Route 
				path='/category/:name'
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
				path='/product/:productId'
				render={
					() => 
					<Product 
					encode={encode}
					decode={decode}
					cart={cart}
					addToCart={addToCart}
					/>
				}
				/>
				<Redirect from='/product' to='/' />

				<Route
				path='/cart'
				render={
					() => 
					<Cart
					encode={encode}
					decode={decode}
					cart={cart}
					removeFromCart={removeFromCart}
					/>
				}
				/>	
				
				<Route 
				exact path='/'
				render={ 
					() => 
					<Landing 
					encode={encode}
					decode={decode}
					/> 
				}
				/>

			</Switch>

		</div>
	)
})
