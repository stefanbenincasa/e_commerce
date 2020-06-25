//// Category 

import React, {useState, useEffect} from 'react'
import ProductPreview from './productPreview' 

import { 
	Card,
	CardText,
	CardImg,
	CardBody,
	CardTitle,
	Spinner,
	Button,
} 
from 'reactstrap';

import { 
	useHistory,
	useParams,
	useRouteMatch,
	Switch,
	Route,
	Link
} from 'react-router-dom';
import { 
	withRouter 
} from 'react-router'

export default withRouter(function Category({encode, decode}) {

	/// Hooks
	const [output, setOutput] = useState()
	const params = useParams()

	useEffect(() => {

		// Show loading animation before data is set
		setOutput(spinner())
		
		// Fetch data from DB by category 'name'
		setTimeout(() => {
			fetch(`http://localhost:5000/category?name=${params.name}`)
			.then(res => {
				return res.json()
			})
			.then(productsByCategory => {
				setOutput(getBody(productsByCategory))
			})
			.catch(error => console.error(error))
		}, 3000)

	}, [params.name])

	/// Functions
	const getBody = function (productsByCategory) {

		return (
			<div>
				<h1 style={{color: 'pink', fontSize: '2rem'}}>
					{decode(params.name)}
				</h1>
				<div className='products'>
					{ productsByCategory.map(product => {
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
				</div>
			</div>
		)
	}

	const spinner = function () {
		
		return (
			<Spinner 
			style={{ position: 'absolute', left: '50%', top: '50%' }} 
			color='primary'
			type="grow" 
			/>
		)
	}

	/// Render
	return (
		<div
		className='Category'>
			{output}
		</div>
	)
})
