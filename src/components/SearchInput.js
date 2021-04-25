import React, { useState } from 'react';
import { Button, Input } from '@material-ui/core';

const SearchInput = ({ handleSearchSubmit }) => {
	// state hook
	const [term, setTerm] = useState('');

	// handle change
	const handleChange = e => {
		setTerm(e.target.value);
	};

	// handle submit
	const handleSubmit = e => {
		e.preventDefault();
		handleSearchSubmit(term);
	};

	return (
		<div className='outer__slice'>
			<div className='search'>
				<div className='search__intro'>
					<h1> Precisely</h1>
				</div>
				<Input
					className='search__bar'
					placeholder='Search here'
					onChange={handleChange}
				/>
				<Button variant='outlined' size='large' onClick={handleSubmit}>
					{' '}
					Search
				</Button>
				<div className='inner__slice'></div>
			</div>
		</div>
	);
};

export default SearchInput;
