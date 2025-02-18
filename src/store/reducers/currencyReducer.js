import { ACTIONS } from '../actionTypes';

const initialPostState = {
	isUSD: false,
	usdCourse: 98.3,
};

export const currencyReducer = (state = initialPostState, action) => {
	switch (action.type) {
		case ACTIONS.CYRRENCY_SWITCH:
			return {
				...state,
				isUSD: !state.isUSD,
			};
		case ACTIONS.CYRRENCY_CHECK:
			console.log('action.payload', action.payload);
			return {
				...state,
				usdCourse: action.payload,
			};

		default:
			return state;
	}
};

// https://currate.ru/api/?get=rates&pairs=USDRUB&key=43b2a5faa0f1d28ab76a409c595f86e4
