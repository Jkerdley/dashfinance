import { ACTIONS } from '../actionTypes';

const initialHistoryDataState = {
	isLoading: false,
	data: [],
	error: null,
};

export const historyReducer = (state = initialHistoryDataState, action) => {
	switch (action.type) {
		case ACTIONS.FETCH_HISTORY_REQUEST:
			return {
				...state,
				isLoading: true,
				error: null,
			};
		case ACTIONS.FETCH_HISTORY_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.payload.history,
				error: null,
			};
		case ACTIONS.FETCH_HISTORY_ERROR:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
