import { ACTIONS } from '../actionTypes';

const initialCurrencyState = {
	isUSD: false,
	usdCourse: 98.3,
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
			console.log('rubleCurrency', rubleCurrency);

			const rubleRate = rubleCurrency ? parseFloat(rubleCurrency.rate) : null;

			return {
				...state,
				usdCourse: rubleRate,
				currencies: action.payload,
			};
		}

		default:
			return state;
	}
};
