import React, { useState, useEffect } from 'react';
import yt from '../api/yt';
import RecVideoCard from './RecVideoCard';

const RecommendedVideos = () => {
	const [videos, setVideos] = useState([]);
	useEffect(() => {
		async function fetchVideos() {
			console.log('yess');
			const response = await yt.get('/search', {
				params: {
					part: 'snippet',
					id: 'education',
				},
			});
			setVideos(response.data.items);
		}
		fetchVideos();
	}, []);
	return (
		<div className='recommended__videos'>
			<div className='recommended__intro'>Recommended</div>
			{videos.map(({ snippet, id }) => {
				return (
					<RecVideoCard
						thumb={snippet.thumbnails.high.url}
						channelName={snippet.channelTitle}
						pubAt={snippet.publishTime}
						title={snippet.title}
						id={id}
					/>
				);
			})}
		</div>
	);
};

export default RecommendedVideos;
