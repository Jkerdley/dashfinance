import { ACTIONS } from '../actionTypes';

const initialCryptoAssetsState = {
	isLoading: false,
	data: [],
	cryptoHistory: [],
	error: null,
};

export const cryptoAssetsReducer = (state = initialCryptoAssetsState, action) => {
	switch (action.type) {
		case ACTIONS.FETCH_CRYPTOASSETS_REQUEST:
			return {
				...state,
				isLoading: true,
				error: null,
			};
		case ACTIONS.FETCH_CRYPTOASSETS_SUCCESS:
			console.log('action.payload.cryptoAssets', action.payload.cryptoAssets);

			return {
				...state,
				isLoading: false,
				data: action.payload.cryptoAssets,
				cryptoHistory: action.payload.cryptoAssets.flatMap((asset) => asset.history),
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
