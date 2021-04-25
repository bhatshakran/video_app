import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
	name: 'app',
	initialState: {
		videoName: null,
		videoDetails: {
			title: null,
			publishedAt: null,
			thumb: null,
			channelName: null,
			id: null,
		},
	},
	reducers: {
		setVideoName: (state, action) => {
			state.videoName = action.payload.videoName;
		},
		setVideoDetails: (state, action) => {
			state.videoDetails = action.payload.videoDetails;
		},
	},
});

export const { setVideoName, setVideoDetails } = appSlice.actions;

export const selectVideoName = state => state.app.videoName;
export const selectVideoDetails = state => state.app.videoDetails;

export default appSlice.reducer;
