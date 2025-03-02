import { request } from '../../../utils';
import { ACTIONS } from '../../actionTypes';

export const fetchAccounts = () => async (dispatch) => {
	try {
		dispatch({
			type: ACTIONS.FETCH_ACCOUNTS_REQUEST,
		});

		const serverData = await request('/accounts');
		dispatch({
			type: ACTIONS.FETCH_ACCOUNTS_SUCCESS,
			payload: serverData,
		});
	} catch (error) {
		console.error('Ошибка получения базы данных счетов:', error);
		dispatch({
			type: ACTIONS.FETCH_ACCOUNTS_ERROR,
			payload: error,
		});
	}
};
