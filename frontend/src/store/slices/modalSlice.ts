import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ModalType } from '../../constants/modals';

interface ModalState {
	modalType: ModalType | null;
	modalProps: Record<string, any>;
}

const initialState: ModalState = {
	modalType: null,
	modalProps: {},
};

interface OpenModalPayload {
	modalType: ModalType;
	modalProps?: Record<string, any>;
}

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (state, action: PayloadAction<OpenModalPayload>) => {
			state.modalType = action.payload.modalType;
			state.modalProps = action.payload.modalProps || {};
		},
		closeModal: (state) => {
			state.modalType = null;
			state.modalProps = {};
		},
	},
});

export const { openModal, closeModal } = modalSlice.actions;

import type { RootState } from '../store';
export const selectCurrentModal = (state: RootState) => state.modal;

export const modalReducer = modalSlice.reducer;
