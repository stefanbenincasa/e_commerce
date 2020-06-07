import '../stylesheets/app.css';
import React, {useState, useEffect} from 'react';
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

export default function App() {

	/// Hooks
	const [content, setContent] = useState({});
	const [desiredCategory, setCategory] = useState(); 
	const [dropdownOpen, setDropdownOpen] = useState(false);

	// Data from server 
	useEffect(() => {
		fetch('http://localhost:5000/')
		.then(res => res.json())
		.then(data => setContent(data))
	}, []);

	/// Functions
	const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

	const categories = () => {
		return content.products.map(product => {
			return (
				<DropdownItem
				key={product.productId}>
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
				id='nav_header'>
					{content.brand}
				</p>
				<Dropdown
				nav
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
		</div>
	);
}
