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
			return {
				...state,
				usdCourse: action.payload,
			};

		default:
			return state;
	}
};
