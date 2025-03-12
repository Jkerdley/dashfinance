import { ACTIONS } from '../actionTypes';

const initialCategoriesState = {
	isLoading: false,
	data: [],
	error: null,
};

export const categoriesReducer = (state = initialCategoriesState, action) => {
	switch (action.type) {
		case ACTIONS.FETCH_CATEGORIES_REQUEST:
			return {
				...state,
				isLoading: true,
				error: null,
			};
		case ACTIONS.FETCH_CATEGORIES_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.payload.categories,
				error: null,
			};
		case ACTIONS.FETCH_CATEGORIES_ERROR:
			return {
				...state,
				isLoading: false,
				error: action.payload.error,
			};
		case ACTIONS.CLEAR_CATEGORIES_DATA:
			return initialCategoriesState;

		default:
			return state;
	}
};
