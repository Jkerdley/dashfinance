import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
	data: null,
	userIsLoading: true,
};

const userSlice = createSlice({
	name: 'user',
	initialState: initialUserState,
	reducers: {
		setUserData: (state, action) => {
			state.data = action.payload;
			state.userIsLoading = false;
		},
		setUserIsLoading: (state, action) => {
			state.userIsLoading = action.payload;
		},
		clearUserData: () => initialUserState,
	},
});

export const { setUserData, setUserIsLoading, clearUserData } = userSlice.actions;
export const userReducer = userSlice.reducer;

export const selectUser = (state) => state.user.data;
export const selectIsAuthenticated = (state) => !!state.user.data;
export const selectUserIsLoading = (state) => state.user.userIsLoading;
