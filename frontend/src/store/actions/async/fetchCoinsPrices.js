import { fetchedCoinsPrices } from '../../../db';
import { ACTIONS } from '../../actionTypes';

export const fetchCoinsPrices = () => async (dispatch) => {
	dispatch({ type: ACTIONS.FETCH_COINDATA_REQUEST });

	try {
		// здесь сделать реальный API-запрос
		const response = fetchedCoinsPrices;

		dispatch({
			type: ACTIONS.FETCH_COINDATA_SUCCESS,
			payload: response.result,
		});
	} catch (error) {
		dispatch({
			type: ACTIONS.FETCH_COINDATA_ERROR,
			payload: error.message,
		});
	}
};
