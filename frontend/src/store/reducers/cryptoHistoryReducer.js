import { ACTIONS } from '../actionTypes';

const initialCryptoHistoryDataState = {
	isLoading: false,
	data: [],
	error: null,
};

export const cryptoHistoryReducer = (state = initialCryptoHistoryDataState, action) => {
	switch (action.type) {
		case ACTIONS.FETCH_CRYPTOHISTORY_REQUEST:
			return {
				...state,
				isLoading: true,
				error: null,
			};
		case ACTIONS.FETCH_CRYPTOHISTORY_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.payload.cryptohistory,
				error: null,
			};
		case ACTIONS.FETCH_CRYPTOHISTORY_ERROR:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
