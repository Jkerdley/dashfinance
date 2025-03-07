import { getCryptoCoinsAsync } from '../../../api/getCryptoCoinsAsync';
import { ACTIONS } from '../../actionTypes';

export const fetchCoinsPrices = () => async (dispatch) => {
	dispatch({ type: ACTIONS.FETCH_COINDATA_REQUEST });

	try {
		const response = await getCryptoCoinsAsync();
		console.log('COINS ЗАПРОС КРИПТЫ', response.result);
		dispatch({
			type: ACTIONS.FETCH_COINDATA_SUCCESS,
			payload: response.result,
		});
	} catch (error) {
		console.error('Ошибка получения курсов криптовалют', error);
		dispatch({
			type: ACTIONS.FETCH_COINDATA_ERROR,
			payload: error.message,
		});
	}
};
