import { ACTIONS } from './../../actionTypes';

export const fetchUserData = (user) => (dispatch) => {
	try {
		dispatch({ type: ACTIONS.GET_USER_DATA, payload: user });
	} catch (error) {
		console.error('Ошибка сохранения данных:', error);
	}
};
