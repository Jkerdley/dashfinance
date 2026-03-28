import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
	isDayTheme: boolean;
}

const initialState: ThemeState = {
	isDayTheme: true,
};

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleTheme: (state) => {
			state.isDayTheme = !state.isDayTheme;
		},
	},
});

export const { toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
