import { configureStore } from '@reduxjs/toolkit';

import appReducer from '../redux/Appslice';

export const store = configureStore({
	reducer: {
		app: appReducer,
	},
});
