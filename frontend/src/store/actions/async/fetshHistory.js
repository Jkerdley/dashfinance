import { request } from '../../../utils/request';
import { ACTIONS } from '../../actionTypes';

export const fetchHistory = () => async (dispatch) => {
	try {
		dispatch({
			type: ACTIONS.FETCH_HISTORY_REQUEST,
		});

		const serverData = await request('/history');
		dispatch({
			type: ACTIONS.FETCH_HISTORY_SUCCESS,
			payload: serverData,
		});
	} catch (error) {
		console.error('Ошибка получения базы данных истории операций:', error);
		dispatch({
			type: ACTIONS.FETCH_HISTORY_ERROR,
			payload: error,
		});
	}
};
