import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import StarIcon from '@material-ui/icons/Star';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import HourglassFullOutlinedIcon from '@material-ui/icons/HourglassFullOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import history from '../history';
import { useDispatch } from 'react-redux';
import { setVideoName } from '../redux/Appslice';

const RecVideoCard = ({ thumb, pubAt, channelName, title, id }) => {
	console.log(channelName);

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
		<Card className='recVideo__card' onClick={() => goToVideo(id)}>
			<CardActionArea className='recVideo_action'>
				<CardMedia image={`${thumb}`} className='recVideo__media' />
				<CardContent className='recVideo__content'>
					<h3>{title}</h3>
					<h3 className='recVideo__channel'>{channelName}</h3>
					<StarIcon className='recVideo__stars' />
					<StarIcon className='recVideo__stars' />
					<StarIcon className='recVideo__stars' />
					<StarIcon className='recVideo__stars' />
					<StarOutlineIcon className='recVideo__stars' />
					<p className='recVideo__date'>
						<HourglassFullOutlinedIcon className='recVideo__hour' />:{pubAt}
					</p>
					<MoreVertIcon className='recVideo__more' />
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default RecVideoCard;
