import { createSlice } from '@reduxjs/toolkit';

const currencySlice = createSlice({
	name: 'currency',
	initialState: {
		isUSD: false,
		usdCourse: null,
	},
	reducers: {
		toggleCurrency: (state) => {
			state.isUSD = !state.isUSD;
		},
		setUsdCourse: (state, action) => {
			state.usdCourse = action.payload;
		},
	},
});

export const { toggleCurrency, setUsdCourse } = currencySlice.actions;
export const currencyReducer = currencySlice.reducer;
