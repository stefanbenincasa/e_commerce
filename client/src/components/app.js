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
						<DropdownItem>{content.categories[0]}</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</Nav>

			<button onClick={log}> Log </button>

		</div>

	);
}
