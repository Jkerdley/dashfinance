import { getCurrencyAsync } from '../../../api/getCurrencyAsync';
import { ACTIONS } from '../../actionTypes';

export const getCourseAction = () => async (dispatch) => {
	try {
		const response = await getCurrencyAsync();
		const currencys = response;
		dispatch({
			type: ACTIONS.CYRRENCY_CHECK,
			payload: currencys,
		});
	} catch (error) {
		console.error('Ошибка получения курса:', error);
		const courseFromUser = prompt('Введите курс рубля вручную');
		dispatch({
			type: ACTIONS.CYRRENCY_CHECK,
			payload: Number(courseFromUser),
		});
	}
};
