import React, {useState, useEffect} from 'react';
import Landing from './landing';
import Category from './category';
import '../stylesheets/app.css';

import { 
	Nav, 
	NavItem, 
	NavLink, 
	Dropdown, 
	DropdownItem, 
	DropdownToggle, 
	DropdownMenu
} 
from 'reactstrap';

import { 
	useHistory,
	Switch,
	Route,
	Link
} from 'react-router-dom';
import { 
	withRouter 
} from 'react-router'

export default withRouter(function App() {

	/// Hooks

	// Basic 
	const [content, setContent] = useState({})
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const [desiredCategory, setDesiredCategory] = useState()
 	const history = useHistory();

	// Data from server 
	useEffect(() => {
		fetch('http://localhost:5000/')
		.then(res => res.json())
		.then(data => setContent(data))
	}, [])

	// Log 'desiredCategory'
	useEffect(() => {
		console.log(`Desired Category : ${desiredCategory}`)
	}, [desiredCategory])

	/// Functions

	const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

	const handleCategoryChange = e => {
		setDesiredCategory(e.target.innerText)
		history.push('/category')
	} 

	const categories = () => {
		return content.products.map(product => {
			return (
				<DropdownItem
				className='default'
				key={product.productId}
				onClick={handleCategoryChange}>
					{product.category}
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
				path='/category'
				render={
					() => 
					<Category 
					desiredCategory={desiredCategory} 
					products={content.products}
					/>
				}
				/>
				<Route 
				exact 
				path='/'
				render={() => <Landing products={content.products}/>}
				/>
			</Switch>

		</div>
	);
})
