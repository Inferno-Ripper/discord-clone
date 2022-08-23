import { createSlice } from '@reduxjs/toolkit';

const initialState = { user: null };

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, { payload }) => {
			state.user = payload;
		},

		logout: (state) => {
			state.user = null;
		},
	},
});

export const selectUser = (state) => state.user.user;

export const selectUserTag = (state) => state.user.userTag;

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
