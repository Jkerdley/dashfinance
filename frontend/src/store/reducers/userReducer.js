import { ACTIONS } from '../actionTypes';

const initialUserState = {
	isLoading: false,
	user: [],
	error: null,
};

export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case ACTIONS.FETCH_ACCOUNTS_REQUEST:
			return {
				...state,
				isLoading: true,
				error: null,
			};
		case ACTIONS.FETCH_ACCOUNTS_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.payload.accounts,
				error: null,
			};
		case ACTIONS.FETCH_ACCOUNTS_ERROR:
			return {
				...state,
				isLoading: false,
				error: action.payload.error,
			};

		default:
			return state;
	}
};
