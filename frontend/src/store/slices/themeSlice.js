import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
	name: 'theme',
	initialState: {
		isDayTheme: true,
	},
	reducers: {
		toggleTheme: (state) => {
			state.isDayTheme = !state.isDayTheme;
		},
	},
});

export const { toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
