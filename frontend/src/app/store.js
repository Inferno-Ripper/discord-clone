import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import channelReducer from '../features/channelSlice';
import modalReducer from '../features/modalSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		channel: channelReducer,
		modal: modalReducer,
	},
});
