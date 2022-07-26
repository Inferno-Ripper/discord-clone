import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isModalOpen: false,
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (state, { payload }) => {
			state.isModalOpen = true;
		},

		closeModal: (state, { payload }) => {
			state.isModalOpen = false;
		},
	},
});

export const { openModal, closeModal } = modalSlice.actions;

export const selectModal = (state) => state.modal.isModalOpen;

export default modalSlice.reducer;
