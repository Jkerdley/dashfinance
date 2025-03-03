import { ACTIONS } from '../actionTypes';

const initialAccountsState = {
	isLoading: false,
	data: [],
	error: null,
};

export const accountsReducer = (state = initialAccountsState, action) => {
	switch (action.type) {
		case ACTIONS.FETCH_ACCOUNTS_REQUEST:
			return {
				...state,
				isLoading: true,
				error: null,
			};
		case ACTIONS.FETCH_ACCOUNTS_SUCCESS:
			console.log('action.payload.accounts', action.payload.accounts);

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
