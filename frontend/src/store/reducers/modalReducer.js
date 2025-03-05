import { ACTIONS } from '../actionTypes';

const initialState = {
	operationModal: {
		isOpen: false,
		type: null, // TODO 'income' или 'expense'
	},
	burgerModal: {
		isOpen: false,
	},
};

export const modalReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTIONS.OPEN_OPERATION_MODAL:
			return {
				...state,
				operationModal: {
					isOpen: true,
					type: action.payload,
				},
			};
		case ACTIONS.CLOSE_OPERATION_MODAL:
			return {
				...state,
				operationModal: {
					isOpen: false,
					type: null,
				},
			};
		case ACTIONS.OPEN_BURGER_MODAL:
			return {
				...state,
				burgerModal: {
					isOpen: true,
				},
			};
		case ACTIONS.CLOSE_BURGER_MODAL:
			return {
				...state,
				burgerModal: {
					isOpen: false,
				},
			};
		default:
			return state;
	}
};
