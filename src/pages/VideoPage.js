import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectVideoName } from '../redux/Appslice';
import yt from '../api/yt';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import { Button } from '@material-ui/core';
import SpeakerNotesOutlinedIcon from '@material-ui/icons/SpeakerNotesOutlined';
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
// import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
// import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
// import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import RecommendedVideos from '../components/RecommendedVideos';
import VisibilityIcon from '@material-ui/icons/Visibility';
import StarIcon from '@material-ui/icons/Star';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import HourglassFullOutlinedIcon from '@material-ui/icons/HourglassFullOutlined';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const VideoPage = () => {
	const videoName = useSelector(selectVideoName);
	console.log(videoName);

	const [defVal, setDefVal] = useState('overRef');

	let overRef = useRef(null);
	let notesRef = useRef(null);
	let discussRef = useRef(null);
	let readRef = useRef(null);

	// SET VIDEO DETAILS IN COMPONENT STATE
	const [details, setDetails] = useState({
		title: '',
		published: '',
		channelName: '',
		desc: '',
		tags: '',
	});
	const [stats, setStats] = useState({
		views: '',
		likes: '',
		dislikes: '',
		comments: '',
	});

	// current date
	const currentYear = new Date().getFullYear();

	// const currentMonth = new Date().getMonth();

	const getYear = details.published.substr(0, 4);
	const diff = currentYear - getYear;
	let counter = 0;

	const openTab = tab => {
		if (tab === notesRef) {
			tab.current.classList.add('active');
			overRef.current.classList.remove('active');
			readRef.current.classList.remove('active');
			discussRef.current.classList.remove('active');
			setDefVal('notesRef');
		} else if (tab === readRef) {
			tab.current.classList.add('active');
			overRef.current.classList.remove('active');
			notesRef.current.classList.remove('active');
			discussRef.current.classList.remove('active');
			setDefVal('readRef');
		} else if (tab === discussRef) {
			tab.current.classList.add('active');
			overRef.current.classList.remove('active');
			notesRef.current.classList.remove('active');
			readRef.current.classList.remove('active');
			setDefVal('discussRef');
		} else if (tab === overRef) {
			tab.current.classList.add('active');
			notesRef.current.classList.remove('active');
			notesRef.current.classList.remove('active');
			discussRef.current.classList.remove('active');
			setDefVal('overRef');
		}
		filterTab();
	};

	useEffect(() => {
		window.scroll(0, 0);
		async function fetchVideoSnippet() {
			const response = await yt.get('/videos', {
				params: {
					part: 'snippet',
					id: videoName,
				},
			});
			const snippet = response.data.items[0].snippet;

			setDetails({
				published: snippet.publishedAt,
				title: snippet.title,
				desc: snippet.description,
				channelName: snippet.channelTitle,
				tags: snippet.tags,
			});
			console.log(details.tags);
		}
		async function fetchVideoStats() {
			const response = await yt.get('/videos', {
				params: {
					part: 'statistics',
					id: videoName,
				},
			});
			const stats = response.data.items[0].statistics;

			setStats({
				views: stats.viewCount,
				likes: stats.likeCount,
				dislikes: stats.dislikeCount,
				comments: stats.commentCount,
			});
		}
		fetchVideoSnippet();
		fetchVideoStats();
		// eslint-disable-next-line
	}, []);

	// render/filter result based on selected tab
	const filterTab = () => {
		console.log(overRef.current);
		if (defVal === 'overRef') {
			console.log('haha');
			return (
				<>
					<div className='videoPage__tags'>
						{details.tags
							? details.tags.map(tag => {
									if (counter <= 4) {
										counter++;
										return <h2 className='tag'> {tag}</h2>;
									}
									return;
							  })
							: null}
						<div className='tags__addIcon'>
							<AddCircleIcon />
						</div>
					</div>
					<div className='tab__info__container'>
						<div className='tab__info'>
							<h2 className='video__title'>{details.title}</h2>
							<p className='video__description'>{details.desc}</p>
						</div>
						<div className='tab__utils'>
							<div className='share__icon'>
								<ShareOutlinedIcon />
							</div>
							<div className='bookmark__icon'>
								<BookmarkBorderOutlinedIcon />
							</div>
							<div className='video__stats'>
								<div className='video__star__group'>
									<StarIcon className='video__stars' />
									<StarIcon className='video__stars' />
									<StarIcon className='video__stars' />
									<StarIcon className='video__stars' />
									<StarOutlineIcon className='video__stars' />
								</div>
								<div className='video__views'>
									<p>
										<VisibilityIcon className='vis__icon' />:{stats.views}
									</p>

									{currentYear - getYear === 0 ? (
										<p>
											{' '}
											<HourglassFullOutlinedIcon className='hour__icon' />
											This year
										</p>
									) : (
										`${diff} years ago`
									)}
								</div>
							</div>
						</div>
					</div>
				</>
			);
		} else {
			console.log('not over');
			return;
		}
	};
	// filterTab();

	return (
		<div className='videoPage'>
			<div className='videoPage__container'>
				<iframe
					src={`https://www.youtube.com/embed/${videoName}`}
					title='your_video'
					allow='fullscreen'></iframe>
				<div className='videoPage__details'>
					<div className='videoPage__tabs'>
						{/* overview */}
						<Button
							ref={overRef}
							variant='contained'
							onClick={() => openTab(overRef)}
							startIcon={<ErrorOutlineOutlinedIcon />}
							className='active'>
							<span className='btn__name '>
								{''}
								Overview
							</span>
						</Button>
						{/* notes */}
						<Button
							variant='contained'
							ref={notesRef}
							onClick={() => openTab(notesRef)}
							startIcon={<SpeakerNotesOutlinedIcon />}>
							<span className='btn__name '> Notes</span>
						</Button>
						{/* reading material */}
						<Button
							ref={readRef}
							variant='contained'
							onClick={() => openTab(readRef)}
							startIcon={<MenuBookOutlinedIcon />}>
							<span className='btn__name'> Reading Material</span>
						</Button>
						{/* discussion form */}
						<Button
							ref={discussRef}
							variant='contained'
							onClick={() => openTab(discussRef)}
							startIcon={<ChatBubbleOutlineOutlinedIcon />}>
							<span className='btn__name'> Discussion</span>
						</Button>
					</div>

					{filterTab()}
				</div>
			</div>
			<div className='videoPage__recommended'>
				<RecommendedVideos />
			</div>
		</div>
	);
};

export default VideoPage;
