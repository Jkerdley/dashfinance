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
			console.log('action.payload.cryptoAssets in reducer', action.payload.cryptoAssets);

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

		case ACTIONS.FETCH_CRYPTOASSETS_REQUEST:
			return {
				...state,
				isLoading: true,
				error: null,
			};
		case ACTIONS.FETCH_CRYPTOASSETS_SUCCESS:
			console.log(
				'action.payload.cryptoAssets FETCH_CRYPTOASSETS_SUCCESS',
				action.payload.cryptoAssets,
			);

			return {
				...state,
				isLoading: false,
				cryptoAssets: action.payload.cryptoAssets,
				cryptoHistory: action.payload.cryptoHistory,
				error: null,
			};
		case ACTIONS.FETCH_CRYPTOASSETS_ERROR:
			return {
				...state,
				isLoading: false,
				error: action.payload.error,
			};

		default:
			return state;
	}
};
