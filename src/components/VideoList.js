import React, { useEffect, useState } from 'react';
import yt from '../api/yt';
import VideoCard from './VideoCard';

const VideoList = ({ searchWord }) => {
	// videos state
	const [videos, setVideos] = useState([]);

	// use effect
	useEffect(() => {
		async function fetchVideos() {
			const response = await yt.get('/search', {
				params: {
					part: 'snippet',
					q: searchWord,
				},
			});
			setVideos(response.data.items);
		}
		fetchVideos();
	}, [searchWord]);

	return (
		<div className='videos'>
			<div className='videos__intro'>
				<h1>Videos</h1>
			</div>
			<div className='videos__list'>
				{videos.length >= 1 ? (
					videos.map(({ etag, id, snippet }) => {
						return (
							<VideoCard
								key={etag}
								title={snippet.title}
								pubAt={snippet.publishedAt}
								thumb={snippet.thumbnails.high.url}
								desc={snippet.description}
								channelName={snippet.channelTitle}
								id={id}
							/>
						);
					})
				) : (
					<div>Nothing here to see yet!!</div>
				)}
			</div>
		</div>
	);
};

export default VideoList;
