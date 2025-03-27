import { ACTIONS } from '../../actionTypes';

export const fetchCryptoAssets = (response) => async (dispatch) => {
	try {
		dispatch({
			type: ACTIONS.FETCH_CRYPTOASSETS_REQUEST,
		});

		dispatch({
			type: ACTIONS.FETCH_CRYPTOASSETS_SUCCESS,
			payload: {
				cryptoAssets: response.cryptoAssets,
				cryptoHistory: response.cryptoAssets.flatMap((asset) => asset.history),
			},
		});
	} catch (error) {
		console.error('Ошибка получения базы данных крипто-актива:', error);
		dispatch({
			type: ACTIONS.FETCH_CRYPTOASSETS_ERROR,
			payload: error,
		});
	}
};
