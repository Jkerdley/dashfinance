import { ACTIONS } from '../actionTypes';

const initialCurrencyState = {
	isUSD: false,
	usdCourse: null,
	currencies: [],
};

export const currencyReducer = (state = initialCurrencyState, action) => {
	switch (action.type) {
		case ACTIONS.CYRRENCY_SWITCH:
			return {
				...state,
				isUSD: !state.isUSD,
			};
		case ACTIONS.CYRRENCY_CHECK: {
			const rubleCurrency = action.payload.find((currency) => currency.name === 'RUB');

			const rubleRate = rubleCurrency ? parseFloat(rubleCurrency.rate) : 0;

			return {
				...state,
				usdCourse: rubleRate,
				currencies: action.payload,
			};
		}
		case ACTIONS.CYRRENCY_SET_BY_USER: {
			return {
				...state,
				usdCourse: action.payload,
			};
		}

		default:
			return state;
	}
};
