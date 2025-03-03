import { request } from '../../utils/request';
import { ACTIONS } from '../actionTypes';

export const fetchCryptoHistory = () => async (dispatch) => {
	try {
		dispatch({
			type: ACTIONS.FETCH_CRYPTOHISTORY_REQUEST,
		});

		const serverData = await request('/cryptohistory');
		dispatch({
			type: ACTIONS.FETCH_CRYPTOHISTORY_SUCCESS,
			payload: serverData,
		});
	} catch (error) {
		console.error('Ошибка получения базы данных истории крипто-операций:', error);
		dispatch({
			type: ACTIONS.FETCH_CRYPTOHISTORY_ERROR,
			payload: error,
		});
	}
};
