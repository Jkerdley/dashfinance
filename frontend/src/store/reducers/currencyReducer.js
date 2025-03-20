import { ACTIONS } from '../actionTypes';

const initialCurrencyState = {
	isUSD: false,
	usdCourse: null,
};

export const currencyReducer = (state = initialCurrencyState, action) => {
	switch (action.type) {
		case ACTIONS.CYRRENCY_SWITCH:
			return {
				...state,
				isUSD: !state.isUSD,
			};
		case ACTIONS.CYRRENCY_CHECK: {
			return {
				...state,
				usdCourse: action.payload,
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
