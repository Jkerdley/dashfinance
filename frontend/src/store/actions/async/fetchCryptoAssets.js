import { request } from '../../../utils';
import { ACTIONS } from '../../actionTypes';

export const fetchCryptoAssets = () => async (dispatch) => {
	try {
		dispatch({
			type: ACTIONS.FETCH_CRYPTOASSETS_REQUEST,
		});

		const serverData = await request('/cryptoassets');
		dispatch({
			type: ACTIONS.FETCH_CRYPTOASSETS_SUCCESS,
			payload: serverData,
		});
	} catch (error) {
		console.error('Ошибка получения базы данных крипто активов:', error);
		dispatch({
			type: ACTIONS.FETCH_CRYPTOASSETS_ERROR,
			payload: error,
		});
	}
};
