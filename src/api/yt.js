import axios from 'axios';

const KEY = 'AIzaSyBwlrec2ERs0zahAqNph5NTIfh_kbl6yAQ';

export default axios.create({
	baseURL: 'https://www.googleapis.com/youtube/v3/',
	params: {
		maxResults: 20,
		key: KEY,
	},
});
