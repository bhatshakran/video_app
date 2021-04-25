import axios from 'axios';

const KEY = 'AIzaSyDTdW8eeRXh6myfZHbCBidt3XdSDmNrVNo';

export default axios.create({
	baseURL: 'https://www.googleapis.com/youtube/v3/',
	params: {
		maxResults: 20,
		key: KEY,
	},
});
