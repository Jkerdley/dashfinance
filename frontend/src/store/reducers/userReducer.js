import { ACTIONS } from '../actionTypes';

const initialUserState = {
	user: [],
};

export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case ACTIONS.GET_USER_DATA:
			return {
				...state,
				user: action.payload,
			};

		default:
			return state;
	}
};
