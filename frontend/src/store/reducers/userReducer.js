import { ACTIONS } from '../actionTypes';

const initialUserState = {
	data: null,
	userIsLoading: true,
};

export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case ACTIONS.GET_USER_DATA:
			return {
				...state,
				data: action.payload,
				userIsLoading: false,
			};
		case ACTIONS.USER_SET_LOADING:
			return {
				...state,
				userIsLoading: action.payload,
			};
		case ACTIONS.CLEAR_USER_DATA:
			return initialUserState;
		default:
			return state;
	}
};
