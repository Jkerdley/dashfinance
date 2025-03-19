import { ACTIONS } from '../actionTypes';

export const setUserIsLoading = (payload) => ({
	type: ACTIONS.USER_SET_LOADING,
	payload: payload,
});
