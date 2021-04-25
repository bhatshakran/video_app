import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import history from '../history';
import { useDispatch } from 'react-redux';
import { setVideoName } from '../redux/Appslice';

const VideoCard = ({ title, pubAt, id, thumb, channelName }) => {
	const dispatch = useDispatch();

	const goToVideo = id => {
		dispatch(
			setVideoName({
				videoName: id.videoId,
			})
		);

		history.push(`/videopage/${title}`);
	};

	return (
		<>
			<Card className='videoCard' onClick={() => goToVideo(id)}>
				<CardActionArea>
					<CardMedia image={`${thumb}`} className='video__media' />
					<CardContent>
						<h1>{title}</h1>
						<h3>{channelName}</h3>
						<p>Date:{pubAt}</p>
					</CardContent>
				</CardActionArea>
			</Card>
		</>
	);
};

export default VideoCard;
