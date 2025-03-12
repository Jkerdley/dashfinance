import { ACTIONS } from '../actionTypes';

const initialCryptoState = {
	isLoading: false,
	coins: [],
	cryptoAssets: [],
	cryptoHistory: [],
	error: null,
};

export const cryptoReducer = (state = initialCryptoState, action) => {
	switch (action.type) {
		case ACTIONS.FETCH_CRYPTODATA_REQUEST:
			return {
				...state,
				isLoading: true,
				error: null,
			};
		case ACTIONS.FETCH_CRYPTODATA_SUCCESS:
			return {
				...state,
				isLoading: false,
				coins: action.payload.coins,
				cryptoAssets: action.payload.cryptoAssets,
				cryptoHistory: action.payload.cryptoHistory,
				error: null,
			};
		case ACTIONS.FETCH_CRYPTODATA_ERROR:
			return {
				...state,
				isLoading: false,
				error: action.payload.error,
			};
		case ACTIONS.CLEAR_CRYPTODATA_DATA:
			return initialCryptoState;

		default:
			return state;
	}
};
