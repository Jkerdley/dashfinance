import { ACTIONS } from '../actionTypes';

const initialCryptoCoinsState = {
	isLoading: false,
	coins: [],
	error: null,
};

export const cryptoCoinsReducer = (state = initialCryptoCoinsState, action) => {
	switch (action.type) {
		case ACTIONS.FETCH_COINDATA_REQUEST:
			console.log('state.coins in reducer', state.coins);

			return {
				...state,
				isLoading: true,
				error: null,
			};
		case ACTIONS.FETCH_COINDATA_SUCCESS:
			return {
				...state,
				isLoading: false,
				coins: action.payload,
				error: null,
			};
		case ACTIONS.FETCH_COINDATA_ERROR:
			return {
				...state,
				isLoading: false,
				error: action.payload.error,
			};
		default:
			return state;
	}
};
