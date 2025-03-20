import { getCryptoCoinsAsync } from '../../../api/getCryptoCoinsAsync';
import { request } from '../../../utils';
import { ACTIONS } from '../../actionTypes';

export const fetchCryptoData = () => async (dispatch) => {
	dispatch({ type: ACTIONS.FETCH_CRYPTODATA_REQUEST });

	try {
		const [coinsResponse, assetsResponse] = await Promise.all([
			getCryptoCoinsAsync(),
			request('/cryptoassets'),
		]);
		console.log('coinsResponse', coinsResponse);
		console.log('assetsResponse', assetsResponse);

		dispatch({
			type: ACTIONS.FETCH_CRYPTODATA_SUCCESS,
			payload: {
				coins: coinsResponse.result || coinsResponse,
				cryptoAssets: assetsResponse.cryptoAssets,
				cryptoHistory: assetsResponse.cryptoAssets.flatMap((asset) => asset.history),
			},
		});
	} catch (error) {
		console.error('Ошибка получения данных о криптовалютах или криптоактивах', error);
		dispatch({ type: ACTIONS.FETCH_CRYPTODATA_ERROR, payload: error.message });
	}
};
