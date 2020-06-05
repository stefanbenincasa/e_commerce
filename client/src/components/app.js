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
	const [dropdownOpen, setDropdownOpen] = useState(false);

	// Data must be sorted through, with each property stored
	// in its own stateful variable
	useEffect(() => {
		fetch('http://localhost:5000/')
		.then(res => res.json())
		.then(data => setContent(data))
	}, []);

	/// Functions
	const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

	const categories = () => {

		let jsx;

		if (content.categories === undefined) {
			jsx = null;
		}
		else {
			jsx = [];
			content.categories.map(category => {
				jsx.push(
					<DropdownItem
					key={category.key}>
						{category.item}
					</DropdownItem>
				);
			})
		}

		return jsx;
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
						{categories()}
					</DropdownMenu>
				</Dropdown>
			</Nav>
		</div>
	);
}
