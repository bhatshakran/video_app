import React, { useState } from 'react';
import SearchInput from '../components/SearchInput';
import VideoList from '../components/VideoList';

const HomePage = () => {
	// term state
	const [searchWord, setSearchWord] = useState('');

	// handle search callback
	const handleSearchSubmit = q => {
		setSearchWord(q);
	};
	return (
		<>
			<SearchInput handleSearchSubmit={handleSearchSubmit} />
			<VideoList searchWord={searchWord} />
		</>
	);
};

export default HomePage;
