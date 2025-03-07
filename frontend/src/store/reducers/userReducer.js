import { ACTIONS } from '../actionTypes';

const initialUserState = {
	data: JSON.parse(localStorage.getItem('user')) || [],
};

export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case ACTIONS.GET_USER_DATA:
			return {
				...state,
				data: action.payload,
			};
		case ACTIONS.CLEAR_USER_DATA:
			return initialUserState;
		default:
			return state;
	}
};
