import { request } from '../../../utils';
import { ACTIONS } from '../../actionTypes';

export const fetchCategories = () => async (dispatch) => {
	try {
		dispatch({
			type: ACTIONS.FETCH_CATEGORIES_REQUEST,
		});

		const categoriesResponse = await request('/categories');
		dispatch({
			type: ACTIONS.FETCH_CATEGORIES_SUCCESS,
			payload: categoriesResponse,
		});
	} catch (error) {
		console.error('Ошибка получения базы данных категорий расходов:', error);
		dispatch({
			type: ACTIONS.FETCH_CATEGORIES_ERROR,
			payload: error,
		});
	}
};
