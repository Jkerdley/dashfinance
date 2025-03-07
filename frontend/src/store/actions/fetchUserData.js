import { ACTIONS } from '../actionTypes';

export const fetchUserData = (user) => ({
	type: ACTIONS.GET_USER_DATA,
	payload: user,
});
