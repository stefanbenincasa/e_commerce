import '../stylesheets/app.css';
import React, {useState, useEffect} from 'react';
import { 
	Nav, 
	NavItem, 
	NavLink, 
	Dropdown, 
	DropdownItem, 
	DropdownToggle, 
	DropdownMenu} 
from 'reactstrap';

export default function App() {

	/// Hooks
	const [content, setContent] = useState({});
	const [dropdownOpen, setDropdownOpen] = useState(false);

	useEffect(() => {
		fetch('http://localhost:5000/')
		.then(res => res.json())
		.then(data => setContent(data))
	}, [content]);

	/// Functions
	const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

	const log = () => console.log(content); 

	const isCategories = () => {
		if (content.categories === undefined) return null 
		else { 
			content.categories.map(category => {
				return <p key={category.key}>{category}</p>
			})
		}
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
					<DropdownMenu>
						{isCategories()} 
					</DropdownMenu>
				</Dropdown>
			</Nav>

			<button onClick={log}> Log </button>

		</div>

	);
}
