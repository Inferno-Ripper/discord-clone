import { createSlice } from '@reduxjs/toolkit';

const generateRandomNumbers = () => {
	let randomNumbers = [];

	// generates 5 random numbers
	for (let i = 0; i < 5; i++) {
		randomNumbers.push(Math.floor(Math.random() * 9));
	}

	return randomNumbers;
};

const initialState = {
	user: null,
	userTag: generateRandomNumbers(),
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action) => {
			state.user = action.payload;
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
