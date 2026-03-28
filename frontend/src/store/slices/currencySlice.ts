import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrencyState {
	isUSD: boolean;
	usdCourse: number | null;
}

const initialState: CurrencyState = {
	isUSD: false,
	usdCourse: null,
};

const currencySlice = createSlice({
	name: 'currency',
	initialState,
	reducers: {
		toggleCurrency: (state) => {
			state.isUSD = !state.isUSD;
		},
		setUsdCourse: (state, action: PayloadAction<number>) => {
			state.usdCourse = action.payload;
		},
	},
});

export const { toggleCurrency, setUsdCourse } = currencySlice.actions;
export const currencyReducer = currencySlice.reducer;
