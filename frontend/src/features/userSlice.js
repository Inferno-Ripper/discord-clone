import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: null,
};

const generateRandomNumbers = () => {
	let randomNumbers = [];

	// generates 5 random numbers
	for (let i = 0; i < 5; i++) {
		randomNumbers.push(Math.floor(Math.random() * 9));
	}

	return randomNumbers;
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

		guestLogin: (state) => {
			state.user = {
				userName: 'Guest',
				userTag: generateRandomNumbers(),
				photo: '/assets/guest-account.jpg',
			};
		},
	},
});

export const selectUser = (state) => state.user.user;

export const { login, logout, guestLogin } = userSlice.actions;

export default userSlice.reducer;
