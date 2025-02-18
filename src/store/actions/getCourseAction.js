import { getCurrencyAsync } from '../../api/getCurrencyAsync';
import { ACTIONS } from '../actionTypes';

export const getCourseAction = () => async (dispatch) => {
	try {
		const response = await getCurrencyAsync(true);
		const USDcourse = Number(response.data.USDRUB);
		console.log('response', response.data.USDRUB);
		dispatch({
			type: ACTIONS.CYRRENCY_CHECK,
			payload: USDcourse,
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
