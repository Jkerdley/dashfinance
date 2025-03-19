import { getCurrencyAsync } from '../../../api/getCurrencyAsync';
import { ACTIONS } from '../../actionTypes';

export const getCourseAction = () => async (dispatch) => {
	try {
		const response = await getCurrencyAsync();
		const currencies = response;

		dispatch({
			type: ACTIONS.CYRRENCY_CHECK,
			payload: currencies,
		});
	} catch (error) {
		console.error('Ошибка получения курса:', error);
		const courseFromUser = prompt('Ошибка сервера валют: Введите курс рубля вручную');
		dispatch({
			type: ACTIONS.CYRRENCY_SET_BY_USER,
			payload: Number(courseFromUser),
		});
	}
};
