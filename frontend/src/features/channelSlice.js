import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	channel: null,
};

const channelSlice = createSlice({
	name: 'channel',
	initialState,
	reducers: {
		changeChannel: (state, action) => {
			state.channel = action.payload;
		},
	},
});

export const selectChannel = (state) => state.channel.channel;

export const { changeChannel } = channelSlice.actions;

export default channelSlice.reducer;
