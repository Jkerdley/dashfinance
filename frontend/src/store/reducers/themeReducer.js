import { ACTIONS } from '../actionTypes';

const initialState = {
	isDayTheme: true,
};

export const themeReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTIONS.TOGGLE_THEME:
			return {
				...state,
				isDayTheme: !state.isDayTheme,
			};
		default:
			return state;
	}
};
